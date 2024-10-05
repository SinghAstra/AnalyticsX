import HomeNav from "./ḤomeNav";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeNav />
      {children}
    </div>
  );
}
