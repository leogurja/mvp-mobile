import { cookies } from "next/headers";
import { unauthorized } from "next/navigation";
import { verify } from "jsonwebtoken";
import { env } from "./env";
import { cache } from "react";

interface DecodedToken {
  id: number;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

export const requireAuth = cache(async function requireAuth() {
  const requestCookies = await cookies();
  const token = requestCookies.get("token");

  if (!token?.value) unauthorized();
  return verify(token.value, env.JWT_SECRET) as DecodedToken;
});
