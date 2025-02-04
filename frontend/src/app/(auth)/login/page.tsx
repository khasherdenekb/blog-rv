import { siteConfig } from "@/config/site";
import { Icons } from "@/components/shared/icons";
import { LoginForm } from "./_components/login-form";

const LoginPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Icons.Logo className="p-1" />
          </div>
          {siteConfig.name}
        </a>
        <div className={"flex flex-col gap-6"}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
