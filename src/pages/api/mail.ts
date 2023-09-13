import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import EmailTemplate from "@/components/email/email-template";
import {
  HttpMethods,
  HttpStatus,
  validateEmail,
  validateRequest,
} from "@/utils/api.util";

const {
  SITE_EMAIL: from,
  CONTACT_EMAIL: to,
  CONTACT_EMAIL_CC: cc,
  RESEND_API_KEY,
} = process.env;
const resend = new Resend(RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, message } = req.body;

  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.POST]),
      requiredBodyFields: ["name", "email", "message"],
      requiredFields: ["email", "message"],
    });

    const isValidEmail = await validateEmail(email as string);
    switch (true) {
      case !isValidEmail:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Email is invalid",
          devMessage: "Email is invalid",
          data: email,
        };
      case name.length < 3:
        throw {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Name is too short",
          devMessage: "Name is too short",
          data: name,
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
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
  }
}
