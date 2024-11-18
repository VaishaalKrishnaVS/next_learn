"use client";
import { useSession } from "next-auth/react";

function Profile() {
  const session = useSession();
  if (session.data?.user)
    return <div>From Clinet: user is signed in {session.data.user.id}</div>;
  else return <div>From client: user is not signed in</div>;
}

export default Profile;
