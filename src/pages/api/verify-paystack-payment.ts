import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.POST]),
      requiredFields: ["reference"],
    });

    const url = `https://api.paystack.co/transaction/verify/${req.body.reference}`;
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };

    const resp = await fetch(url, options);
    const response = await resp.json();
    if (!response.status)
      throw {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Payment verification failed",
        devMessage: "Payment verification failed",
        data: response.data,
      };

    res.status(HttpStatus.OK).send({
      data: response.data,
      message: `${response.data.customer.first_name} ${
        response.data.customer.last_name
      }, thank you for your donation of ${new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(response.data.amount / 100)}`,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .end({ data: error.data, message: error.message, error: true });
  }
}
