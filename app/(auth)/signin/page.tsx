import { signIn } from "@/auth";
import { providerMap } from "@/auth.config";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | AutoForm",
  description: "Sign In to your account",
};

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="flex flex-1 items-center justify-center flex-col gap-2">
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
          key={provider.id}
        >
          <Button type="submit" variant="outline" size={"lg"}>
            <span>Sign in with {provider.name}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
