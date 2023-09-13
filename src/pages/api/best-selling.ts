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
        : db`SELECT * FROM messages WHERE is_best_selling = true`;
    const contents = await db`${queryString}`;

    if (!contents.length)
      throw {
        statusCode: 404,
        devMessage: "Best selling content not found",
      };

    return res.status(200).json({
      data: contents[0],
      message: "Best selling contents retrieved successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      data: null,
      message: error.message || "An error occurred",
      error: true,
    });
  }
}
