"use server"

import z from "zod";
import { signInSchema, signUpSchema } from "./schemas";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";
import { comparePasswords, generateSalt, hashPassword } from "../core/passwordHasher";
import { createUserSession, removeUserFromSession } from "../core/session";
import { cookies } from "next/headers";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData)
  if (!success) return "unable to log you in"

  const user = await db.orm.public.User.first({
    email: data.email
  })
  if (!user?.password || !user.salt) return "Unable to log you in"

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user?.password,
    password: data?.password,
    salt: user?.salt
  })
  await createUserSession(user, await cookies())

  redirect("/")
}
export async function signUp(data: z.infer<typeof signUpSchema>) {
  const existingUser = await db.orm.public.User.first({
    email: data.email
  })
  if (existingUser !== null) return "Account already exists for this email"
  try {
    const salt = generateSalt()
    const hashedPassword = await hashPassword(data.password, salt)
    const newUser = await db.orm.public.User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      salt,
    })
    if (!newUser) return "Unable to create account"
    await createUserSession(newUser, await cookies())
  } catch (error) {
    return `error: ${error}`
  } finally {
    redirect("/")
  }

}
export async function logOut() {
  await removeUserFromSession(await cookies())
  redirect("/")
}

