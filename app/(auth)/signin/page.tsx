import { signIn } from "@/auth";
import { providerMap } from "@/auth.config";
import { Button } from "@/components/ui/button";
import { GridSmallBackground } from "@/components/ui/GridSmallBackground";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="min-h-screen flex flex-col relative items-center justify-center">
      <GridSmallBackground />
      <div className="flex flex-col gap-2 z-10">
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
