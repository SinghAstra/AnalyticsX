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
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FormGenerator = () => {
  const [open, setOpen] = useState(false);
  const [generatingForm, setGeneratingForm] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
  });
  const { session } = useSessionContext();
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetStarted = () => {
    if (session?.user) {
      setOpen(true);
    } else {
      signIn();
    }
  };

  const validateForm = () => {
    if (!formData.description.trim()) {
      toast({
        description: "Please enter a valid description!",
      });
      return false;
    }
    return true;
  };

  const handleGenerateForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
  };

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
            placeholder="Share what your form is about, who is it for, and what information you would like to collect. And AI will do the rest!"
            value={formData.description}
            onChange={handleChange}
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

// setOpen(false);
// router.push(`/forms/edit/${state.data.formId}`);
