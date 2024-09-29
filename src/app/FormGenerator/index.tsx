"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useSessionContext } from "@/context/SessionContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SubmitButton from "./SubmitButton";

const FormGenerator = () => {
  const [open, setOpen] = useState(false);
  const [generatingForm, setGeneratingForm] = useState(false);
  const router = useRouter();
  const { session } = useSessionContext();

  const handleGetStarted = () => {
    if (session?.user) {
      setOpen(true);
    } else {
      signIn();
    }
  };

  const handleGenerateForm = () => {};

  // setOpen(false);
  // router.push(`/forms/edit/${state.data.formId}`);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="default"
        onClick={handleGetStarted}
        className="cursor-pointer"
      >
        Get Started
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleGenerateForm}>
          <Textarea
            id="description"
            name="description"
            required
            placeholder="Share what your form is about, who is it for, and what information you would like to collect. And AI will do the rest!"
          />
          <DialogFooter>
            <Button type="submit" disabled={generatingForm}>
              {generatingForm ? "Generating..." : "Generate Form"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormGenerator;
