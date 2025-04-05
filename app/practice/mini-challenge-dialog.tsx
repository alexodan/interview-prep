"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePracticeSessions } from "./hooks/usePracticeSessions";
import { toast } from "sonner";
import { MiniChallengeSession } from "./types";

interface MiniChallengeDialogProps {
  mode?: "add" | "edit";
  session?: MiniChallengeSession;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MiniChallengeDialog({
  mode = "add",
  session,
  open,
  onOpenChange,
}: MiniChallengeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { saveSession, updateSession, deleteSession } = usePracticeSessions();
  const [formData, setFormData] = useState(
    session
      ? {
          title: session.title,
          link: session.link,
          estimatedDuration: session.estimatedDuration.toString(),
          actualDuration: session.actualDuration.toString(),
          status: session.status,
          learnings: session.learnings,
        }
      : {
          title: "",
          link: "",
          estimatedDuration: "",
          actualDuration: "",
          status: "",
          learnings: "",
        }
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDelete = async () => {
    if (!session) return;

    const result = await deleteSession(session.id);
    if (result.success) {
      setIsOpen(false);
      toast.success("Mini challenge deleted successfully");
    } else {
      toast.error("Failed to delete mini challenge");
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.estimatedDuration) {
      toast.error("Please fill in all required fields");
      return;
    }

    const sessionData = {
      ...formData,
      type: "mini-challenge" as const,
      estimatedDuration: parseInt(formData.estimatedDuration) || 0,
      actualDuration: parseInt(formData.actualDuration) || 0,
      status: formData.status as "completed" | "abandoned" | "unfinished",
    };

    let result;
    if (mode === "edit" && session) {
      result = await updateSession(session.id, sessionData);
    } else {
      result = await saveSession(sessionData);
    }

    if (result.success) {
      if (mode === "add") {
        setFormData({
          title: "",
          link: "",
          estimatedDuration: "",
          actualDuration: "",
          status: "",
          learnings: "",
        });
      }
      setIsOpen(false);
      onOpenChange?.(false);
      toast.success(
        mode === "add"
          ? "Mini challenge saved successfully"
          : "Mini challenge updated successfully"
      );
    } else {
      toast.error(
        mode === "add"
          ? "Failed to save mini challenge"
          : "Failed to update mini challenge"
      );
    }
  };

  // TODO: stuck in mini-challenge-dialog with server actions
  const effectiveOpen = open !== undefined ? open : isOpen;
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog open={effectiveOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Mini Challenge" : "Edit Mini Challenge"}
          </DialogTitle>
          <DialogDescription>
            Record details about your mini coding challenge.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">
              Challenge Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Build a Todo App"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="link">Challenge Link</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) => handleInputChange("link", e.target.value)}
              placeholder="https://github.com/... or https://codesandbox.io/..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="estimatedDuration">
                Estimated Time (minutes) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="estimatedDuration"
                type="number"
                value={formData.estimatedDuration}
                onChange={(e) =>
                  handleInputChange("estimatedDuration", e.target.value)
                }
                placeholder="60"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="actualDuration">Actual Time (minutes)</Label>
              <Input
                id="actualDuration"
                type="number"
                value={formData.actualDuration}
                onChange={(e) =>
                  handleInputChange("actualDuration", e.target.value)
                }
                placeholder="75"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="unfinished">Unfinished</SelectItem>
                <SelectItem value="abandoned">Abandoned</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="learnings">Learnings & Notes</Label>
            <Textarea
              id="learnings"
              value={formData.learnings}
              onChange={(e) => handleInputChange("learnings", e.target.value)}
              placeholder="What did you learn? What went well? What could be improved?"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          {mode === "edit" && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add Challenge" : "Update Challenge"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
