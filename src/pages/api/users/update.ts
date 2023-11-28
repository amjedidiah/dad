import { verifyAuth } from "@/lib/auth.lib";
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
  const { email, name, imageUrl, phoneNumber }: UserData = req.body;

  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.POST]),
      requiredFields: ["email"],
    });
    validateUserData(req.body);

    const session = await verifyAuth(req);
    if (!session?.user_id)
      throw {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "You need to be logged in",
        devMessage: "Unauthorised action",
        data: null,
      };

    const userQuery =
      await db`INSERT INTO users (id, email, name, image_url, phone_number, updated_at)
                VALUES (
                  ${session.user_id},
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
                  updated_at = NOW()
                RETURNING *
              `;

    res.status(HttpStatus.OK).send({
      data: userQuery[0],
      message: "User updated successfully",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .end({ data: error.data, message: error.message, error: true });
  }
}
