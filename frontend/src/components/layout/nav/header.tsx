import Link from "next/link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { siteConfig } from "@/config/site";
import { Button } from "../../ui/button";
import { Icons } from "../../shared/icons";
import { ModeSwitcher } from "../../shared/mode-switcher";
import { CommandMenu } from "./command-menu";
import { useUserServerSide } from "@/hooks/use-user-server";
import { UserDialog } from "./user-dialog";

export async function Header() {
  const { isAuthenticated } = await useUserServerSide();
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.GitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <ModeSwitcher />
              {isAuthenticated ? (
                <UserDialog />
              ) : (
                <div className="hidden md:flex gap-2">
                  <Button
                    asChild
                    size={"sm"}
                    effect={"shine"}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    variant={"outline"}
                    size={"sm"}
                    effect={"hoverUnderline"}
                  >
                    <Link href="/sign-up">Sign up</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
