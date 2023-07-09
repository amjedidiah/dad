import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const { SITE_EMAIL: from, CONTACT_EMAIL: to, RESEND_API_KEY } = process.env;
const resend = new Resend(RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, message: html } = req.body;

  try {
    if (req.method !== "POST")
      throw {
        message: "An error occurred",
        statusCode: 405,
        devMessage: "Only POST requests are allowed",
      };

    if (!from || !to)
      throw {
        message: "An error occurred",
        devMessage: "Missing env mail variables",
      };

    if (!email || !html)
      throw { message: "Your email and message are required", statusCode: 400 };

    const data = await resend.emails.send({
      from,
      to,
      subject: `${name} <${email}> sent you a new website message!`,
      html,
    });

    res.status(200).json({
      data,
      message: "Message sent successfully",
      error: false,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ data: null, message: error.message, error: true });
    console.error(error);
  }
}
