import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";
import db from "@/utils/db.util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.PATCH]),
      requiredFields: ["email"],
    });

    const userQuery =
      await db`UPDATE users SET is_subscribed = CASE WHEN is_subscribed = true THEN false ELSE true END WHERE email = ${email} RETURNING *`;

    res.status(HttpStatus.OK).json({
      data: userQuery[0],
      message: `${
        userQuery[0]?.is_subscribed ? "Subscribed" : "Unsubscribed"
      } successfully`,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
  }
}
