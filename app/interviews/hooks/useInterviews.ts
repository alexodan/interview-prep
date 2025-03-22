"use client";

import { useState, useEffect } from "react";
import { Interview } from "../types";
import { toast } from "sonner";

export function useInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      const response = await fetch("/api/interviews");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setInterviews(data.interviews);
    } catch (err) {
      setError("Failed to load interviews");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveInterview = async (interviewData: Omit<Interview, "id">) => {
    try {
      const response = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interviewData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Refresh interviews after saving
      await loadInterviews();
      return { success: true };
    } catch (err) {
      setError("Failed to save interview");
      console.error(err);
      return { success: false, error: "Failed to save interview" };
    }
  };

  const updateInterview = async (
    interviewId: string,
    updates: Partial<Interview>
  ) => {
    try {
      const response = await fetch("/api/interviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: interviewId, updates }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Update local state optimistically
      setInterviews((prev) =>
        prev.map((interview) =>
          interview.id === interviewId
            ? { ...interview, ...updates }
            : interview
        )
      );
      return { success: true };
    } catch (err) {
      setError("Failed to update interview");
      console.error(err);
      return { success: false, error: "Failed to update interview" };
    }
  };

  const deleteInterview = async (interviewId: string) => {
    try {
      const response = await fetch("/api/interviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: interviewId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Update local state optimistically
      setInterviews((prev) =>
        prev.filter((interview) => interview.id !== interviewId)
      );
      return { success: true };
    } catch (err) {
      setError("Failed to delete interview");
      console.error(err);
      return { success: false, error: "Failed to delete interview" };
    }
  };

  const getUpcomingInterviews = () => {
    const now = new Date();
    return interviews
      .filter(
        (interview) =>
          interview.status === "scheduled" && new Date(interview.date) > now
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return {
    interviews,
    isLoading,
    error,
    saveInterview,
    updateInterview,
    deleteInterview,
    getUpcomingInterviews,
  };
}
