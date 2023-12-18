import { verifyAuth } from "@/lib/auth.lib";
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

    const session = await verifyAuth(req);
    if (!session?.user_id)
      throw {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "You need to be logged in",
        devMessage: "Unauthorised action",
        data: null,
      };

    const userQuery =
      await db`SELECT * FROM users WHERE id = ${session.user_id} LIMIT 1`;

    res.status(HttpStatus.OK).send({
      data: userQuery[0],
      message: "User fetched successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ data: error.data, message: error.message, error: true });
  }
}
