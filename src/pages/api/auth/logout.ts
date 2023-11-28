import { magicSecret as magic } from "@/lib/magic.lib";
import { expireUserCookie, verifyAuth } from "@/lib/auth.lib";
import type { NextApiResponse, NextApiRequest } from "next";
import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";

export default async function logout(
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

    await magic.users.logoutByIssuer(session.user_id);
    await expireUserCookie(res);

    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .end({ data: error.data, message: error.message, error: true });
  }
}
