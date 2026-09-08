"use server"

import z from "zod";
import { signInSchema, signUpSchema } from "./schemas";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";
import { generateSalt, hashPassword } from "../core/passwordHasher";
import { createUserSession } from "../core/session";
import { cookies } from "next/headers";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData)
  if (!success) return "unable to log you in"

  redirect("/")
}
export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData)
  if (!success) return "unable to create account"
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
    redirect("/")
  } catch (error) {
    return "Unable to create account"
  }

}
export async function logOut() {
  redirect("/")
}

