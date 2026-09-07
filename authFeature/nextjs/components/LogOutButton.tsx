import { Button } from "@/components/ui/button";
import { logOut } from "../actions";

export default function LogOutButton() {
  return (
    <Button
      variant="destructive"
      onClick={async () => await logOut()}>
      Log Out
    </Button>
  )
}

