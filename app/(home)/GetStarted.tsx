"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const GetStarted = () => {
  const [open, setOpen] = useState(false);
  const [generatingForm, setGeneratingForm] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
  });
  const { session, isAuthenticating } = useContext(SessionContext);
  //   const router = useRouter();
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
export default GetStarted;
