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
import React, { useContext, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { generateForm } from "../actions/generateForm";
import { navigateToEditForm } from "../actions/navigateToForm";

const initialState: {
  status: string;
  message: string;
  data?: any;
} = {
  status: "",
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
  const { toast } = useToast();

  console.log("state --getStarted is ", state);

  const handleGetStarted = () => {
    if (session?.user) {
      setOpen(true);
    } else {
      signIn();
    }
  };

  useEffect(() => {
    console.log("State", state);
    if (state?.status == "success") {
      setOpen(false);
      navigateToEditForm(state?.data?.formId);
    }
    if (state?.status == "error") {
      toast({
        description: state?.message,
      });
    }
  }, [state?.message]);

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
        <form className="grid gap-4 py-4" action={formAction}>
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
