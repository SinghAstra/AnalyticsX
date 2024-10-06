import AuthNav from "./AuthNav";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="flex flex-col min-h-screen">
    <AuthNav/>
    {children}
    </div>;
}
