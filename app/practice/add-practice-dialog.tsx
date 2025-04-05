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
import { Plus } from "lucide-react";
import { PracticeSession } from "./types";
import { usePracticeForm } from "./hooks/usePracticeForm";
import React, { JSX } from "react";

interface AddPracticeDialogProps {
  mode?: "add" | "edit";
  session?: PracticeSession;
  trigger?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddPracticeDialog({
  mode = "add",
  session,
  trigger,
  open,
  setOpen,
}: AddPracticeDialogProps): JSX.Element {
  const {
    formData,
    open: formOpen,
    setOpen: setFormOpen,
    handleInputChange,
    handleSubmit,
    handleDelete,
  } = usePracticeForm({ mode, session, open, setOpen });

  const renderFields = () => {
    if (!formData) return null;
    switch (formData?.type) {
      case "leetcode":
        return (
          <>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData?.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData?.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData?.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData?.difficulty}
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  value={formData?.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={formData?.language}
                  onChange={(e) =>
                    handleInputChange("language", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData?.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solved">Solved</SelectItem>
                    <SelectItem value="unsolved">Unsolved</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData?.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </div>
            </div>
          </>
        );
      case "mini-challenge":
        return (
          <>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData?.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  value={formData?.link}
                  onChange={(e) => handleInputChange("link", e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="estimatedDuration">
                  Estimated Duration (minutes)
                </Label>
                <Input
                  id="estimatedDuration"
                  value={formData?.estimatedDuration}
                  onChange={(e) =>
                    handleInputChange("estimatedDuration", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="actualDuration">
                  Actual Duration (minutes)
                </Label>
                <Input
                  id="actualDuration"
                  value={formData?.actualDuration}
                  onChange={(e) =>
                    handleInputChange("actualDuration", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData?.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="abandoned">Abandoned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="learnings">Learnings</Label>
                <Textarea
                  id="learnings"
                  value={formData?.learnings}
                  onChange={(e) =>
                    handleInputChange("learnings", e.target.value)
                  }
                />
              </div>
            </div>
          </>
        );
      case "study":
        return (
          <>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={formData?.topic}
                  onChange={(e) => handleInputChange("topic", e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="resources">Resources</Label>
                <Input
                  id="resources"
                  value={formData?.resources}
                  onChange={(e) =>
                    handleInputChange("resources", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  value={formData?.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="comprehensionLevel">Comprehension Level</Label>
                <Select
                  value={formData?.comprehensionLevel}
                  onValueChange={(value) =>
                    handleInputChange("comprehensionLevel", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select comprehension level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="keyTakeaways">Key Takeaways</Label>
                <Textarea
                  id="keyTakeaways"
                  value={formData?.keyTakeaways}
                  onChange={(e) =>
                    handleInputChange("keyTakeaways", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nextSteps">Next Steps</Label>
                <Textarea
                  id="nextSteps"
                  value={formData?.nextSteps}
                  onChange={(e) =>
                    handleInputChange("nextSteps", e.target.value)
                  }
                />
              </div>
            </div>
          </>
        );
      case "typing":
        return (
          <>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="wpm">WPM</Label>
                <Input
                  id="wpm"
                  value={formData?.wpm}
                  onChange={(e) => handleInputChange("wpm", e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="accuracy">Accuracy (%)</Label>
                <Input
                  id="accuracy"
                  value={formData?.accuracy}
                  onChange={(e) =>
                    handleInputChange("accuracy", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData?.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
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
              value={formData?.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Problem Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the problem..."
              value={formData?.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData?.category}
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
                value={formData?.difficulty}
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
                value={formData?.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Programming Language</Label>
              <Select
                value={formData?.language}
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
              value={formData?.status}
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
              value={formData?.notes}
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
                  if (
                    confirm(
                      "Are you sure you want to delete this practice session?"
                    )
                  ) {
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
