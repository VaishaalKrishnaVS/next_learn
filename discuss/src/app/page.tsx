import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";
export default async function Home() {
  const session = await auth();

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
      {session?.user ? (
        <div>User: {session.user.id}</div>
      ) : (
        <div>Not signed in</div>
      )}
      <Profile />
    </div>
  );
}
