import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivatePage() {
  const currentUser = { role: "user" }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mx-auto p-4">Private: {currentUser.role}</h1>
      <div className="flex gap-2">
        <Button>
          <Link href="/">Home</Link>
        </Button>

      </div>
    </div>
  )
}

