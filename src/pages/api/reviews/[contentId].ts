import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";
import db from "@/utils/db.util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.contentId as string;
  const type = req.query.type as string;

  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.GET]),
      requiredParams: ["contentId", "type"],
    });

    const reviewQuery =
      await db`SELECT u.image_url AS user_image_url, u.name AS user_name, r.review, r.rating, r.updated_at, r.id
FROM users u
JOIN reviews r ON u.id = r.user_id
WHERE r.content_id = ${+id} AND r.type = ${type} AND r.review IS NOT NULL AND r.approved = true
`;

    res.status(HttpStatus.OK).send({
      data: reviewQuery.filter(({ review }) => review),
      message: "Reviews fetched successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ data: error.data, message: error.message, error: true });
  }
}
