"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { PracticeSession } from "../types";

export function usePracticeSessions() {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const response = await fetch("/api/practice");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setSessions(data.sessions);
    } catch (err) {
      setError("Failed to load practice sessions");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSession = async <T extends PracticeSession>(
    sessionData: Omit<T, "id" | "createdAt">
  ) => {
    try {
      const newSession = {
        ...sessionData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("/api/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSession),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Update sessions by fetching fresh data
      await loadSessions();
      return { success: true, session: newSession };
    } catch (err) {
      setError("Failed to save practice session");
      console.error(err);
      return { success: false, error: "Failed to save practice session" };
    }
  };

  const updateSession = async <T extends PracticeSession>(
    sessionId: string,
    updates: Partial<Omit<T, "id" | "createdAt" | "type">> & { type: T["type"] }
  ) => {
    try {
      const response = await fetch("/api/practice", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sessionId, updates }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId ? { ...session, ...updates } : session
        )
      );
      return { success: true };
    } catch (err) {
      setError("Failed to update practice session");
      console.error(err);
      return { success: false, error: "Failed to update practice session" };
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      const response = await fetch("/api/practice", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sessionId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
      return { success: true };
    } catch (err) {
      setError("Failed to delete practice session");
      console.error(err);
      return { success: false, error: "Failed to delete practice session" };
    }
  };

  return {
    sessions,
    isLoading,
    error,
    saveSession,
    updateSession,
    deleteSession,
  };
}
