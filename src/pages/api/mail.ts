import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import EmailTemplate from "@/components/email/email-template";
import {
  HttpMethods,
  HttpStatus,
  validateRequest,
  validateUserData,
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
  const { name, email, content } = req.body;

  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.POST]),
      requiredFields: ["name", "email", "content"],
    });
    validateUserData(req.body);

    if (content.length < 10)
      throw {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Message is too short",
        devMessage: "Message is too short",
        data: content,
      };

    await resend.emails.send({
      from: `Dr. Passy Website <${from}>`,
      to: to as string,
      cc,
      reply_to: email,
      subject: "New message!",
      react: EmailTemplate({ name, message: content }),
    });

    res.status(HttpStatus.OK).send({
      message: "Message sent successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ data: error.data, message: error.message, error: true });
  }
}
