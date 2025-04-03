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
import { StudySession } from "./types";

interface StudySessionDialogProps {
  mode?: "add" | "edit";
  session?: StudySession;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function StudySessionDialog({
  mode = "add",
  session,
  open,
  onOpenChange,
}: StudySessionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { saveSession, updateSession, deleteSession } = usePracticeSessions();
  const [formData, setFormData] = useState(
    session
      ? {
          topic: session.topic,
          resources: session.resources,
          duration: session.duration.toString(),
          comprehensionLevel: session.comprehensionLevel,
          keyTakeaways: session.keyTakeaways,
          nextSteps: session.nextSteps,
        }
      : {
          topic: "",
          resources: "",
          duration: "",
          comprehensionLevel: "",
          keyTakeaways: "",
          nextSteps: "",
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
      toast.success("Study session deleted successfully");
    } else {
      toast.error("Failed to delete study session");
    }
  };

  const handleSubmit = async () => {
    if (!formData.topic || !formData.comprehensionLevel) {
      toast.error("Please fill in all required fields");
      return;
    }

    const sessionData = {
      ...formData,
      type: "study" as const,
      duration: parseInt(formData.duration) || 0,
      comprehensionLevel: formData.comprehensionLevel as "beginner" | "intermediate" | "advanced" | "expert",
    };

    let result;
    if (mode === 'edit' && session) {
      result = await updateSession(session.id, sessionData);
    } else {
      result = await saveSession(sessionData);
    }

    if (result.success) {
      if (mode === 'add') {
        setFormData({
          topic: "",
          resources: "",
          duration: "",
          comprehensionLevel: "",
          keyTakeaways: "",
          nextSteps: "",
        });
      }
      setIsOpen(false);
      onOpenChange?.(false);
      toast.success(mode === 'add' ? "Study session saved successfully" : "Study session updated successfully");
    } else {
      toast.error(mode === 'add' ? "Failed to save study session" : "Failed to update study session");
    }
  };

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
            {mode === "add" ? "Add Study Session" : "Edit Study Session"}
          </DialogTitle>
          <DialogDescription>
            Record details about your study session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={formData.topic}
              onChange={(e) => handleInputChange("topic", e.target.value)}
              placeholder="React Hooks, System Design Patterns, etc."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="resources">Resources Used</Label>
            <Textarea
              id="resources"
              value={formData.resources}
              onChange={(e) => handleInputChange("resources", e.target.value)}
              placeholder="Links to articles, videos, books, or other materials used..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="60"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comprehensionLevel">Comprehension Level</Label>
              <Select
                value={formData.comprehensionLevel}
                onValueChange={(value) => handleInputChange("comprehensionLevel", value)}
              >
                <SelectTrigger id="comprehensionLevel">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="keyTakeaways">Key Takeaways</Label>
            <Textarea
              id="keyTakeaways"
              value={formData.keyTakeaways}
              onChange={(e) => handleInputChange("keyTakeaways", e.target.value)}
              placeholder="What are the main things you learned?"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nextSteps">Next Steps</Label>
            <Textarea
              id="nextSteps"
              value={formData.nextSteps}
              onChange={(e) => handleInputChange("nextSteps", e.target.value)}
              placeholder="What topics should you explore next? What needs more practice?"
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
            {mode === "add" ? "Add Session" : "Update Session"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
