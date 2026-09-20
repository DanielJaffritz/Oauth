import { ToggleRoleButton } from "@/authFeature/nextjs/components/ToggleRoleButton";
import { getCurrentUser } from "@/authFeature/nextjs/currentUser";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function HomePage() {
  const fullUser = await getCurrentUser({ withFullUser: true });
  return (
    <div className="container mx-auto p-4">
      {fullUser == null ? (
        <div className="flex gap-4">
          <Button>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>User: {fullUser.name}</CardTitle>
            <CardDescription>Role: {fullUser.role}</CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <ToggleRoleButton />
            <Button variant="outline">
              <Link href="/private">Private Page</Link>
            </Button>
            {fullUser.role === "ADMIN" && (
              <Button variant="outline">
                <Link href="/admin">Admin Page</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
