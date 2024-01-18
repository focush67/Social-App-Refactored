"use client";

import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import ToggleSwitch from "../switch/toggle-switch";
import { signIn } from "next-auth/react";
import UserAvatar from "../profile/user-avatar";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const loggedInMenuItems = [
    <UserAvatar
      src={session?.user?.image!}
      onClick={() => {
        router.push("/");
      }}
      key={0}
    />,
    <Link href={`/profile`} key={1}>
      Profile
    </Link>,
    <Link href={"/dashboard"} key={2}>
      Dashboard
    </Link>,
    <Link href={"/saved"} key={3}>
      Saved
    </Link>,
    <Link href={"https://chatter-woad-nine.vercel.app/login"} key={4}>
      Messenger
    </Link>,
    <Button
      key={5}
      variant="shadow"
      onClick={() => signOut()}
      className={session ? "flex" : "hidden"}
    >
      Logout
    </Button>,
  ];

  const defaultMenuItems = [
    <Button
      key={10}
      as={Link}
      color="success"
      href="#"
      variant="ghost"
      className={`${
        session ? "hidden" : "inherit"
      } hover:text-white hover:bg-green-700 font-semibold`}
      onClick={() => signIn("google")}
    >
      Login
    </Button>,
    <Link href={"/"} key={11}>
      Home
    </Link>,
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent
        className="sm:hidden pr-3"
        justify="center"
      ></NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarBrand></NavbarBrand>
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/profile">Profile</Link>
        </NavbarItem>
        <NavbarItem className={!session ? "hidden" : "block"}>
          <Link href="/dashboard">Dashboard</Link>
        </NavbarItem>
        <NavbarItem className={!session ? "hidden" : "block"}>
          <Link href={`/saved`}>Saved</Link>
        </NavbarItem>
        <NavbarItem className={!session ? "hidden" : "block"}>
          <Link href="/messenger">Messenger</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex"></NavbarItem>
        <NavbarItem className="flex items-center gap-3">
          {session ? (
            <>
              <UserAvatar
                src={session?.user?.image!}
                onClick={() => router.push("/")}
              />{" "}
              <Button variant="ghost" onClick={() => signOut()}>
                Logout
              </Button>{" "}
            </>
          ) : (
            <Button
              color="success"
              variant="ghost"
              className={`${
                session ? "hidden" : "inherit"
              } hover:text-white hover:bg-green-700 font-semibold`}
              onClick={() => signIn("google")}
            >
              Login
            </Button>
          )}

          <ToggleSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex items-center">
        {session
          ? loggedInMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full"
                  href="#"
                  onClick={() => {
                    setIsMenuOpen(false);
                    return true;
                  }}
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))
          : defaultMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link className="w-full text-black" href="#">
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
      </NavbarMenu>
    </Navbar>
  );
}
