"use client"

import { useState } from "react"
import z from "zod"
import { signUpSchema } from "../schemas"
import { Controller, useForm } from "react-hook-form"
import { signUp } from "../actions"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpForm() {
  const [error, setError] = useState<string>()
  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })
  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    const error = await signUp(data)
    setError(error)
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {error && <p className="text-destructive">{error}</p>}
      <Controller
        name="name"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>name</FieldLabel>
            <Input required placeholder="name" type="text" {...field} />
          </Field>
        )}
      />
      <Controller
        name="email"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>email</FieldLabel>
            <Input required placeholder="email" type="text" {...field} />
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>password</FieldLabel>
            <Input required placeholder="password" type="text" {...field} />
          </Field>
        )}
      />
      <div className="flex gap-4 justify-end">
        <Button variant="link">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button type="submit">Sign Up</Button>
      </div>
    </form>
  )
}

