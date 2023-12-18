import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethods, validateRequest } from "@/utils/api.util";
import db from "@/utils/db.util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.GET]),
      requiredParams: ["type"],
    });

    const queryString =
      req.query.type === "book"
        ? db`SELECT * FROM books WHERE is_best_selling = true`
        : db`SELECT * FROM messages ORDER BY recorded_at DESC LIMIT 1`;
    const contents = await db`${queryString}`;

    if (!contents.length)
      throw {
        statusCode: 404,
        devMessage: "Best selling content not found",
      };

    res.status(200).send({
      data: contents[0],
      message: "Best selling contents retrieved successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).send({
      data: null,
      message: error.message || "An error occurred",
      error: true,
    });
  }
}
