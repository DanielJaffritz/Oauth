import { ToggleRoleButton } from "@/authFeature/nextjs/components/ToggleRoleButton"
import { getCurrentUser } from "@/authFeature/nextjs/currentUser"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function PrivatePage() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true })
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mx-auto p-4">Private: {currentUser.role}</h1>
      <div className="flex gap-2">
        <ToggleRoleButton />
        <Button>
          <Link href="/">Home</Link>
        </Button>

      </div>
    </div>
  )
}

