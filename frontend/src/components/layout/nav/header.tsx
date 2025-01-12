import Link from "next/link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { siteConfig } from "@/config/site";
import { Button } from "../../ui/button";
import { Icons } from "../../shared/icons";
import { ModeSwitcher } from "../../shared/mode-switcher";
import { CommandMenu } from "./command-menu";
import { useUserServerSide } from "@/hooks/use-user-server";
import { UserSection } from "./user-dialog";

export async function Header() {
  const { isAuthenticated } = await useUserServerSide();
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex items-center h-14">
          <MainNav />
          <MobileNav />
          <div className="flex items-center justify-between flex-1 gap-2 md:justify-end">
            <div className="flex-1 w-full md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="w-8 h-8 px-0">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.GitHub className="w-4 h-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <ModeSwitcher />
              {isAuthenticated ? (
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
