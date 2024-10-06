import { signIn } from "@/auth";
import { providerMap } from "@/auth.config";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Sign In | ${siteConfig.name}`,
  description: `Sign In to your ${siteConfig.name} account`,
};

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="flex flex-1 items-center justify-center flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "/",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`/signin?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  );
}
