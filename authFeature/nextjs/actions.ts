"use server"

import z from "zod";
import { signInSchema, signUpSchema } from "./schemas";
import { redirect } from "next/navigation";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData)
  if (!success) return "unable to log you in"

  redirect("/")
}
export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData)
  if (!success) return "unable to create account"

  redirect("/")
}
export async function logOut() {
  redirect("/")
}

