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
import { LeetCodeSession } from "./types";

interface LeetCodeDialogProps {
  mode?: "add" | "edit";
  session?: LeetCodeSession;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LeetCodeSessionDialog({
  mode = "add",
  session,
  open,
  onOpenChange,
}: LeetCodeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
      toast.success("LeetCode session deleted successfully");
    } else {
      toast.error("Failed to delete LeetCode session");
    }
  };

  const handleSubmit = async () => {
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
      type: "leetcode" as const,
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
      setIsOpen(false);
      onOpenChange?.(false);
      toast.success(mode === 'add' ? "LeetCode session saved successfully" : "LeetCode session updated successfully");
    } else {
      toast.error(mode === 'add' ? "Failed to save LeetCode session" : "Failed to update LeetCode session");
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
            {mode === "add" ? "Add LeetCode Session" : "Edit LeetCode Session"}
          </DialogTitle>
          <DialogDescription>
            Record details about your LeetCode practice session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Problem Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Two Sum"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Problem Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the problem..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arrays">Arrays</SelectItem>
                  <SelectItem value="strings">Strings</SelectItem>
                  <SelectItem value="linked-lists">Linked Lists</SelectItem>
                  <SelectItem value="trees">Trees</SelectItem>
                  <SelectItem value="graphs">Graphs</SelectItem>
                  <SelectItem value="dynamic-programming">Dynamic Programming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => handleInputChange("difficulty", value)}
              >
                <SelectTrigger id="difficulty">
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
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="45"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => handleInputChange("language", value)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
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
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="unsolved">Unsolved</SelectItem>
                <SelectItem value="review">Needs Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Your notes about the approach, learnings, etc..."
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
