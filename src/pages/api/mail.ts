import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import EmailTemplate from "@/components/shared/email-template";
import {
  HttpMethods,
  HttpStatus,
  isValidRequestMethod,
  validateEmail,
  validateRequestBody,
  validateRequestHeaders,
  validateRequiredFields,
} from "@/utils/api.util";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, message } = req.body;
  const { from, to, cc } = req.headers;
  const { hasValidHeaders, missingHeaders } = validateRequestHeaders(req, [
    "from",
    "to",
    "cc",
  ]);
  const { hasValidBody, missingFields } = validateRequestBody(req, [
    "name",
    "email",
    "message",
  ]);
  const { hasRequiredFields, missingRequiredFields } = validateRequiredFields(
    req,
    ["email", "message"]
  );
  const isValidEmail = validateEmail(email as string);

  try {
    switch (true) {
      case !isValidRequestMethod(req, new Set([HttpMethods.POST])):
        throw {
          statusCode: HttpStatus.METHOD_NOT_ALLOWED,
          message: "An error occurred",
          devMessage: `Only ${HttpMethods.POST} method is allowed`,
          data: null,
        };
      case !hasValidHeaders:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "An error occurred",
          devMessage: "Required request headers are missing",
          data: missingHeaders,
        };
      case !hasValidBody:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "An error occurred",
          devMessage: "Request request body fields are missing",
          data: missingFields,
        };
      case !hasRequiredFields:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Required fields are missing",
          devMessage: "Required fields are missing",
          data: missingRequiredFields,
        };
      case !isValidEmail:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Email is invalid",
          devMessage: "Email is invalid",
          data: email,
        };
      case message.length < 10:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Message is too short",
          devMessage: "Message is too short",
          data: message,
        };
      default:
        break;
    }

    const data = await resend.emails.send({
      from: `Dr. Passy Website <${from}>`,
      to: to as string,
      cc,
      reply_to: email,
      subject: "New message!",
      react: EmailTemplate({ name, message }),
    });

    res.status(HttpStatus.OK).json({
      data,
      message: "Message sent successfully",
      error: false,
    });
  } catch (error) {
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
    console.error(error);
  }
}
