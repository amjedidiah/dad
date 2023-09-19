import { UserData } from "@/redux/slices/user.slice";
import {
  HttpMethods,
  HttpStatus,
  validateRequest,
  validateUserData,
} from "@/utils/api.util";
import db from "@/utils/db.util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id: issuer, email, name, imageUrl, phoneNumber }: UserData = req.body;

  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.POST, HttpMethods.PATCH]),
      requiredFields: ["issuer", "email"],
    });
    validateUserData(req.body);

    const userQuery =
      await db`INSERT INTO users (id, email, name, image_url, phone_number, updated_at)
                VALUES (
                  ${issuer as string},
                  ${email},
                  ${name || null},
                  ${imageUrl || null},
                  ${phoneNumber || null},
                  NOW()
                )
                ON CONFLICT (email) DO UPDATE SET
                  image_url = COALESCE(EXCLUDED.image_url, users.image_url),
                  phone_number = COALESCE(EXCLUDED.phone_number, users.phone_number),
                  name = COALESCE(EXCLUDED.name, users.name),
                  updated_at = NOW();
                RETURNING *
              `;
    const { created_at, updated_at, ...user } = userQuery[0];

    res.status(HttpStatus.OK).json({
      data: user,
      message: "User created successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ data: error.data, message: error.message, error: true });
  }
}
