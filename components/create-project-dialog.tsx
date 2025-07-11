"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import Dialog from "./componentX/dialog";
import { useToastContext } from "./providers/toast";

export function CreateProjectDialog() {
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState(false);
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
  });
  const { setToastMessage } = useToastContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingData(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const project = await response.json();

      console.log("project created is ", project);

      setToastMessage(`${formData.name} has been created successfully.`);

      setCreateProjectDialogOpen(false);
      setFormData({ name: "", domain: "" });
    } catch (error) {
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
      setToastMessage("Failed to create project. Please try again.");
    } finally {
      setIsSubmittingData(false);
    }
  };

  return (
    <>
      <div onClick={() => setCreateProjectDialogOpen(true)}>
        <Button
          variant="outline"
          className="rounded bg-muted/50 hover:bg-muted/60"
        >
          <Plus className="w-4 h-4 mr-1" />
          New Project
        </Button>
      </div>
      <Dialog
        isDialogVisible={createProjectDialogOpen}
        setIsDialogVisible={setCreateProjectDialogOpen}
        className="px-3 py-2"
      >
        <div>
          <h1 className="text-lg">Create New Project</h1>
          <p className="text-muted-foreground text-sm">
            Add a new website to track analytics for.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="font-normal">
                Project Name
              </Label>
              <Input
                id="name"
                placeholder="My Awesome Website"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="rounded"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                placeholder="example.com"
                value={formData.domain}
                onChange={(e) =>
                  setFormData({ ...formData, domain: e.target.value })
                }
                className="rounded"
                autoComplete="off"
              />
              <p className="text-xs text-muted-foreground/40">
                Enter your domain without https:// or www.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCreateProjectDialogOpen(false)}
              className="rounded flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmittingData}
              className="rounded flex-1"
            >
              {isSubmittingData && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Project
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
