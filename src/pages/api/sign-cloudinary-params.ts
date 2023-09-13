import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";
import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    req.body = JSON.parse(req.body || {});
    validateRequest(req, {
      methods: new Set([HttpMethods.POST]),
      requiredBodyFields: ["paramsToSign"],
    });

    const params_to_sign = req.body.paramsToSign;
    const api_secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

    if (!api_secret)
      throw {
        message: "No API secret found",
      };

    const signature = cloudinary.utils.api_sign_request(
      params_to_sign,
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string
    );

    res.status(HttpStatus.OK).json({
      signature,
      message: "Signature generated successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
  }
}
