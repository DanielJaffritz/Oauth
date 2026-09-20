"use server"

import { db } from "@/prisma/db";
import { getCurrentUser } from "../nextjs/currentUser";
import { updateUserSessionData } from "../core/session";
import { cookies } from "next/headers";

export async function toggleRole() {
  const user = await getCurrentUser({ redirectIfNotFound: true })
  const updatedUser = await db.orm.public.User.where({
    id: user.id
  }).update({
    role: user.role === "ADMIN" ? "USER" : "ADMIN"
  })
  if (!updatedUser) return;
  await updateUserSessionData(updatedUser, await cookies())
}
