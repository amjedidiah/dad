import { Magic } from "@magic-sdk/admin";
import { Magic as MagicSDK } from "magic-sdk";

export const magicSecret = new Magic(process.env.MAGIC_SECRET_KEY);

export const magicPublishable =
  typeof window !== "undefined"
    ? new MagicSDK(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string)
    : null;
