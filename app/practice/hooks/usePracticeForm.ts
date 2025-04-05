"use client";

import { useState } from "react";
import { toast } from "sonner";
import { usePracticeSessions } from "./usePracticeSessions";
import {
  PracticeFormState,
  LeetCodeFormState,
  MiniChallengeFormState,
  PracticeSession,
  StudyFormState,
  TypingFormState,
} from "../types";

interface UsePracticeFormProps {
  mode: "add" | "edit";
  session?: PracticeSession;
  onSuccess?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

type FormStateKeys = keyof (LeetCodeFormState &
  MiniChallengeFormState &
  StudyFormState &
  TypingFormState);

export function usePracticeForm({
  mode,
  session,
  onSuccess,
  open,
  setOpen,
}: UsePracticeFormProps) {
  const [formData, setFormData] = useState<PracticeFormState>(() =>
    getInitialState(session)
  );
  const { saveSession, updateSession, deleteSession } = usePracticeSessions();

  const handleInputChange = (field: FormStateKeys, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (data: PracticeFormState): boolean => {
    switch (data.type) {
      case "leetcode":
        if (!data.title || !data.category || !data.difficulty || !data.status) {
          toast.error("Please fill in all required fields");
          return false;
        }
        break;
      case "mini-challenge":
        if (!data.title || !data.link || !data.status) {
          toast.error("Please fill in all required fields");
          return false;
        }
        break;
      case "study":
        if (!data.topic || !data.resources || !data.comprehensionLevel) {
          toast.error("Please fill in all required fields");
          return false;
        }
        break;
      case "typing":
        if (!data.wpm || !data.accuracy) {
          toast.error("Please fill in all required fields");
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm(formData)) return;

    const sessionData = mapFormDataToSession(formData);
    let result;

    if (mode === "edit" && session) {
      result = await updateSession(session.id, sessionData);
    } else {
      result = await saveSession(sessionData);
    }

    if (result.success) {
      if (mode === "add") {
        setFormData(getInitialState());
      }
      setOpen(false);
      onSuccess?.();
      toast.success(
        mode === "add"
          ? "Practice session saved successfully"
          : "Practice session updated successfully"
      );
    } else {
      toast.error(
        mode === "add"
          ? "Failed to save practice session"
          : "Failed to update practice session"
      );
    }
  };

  const handleDelete = async () => {
    if (!session) return;

    const result = await deleteSession(session.id);
    if (result.success) {
      setOpen(false);
      onSuccess?.();
      toast.success("Practice session deleted successfully");
    } else {
      toast.error("Failed to delete practice session");
    }
  };

  return {
    formData,
    open,
    setOpen,
    handleInputChange,
    handleSubmit,
    handleDelete,
  };
}

function getInitialState(session?: PracticeSession): PracticeFormState {
  if (!session) {
    return {
      type: "leetcode",
      title: "",
      description: "",
      category: "",
      difficulty: "",
      duration: "",
      language: "",
      status: "",
      notes: "",
      createdAt: new Date().toISOString(),
    };
  }

  switch (session.type) {
    case "leetcode":
      return {
        type: "leetcode",
        title: session.title,
        description: session.description,
        category: session.category,
        difficulty: session.difficulty,
        duration: session.duration.toString(),
        language: session.language,
        status: session.status,
        notes: session.notes || "",
        createdAt: session.createdAt,
      };
    case "mini-challenge":
      return {
        type: "mini-challenge",
        title: session.title,
        link: session.link,
        estimatedDuration: session.estimatedDuration.toString(),
        actualDuration: session.actualDuration.toString(),
        status: session.status,
        learnings: session.learnings || "",
        createdAt: session.createdAt,
      };
    case "study":
      return {
        type: "study",
        topic: session.topic,
        resources: session.resources,
        duration: session.duration.toString(),
        comprehensionLevel: session.comprehensionLevel,
        keyTakeaways: session.keyTakeaways || "",
        nextSteps: session.nextSteps || "",
        createdAt: session.createdAt,
      };
    case "typing":
      return {
        type: "typing",
        wpm: session.wpm?.toString() || "",
        accuracy: session.accuracy?.toString() || "",
        notes: session.notes || "",
        createdAt: session.createdAt,
      };
  }
}

function mapFormDataToSession(
  formData: PracticeFormState
): Omit<PracticeSession, "id"> {
  switch (formData.type) {
    case "leetcode":
      return {
        type: "leetcode" as const,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        difficulty: formData.difficulty as "easy" | "medium" | "hard",
        duration: parseInt(formData.duration) || 0,
        language: formData.language,
        status: formData.status as "solved" | "unsolved" | "review",
        notes: formData.notes || undefined,
      };
    case "mini-challenge":
      return {
        type: "mini-challenge" as const,
        title: formData.title,
        link: formData.link,
        estimatedDuration: parseInt(formData.estimatedDuration) || 0,
        actualDuration: parseInt(formData.actualDuration) || 0,
        status: formData.status as "completed" | "in-progress" | "abandoned",
        learnings: formData.learnings || undefined,
      };
    case "study":
      return {
        type: "study" as const,
        topic: formData.topic,
        resources: formData.resources,
        duration: parseInt(formData.duration) || 0,
        comprehensionLevel: formData.comprehensionLevel as
          | "low"
          | "medium"
          | "high",
        keyTakeaways: formData.keyTakeaways || undefined,
        nextSteps: formData.nextSteps || undefined,
      };
    case "typing":
      return {
        type: "typing" as const,
        wpm: formData.wpm ? parseInt(formData.wpm) : undefined,
        accuracy: formData.accuracy ? parseFloat(formData.accuracy) : undefined,
        notes: formData.notes || undefined,
      };
  }
}
