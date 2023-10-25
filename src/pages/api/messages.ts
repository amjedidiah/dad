import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";
import db from "@/utils/db.util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.GET]),
    });

    const returnedMessages =
      await db`SELECT * FROM messages WHERE recorded_at NOT IN (SELECT MAX(recorded_at) FROM messages);`;

    res.status(HttpStatus.OK).json({
      message: "Messages returned successfully",
      error: false,
      data: returnedMessages,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
  }
}
