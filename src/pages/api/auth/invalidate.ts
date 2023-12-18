import { expireUserCookie } from "@/lib/auth.lib";
import type { NextApiResponse, NextApiRequest } from "next";
import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.POST]),
    });
    await expireUserCookie(res);

    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ data: error.data, message: error.message, error: true });
  }
}
