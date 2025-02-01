"use client";
import { UseUser } from "@/hooks/use-user";
import { UserSection } from "./user-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const MainButtons = () => {
  const { user } = UseUser();
  return user ? (
    <UserSection />
  ) : (
    <div className="hidden gap-2 md:flex">
      <Button
        asChild
        size={"sm"}
        effect={"shine"}
        className="bg-blue-500 hover:bg-blue-600"
      >
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild variant={"outline"} size={"sm"} effect={"hoverUnderline"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
};
