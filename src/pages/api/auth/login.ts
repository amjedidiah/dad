import { magicSecret as magic } from "@/lib/magic.lib";
import { getSession, setUserCookie } from "@/lib/auth.lib";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpMethods, HttpStatus, validateRequest } from "@/utils/api.util";
import db from "@/utils/db.util";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    validateRequest(req, {
      methods: new Set([HttpMethods.POST]),
    });

    // Confirm Authorization header is present
    const auth = req.headers.authorization;
    if (!auth)
      throw {
        message: "Unauthorised login",
        devMessage: "Missing Authorization Header",
        statusCode: HttpStatus.UNAUTHORIZED,
        data: auth,
      };

    // Confirm DID Token is present
    const DIDToken = magic.utils.parseAuthorizationHeader(auth);
    if (!DIDToken)
      throw {
        message: "Unauthorised login",
        devMessage: "Missing DID Token",
        statusCode: HttpStatus.UNAUTHORIZED,
        data: auth,
      };

    // Validate issuer
    const session = await getSession(DIDToken);
    const issuer = session?.user_id;
    if (!issuer)
      throw {
        message: "Unauthorised login",
        devMessage: "No issuer",
        statusCode: HttpStatus.UNAUTHORIZED,
        data: issuer,
      };

    // Attempt to fetch user
    const userQuery = await db`SELECT * FROM users WHERE id = ${
      issuer as string
    } LIMIT 1`;
    const userExists = userQuery?.length > 0;

    // Check if user exists
    if (!userExists) {
      const { email } = await magic.users.getMetadataByToken(DIDToken);
      await db`INSERT INTO users (id, email, created_at)
                VALUES (
                  ${issuer},
                  ${email},
                  NOW()
                )
              `;
    }

    // Set cookie
    setUserCookie(res, DIDToken);

    res
      .status(200)
      .send({ data: issuer, message: "Login successful", error: false });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .end({ data: error.data, message: error.message, error: true });
  }
}
