import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";
import db from "@/utils/db.util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.bookId as string;

  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.GET]),
      requiredParams: ["bookId"],
    });

    const booksQuery = await db`SELECT * FROM books WHERE id = ${+id} LIMIT 1`;

    res.status(HttpStatus.OK).json({
      data: booksQuery[0],
      message: "Book fetched successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
  }
}
