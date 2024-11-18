import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <Input />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {session?.user ? <div>Signed In</div> : <div>Signed Out</div>}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
