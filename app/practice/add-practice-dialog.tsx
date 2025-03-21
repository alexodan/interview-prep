"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { PracticeSession } from "./types";

interface AddPracticeDialogProps {
  mode?: "add" | "edit";
  session?: PracticeSession;
  trigger?: React.ReactNode;
}

export function AddPracticeDialog({
  mode = "add",
  session,
  trigger,
}: AddPracticeDialogProps) {
  const [open, setOpen] = useState(false);
  const { saveSession, updateSession, deleteSession } = usePracticeSessions();
  const [formData, setFormData] = useState(
    session
      ? {
          title: session.title,
          description: session.description,
          category: session.category,
          difficulty: session.difficulty,
          duration: session.duration.toString(),
          language: session.language,
          status: session.status,
          notes: session.notes,
        }
      : {
          title: "",
          description: "",
          category: "",
          difficulty: "",
          duration: "",
          language: "",
          status: "",
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
      setOpen(false);
      toast.success("Practice session deleted successfully");
    } else {
      toast.error("Failed to delete practice session");
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !formData.title ||
      !formData.category ||
      !formData.difficulty ||
      !formData.status
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const sessionData = {
      ...formData,
      status: formData.status as "solved" | "unsolved" | "review",
      difficulty: formData.difficulty as "easy" | "medium" | "hard",
      duration: parseInt(formData.duration) || 0,
    };

    let result;
    if (mode === 'edit' && session) {
      result = await updateSession(session.id, sessionData);
    } else {
      result = await saveSession(sessionData);
    }

    if (result.success) {
      // First reset the form if we're adding a new session
      if (mode === 'add') {
        setFormData({
          title: "",
          description: "",
          category: "",
          difficulty: "",
          duration: "",
          language: "",
          status: "",
          notes: "",
        });
      }
      // Then close the dialog
      setOpen(false);
      // Finally show the success message
      toast.success(mode === 'add' ? "Practice session saved successfully" : "Practice session updated successfully");
    } else {
      toast.error(mode === 'add' ? "Failed to save practice session" : "Failed to update practice session");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Practice Session
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Practice Session" : "Edit Practice Session"}
          </DialogTitle>
          <DialogDescription>
            Record details about your coding practice session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">
              Problem Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="e.g. Two Sum"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Problem Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the problem..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arrays">Arrays</SelectItem>
                  <SelectItem value="strings">Strings</SelectItem>
                  <SelectItem value="trees">Trees</SelectItem>
                  <SelectItem value="graphs">Graphs</SelectItem>
                  <SelectItem value="dp">Dynamic Programming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="difficulty">
                Difficulty <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) =>
                  handleInputChange("difficulty", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="e.g. 30"
                min="1"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Programming Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => handleInputChange("language", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>
              Status <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="unsolved">Unsolved</SelectItem>
                <SelectItem value="review">Needs Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes / Solution Approach</Label>
            <Textarea
              id="notes"
              placeholder="Describe your approach, implementation details, or areas for improvement..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <div>
            {mode === "edit" && (
              <Button
                variant="destructive"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this practice session?")) {
                    handleDelete();
                  }
                }}
              >
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
