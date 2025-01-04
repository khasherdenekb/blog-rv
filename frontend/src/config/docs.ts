interface NavItem {
  title: string;
  href: string;
}

interface DocsConfig {
  mainNav: NavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Login",
      href: "/login",
    },
    {
      title: "Sign Up",
      href: "/sign-up",
    },
  ],
};
