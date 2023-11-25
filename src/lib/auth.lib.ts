import type { NextApiRequest, NextApiResponse } from "next";
import { parse, serialize } from "cookie";
import { isDev } from "@/utils/constants";
import { magicSecret as magic } from "@/lib/magic.lib";
import { magicPublishable } from "@/lib/magic.lib";

export const TOKEN_NAME = "dr-passy-auth-token";

const MAX_AGE_HOURS = 24; // 24 hours

const MAX_AGE = 60 * 60 * MAX_AGE_HOURS; // 24 hours

export async function setUserCookie(res: NextApiResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    httpOnly: true,
    maxAge: MAX_AGE,
    secure: !isDev,
    sameSite: "strict",
    expires: new Date(Date.now() + MAX_AGE * 1000),
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
}

export const getSession = async (token?: string) => {
  try {
    if (!token) return;

    // Validate DID Token
    await magic.token.validate(token);

    // Validate issuer
    const issuer = magic.token.getIssuer(token);

    return { user_id: issuer };
  } catch (error) {
    console.error({ error });
    return;
  }
};

const parseCookies = (req: NextApiRequest) => {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
};

export const verifyAuth = async (req: NextApiRequest) => {
  try {
    // Get Token Cookie
    const cookies = parseCookies(req);
    const token = cookies[TOKEN_NAME];
    if (!token) return;

    return await getSession(token);
  } catch (error) {
    console.error({ error });
  }
};

export const expireUserCookie = (res: NextApiResponse) => {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const validateCookie = async () => {
  if (!magicPublishable) return;
  const res = await fetch("/api/auth/cookie").then((res) => res.json());

  const token = res.data;
  const isLoggedIn = await magicPublishable.user.isLoggedIn();
  if (!token && isLoggedIn) {
    await magicPublishable.user.logout();
    return;
  }

  return Boolean(token) && isLoggedIn;
};
