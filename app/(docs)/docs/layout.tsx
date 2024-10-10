import { DocsSidebarNav } from "@/components/sidebar-nav";
import { docsConfig } from "@/config/docs";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 ">
      <DocsSidebarNav items={docsConfig.sidebarNav} />
      {children}
    </div>
  );
}
