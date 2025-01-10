interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <div data-wrapper="" className="border-grid flex flex-1 flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
