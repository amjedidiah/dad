import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";
import { reviewFormSuccess } from "@/utils/constants";
import db from "@/utils/db.util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { issuer, id, type, rating, content } = req.body;
  const hasReview = !!content;

  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.POST]),
      requiredFields: ["issuer", "id", "type", "rating"],
    });

    switch (true) {
      case typeof id !== "number" || id < 1:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Content ID is invalid",
          devMessage: "Content ID is invalid",
          data: id,
        };
      case !["book", "message"].includes(type):
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Content type is invalid",
          devMessage: "Content type is invalid",
          data: type,
        };
      case hasReview && content.length < 10:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Review content is too short",
          devMessage: "Review content is too short",
          data: content,
        };
      case rating < 0:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Rating is invalid",
          devMessage: "Rating is invalid",
          data: rating,
        };
      default:
        break;
    }

    const userQuery =
      await db`INSERT INTO ratings (user_id, content_id, type, review, rating)
          VALUES (${issuer}, ${id}, ${type}, ${content || ""}, ${rating})
        `;

    res.status(HttpStatus.OK).json({
      data: userQuery[0],
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
