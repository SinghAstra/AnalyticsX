"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { scaleInVariant } from "@/lib/variant";
import { motion } from "framer-motion";
import { Loader, X } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";

interface AuthModalProps {
  isDialogVisible: boolean;
  setIsDialogVisible: Dispatch<SetStateAction<boolean>>;
}

function AuthModal({ isDialogVisible, setIsDialogVisible }: AuthModalProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDivElement>(null);
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleGitHubSignIn = async () => {
    try {
      setIsGithubLoading(true);
      await signIn("github", {
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
    } finally {
      setIsGithubLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signIn("google", {
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsDialogVisible(false);
      }
    };

    if (isDialogVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isDialogVisible, setIsDialogVisible]);

  if (!isDialogVisible) {
    return;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="absolute inset-0 bg-background/20 backdrop-blur-sm" />
      <motion.div
        className="w-[400px] p-8 bg-background/80 backdrop-blur-lg rounded-md border space-y-6"
        variants={scaleInVariant}
        initial="hidden"
        whileInView="visible"
        ref={dialogRef}
      >
        <div className="absolute top-2 right-2">
          <button
            className="text-muted-foreground hover:text-foreground transition-all duration-200"
            onClick={() => setIsDialogVisible(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <Button
          onClick={handleGitHubSignIn}
          disabled={isGithubLoading}
          variant="outline"
          className="w-full hover:bg-muted/30"
        >
          {isGithubLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Wait ...
            </>
          ) : (
            <>
              <FaGithub className="mr-2 h-5 w-5" />
              <span className="text-center tracking-wide">
                Continue with GitHub
              </span>
            </>
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase ">
            <span className="bg-background px-2 text-foreground">Or</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full hover:bg-muted/30"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Wait ...
            </>
          ) : (
            <>
              <Image
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                width={18}
                height={18}
                className="mr-2"
              />
              <span className="text-center tracking-wide">
                Continue with Google
              </span>
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}

export default AuthModal;
