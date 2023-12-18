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
      methods: new Set([HttpMethods.POST]),
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
      "shouldSubscribe" in req.body
        ? await db`UPDATE users SET is_subscribed = true WHERE id = ${session.user_id} RETURNING *`
        : await db`UPDATE users SET is_subscribed = CASE WHEN is_subscribed = true THEN false ELSE true END WHERE id = ${session.user_id} RETURNING *`;

    res.status(HttpStatus.OK).send({
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
      .send({ data: error.data, message: error.message, error: true });
  }
}
