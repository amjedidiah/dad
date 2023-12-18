import { verifyAuth } from "@/lib/auth.lib";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";

export default async function validate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.GET]),
    });

    const session = await verifyAuth(req);

    res.status(200).send({
      data: Boolean(session?.user_id),
      message: "Auth status retrieved successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ data: false, message: error.message, error: true });
  }
}
