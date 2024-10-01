import { Metadata } from "next";
import EditFormNav from "./EditFormNav";

interface EditFormLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Edit Form | AutoForm",
  description: "Edit Your Form",
};

export default function AuthLayout({ children }: EditFormLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <EditFormNav />
      {children}
    </div>
  );
}
