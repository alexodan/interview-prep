"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeetCodeSessionDialog } from "./leetcode-session-dialog";
import { MiniChallengeDialog } from "./mini-challenge-dialog";
import { StudySessionDialog } from "./study-session-dialog";
import { TypingSessionDialog } from "./typing-session-dialog";
import { Plus } from "lucide-react";

export function PracticeTypeSelector() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTypeSelect = (value: string) => {
    setSelectedType(value);
    setDialogOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedType} onValueChange={handleTypeSelect}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select practice type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="leetcode">LeetCode</SelectItem>
          <SelectItem value="mini-challenge">Mini Challenge</SelectItem>
          <SelectItem value="study">Study Session</SelectItem>
          <SelectItem value="typing">Typing Practice</SelectItem>
          <SelectItem value="code-review">Code Review</SelectItem>
          <SelectItem value="system-design">System Design</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={() => setDialogOpen(true)} disabled={!selectedType}>
        <Plus className="mr-2 h-4 w-4" />
        Add Session
      </Button>

      {/* Dialogs */}
      {selectedType === "leetcode" && (
        <LeetCodeSessionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
      {selectedType === "mini-challenge" && (
        <MiniChallengeDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
      {selectedType === "study" && (
        <StudySessionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
      {selectedType === "typing" && (
        <TypingSessionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </div>
  );
}
