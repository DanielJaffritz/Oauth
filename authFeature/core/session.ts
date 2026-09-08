import { redisClient } from "@/prisma/redis/redis";
import crypto from "crypto"
import z from "zod";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_SESSION_KEY = "session-id"
const ROLES = ["USER", "ADMIN"] as const;
const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(ROLES)
})
export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean
      httpOnly?: boolean
      sameSite?: "strict" | "lax"
      expires?: number
    }
  ) => void
  get: (key: string) => { name: string, value: string } | undefined
  delete: (key: string) => void
}
export async function createUserSession(user: z.infer<typeof sessionSchema>, cookies: Cookies) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS
  })
  setCookie(sessionId, cookies)
}

export function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  })
}
