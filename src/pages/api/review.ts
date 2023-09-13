import { NextApiRequest, NextApiResponse } from "next";
import {
  HttpMethods,
  HttpStatus,
  validateEmail,
  validateRequest,
} from "@/utils/api.util";
import { reviewFormSuccess } from "@/utils/constants";
import db from "@/utils/db.util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    rating,
    image: imageUrl,
    name,
    content: message,
    email,
    hasReview,
    id,
    type,
  } = req.body;

  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.POST]),
      requiredFields: ["rating", "id", "type"],
    });

    const isValidEmail = await validateEmail(email as string);
    const isValidImage = await fetch(imageUrl, {
      method: "HEAD",
    })
      .then(() => true)
      .catch(() => false);

    switch (true) {
      case rating < 0:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Rating is invalid",
          devMessage: "Rating is invalid",
          data: message,
        };
      case hasReview && name.length < 3:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Name is too short",
          devMessage: "Name is too short",
          data: name,
        };
      case hasReview && !isValidEmail:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Email is invalid",
          devMessage: "Email is invalid",
          data: email,
        };
      case hasReview && message.length < 10:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Message is too short",
          devMessage: "Message is too short",
          data: message,
        };
      case imageUrl && !isValidImage:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Image is invalid",
          devMessage: "Image is invalid",
          data: imageUrl,
        };
      default:
        break;
    }

    const queryString = hasReview
      ? db`WITH upserted_user AS 
          (INSERT INTO users (name, email, image_url)
          VALUES (${name}, ${email}, ${imageUrl || ""}) 
          ON CONFLICT (email)
          DO UPDATE SET name = EXCLUDED.name, image_url = EXCLUDED.image_url RETURNING id)
          INSERT INTO ratings (user_id, content_id, type, review, rating)
          VALUES ((SELECT id FROM upserted_user), ${id}, ${type}, ${message}, ${rating}) 
          RETURNING id, user_id, content_id
        `
      : db`INSERT INTO ratings (content_id, type, rating) VALUES (${id}, ${type}, ${rating})`;
    await db`${queryString}`;

    res.status(HttpStatus.OK).json({
      data: null,
      message: hasReview ? reviewFormSuccess : "Your rating has been recorded",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
  }
}
