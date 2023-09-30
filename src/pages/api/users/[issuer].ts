import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";
import db from "@/utils/db.util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { issuer } = req.query;

  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.GET]),
      requiredParams: ["issuer"],
    });

    const userQuery = await db`SELECT * FROM users WHERE id = ${
      issuer as string
    } LIMIT 1`;

    res.status(HttpStatus.OK).json({
      data: userQuery[0],
      message: "User fetched successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
  }
}
