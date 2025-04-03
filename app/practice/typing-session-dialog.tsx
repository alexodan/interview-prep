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
import { usePracticeSessions } from "./hooks/usePracticeSessions";
import { toast } from "sonner";
import { TypingSession } from "./types";

interface TypingSessionDialogProps {
  mode?: "add" | "edit";
  session?: TypingSession;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TypingSessionDialog({
  mode = "add",
  session,
  open,
  onOpenChange,
}: TypingSessionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { saveSession, updateSession, deleteSession } = usePracticeSessions();
  const [formData, setFormData] = useState(
    session
      ? {
          wpm: session.wpm.toString(),
          accuracy: session.accuracy.toString(),
          notes: session.notes,
        }
      : {
          wpm: "",
          accuracy: "",
          notes: "",
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
      toast.success("Typing session deleted successfully");
    } else {
      toast.error("Failed to delete typing session");
    }
  };

  const handleSubmit = async () => {
    if (!formData.wpm || !formData.accuracy) {
      toast.error("Please fill in all required fields");
      return;
    }

    const sessionData = {
      ...formData,
      type: "typing" as const,
      wpm: parseInt(formData.wpm) || 0,
      accuracy: parseFloat(formData.accuracy) || 0,
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
          wpm: "",
          accuracy: "",
          notes: "",
        });
      }
      setIsOpen(false);
      onOpenChange?.(false);
      toast.success(mode === 'add' ? "Typing session saved successfully" : "Typing session updated successfully");
    } else {
      toast.error(mode === 'add' ? "Failed to save typing session" : "Failed to update typing session");
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
            {mode === "add" ? "Add Typing Session" : "Edit Typing Session"}
          </DialogTitle>
          <DialogDescription>
            Record your typing practice results.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="wpm">WPM</Label>
              <Input
                id="wpm"
                type="number"
                value={formData.wpm}
                onChange={(e) => handleInputChange("wpm", e.target.value)}
                placeholder="75"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accuracy">Accuracy (%)</Label>
              <Input
                id="accuracy"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.accuracy}
                onChange={(e) => handleInputChange("accuracy", e.target.value)}
                placeholder="98.5"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any observations about your typing practice..."
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
