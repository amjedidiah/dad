import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";
import db from "@/utils/db.util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { ids } = req.body;

    validateRequest(req, {
      methods: new Set([HttpMethods.GET]),
      requiredFields: ["ids"],
    });

    const returnedBooks = ids.length
      ? await db` 
        SELECT * FROM books
        WHERE id IN (${ids})
        `
      : [];

    res.status(HttpStatus.OK).json({
      message: "Books returned successfully",
      error: false,
      data: returnedBooks,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
  }
}
