import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { signInSchema } from "../schemas"
import { signIn } from "../actions"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignInForm() {
  const [error, setError] = useState<string>()
  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  async function onSubmit(data: z.infer<typeof signInSchema>) {
    const error = await signIn(data)
    setError(error)
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Controller
        name="email"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input required type="email" placeholder="email" {...field} />
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input required type="password" placeholder="password" {...field} />
          </Field>
        )}
      />
      <div className="flex gap-4 justify-end">
        <Button variant="link">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        <Button type="submit">
          Sign In
        </Button>
      </div>

    </form>
  )
}

