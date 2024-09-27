"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { generateForm } from "../actions/generateForm";
import SubmitButton from "./SubmitButton";

const initialState = {
  message: "",
};

const FormGenerator = () => {
  const [state, formAction] = useFormState(generateForm, initialState);
  const [open, setOpen] = useState(false);
  const session = useSession();

  const handleGenerateForm = () => {
    if (session.data?.user) {
      setOpen(true);
    } else {
      signIn();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="default"
        onClick={handleGenerateForm}
        className="cursor-pointer"
      >
        Get Started
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="grid gap-4 py-4">
          <Textarea
            id="description"
            name="description"
            required
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

export default FormGenerator;
