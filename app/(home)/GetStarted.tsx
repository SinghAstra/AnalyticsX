"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SessionContext } from "@/context/SessionContext";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { generateForm } from "../actions/generateForm";

const initialState: {
  message: string;
  data?: any;
} = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Icons.spinner className="animate-spin mr-2" />}
      {pending ? "Generating..." : "Generate Form"}
    </Button>
  );
}

const GetStarted = () => {
  const [state, formAction] = useFormState(generateForm, initialState);
  const [open, setOpen] = useState(false);
  const { session, isAuthenticating } = useContext(SessionContext);
  //   const router = useRouter();
  const { toast } = useToast();

  console.log("state --getStarted is ", state);

  const handleGetStarted = () => {
    if (session?.user) {
      setOpen(true);
    } else {
      signIn();
    }
  };

  const validateForm = (formData: FormData) => {
    const description = formData.get("description")?.toString().trim();
    if (!description) {
      toast({
        description: "Please enter a valid description!",
      });
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (validateForm(formData)) {
      formAction(formData);
    }
  };

  return isAuthenticating ? (
    <Button variant="outline" size="lg">
      <Icons.spinner className="animate-spin mr-2" />
      Wait...
    </Button>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={handleGetStarted} className="cursor-pointer lg">
        Get Started
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleFormSubmit}>
          <Textarea
            id="description"
            name="description"
            placeholder="Share what your form is about, who is it for, and what information you would like to collect. And AI will do the rest!"
          />
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GetStarted;
