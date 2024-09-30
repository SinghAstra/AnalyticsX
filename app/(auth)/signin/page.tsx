import { auth, signIn } from "@/auth";
import { providerMap } from "@/auth.config";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { GridSmallBackground } from "@/components/ui/GridSmallBackground";
import Link from "next/link";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <nav className="px-4 py-3 z-10">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo />
            <h1 className="hidden sm:inline-block md:text-2xl lg:text-2xl">
              AutoForm
            </h1>
          </Link>
        </div>
      </nav>
      <GridSmallBackground />
      <div className="flex flex-1 items-center justify-center flex-col gap-2 z-10">
        {Object.values(providerMap).map((provider) => (
          <form
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: props.searchParams?.callbackUrl ?? "",
                });
              } catch (error) {
                throw error;
              }
            }}
          >
            <Button type="submit" variant="outline" size={"lg"}>
              <span>Sign in with {provider.name}</span>
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}
