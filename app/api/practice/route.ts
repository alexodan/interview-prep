'use server'

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from 'next/cache';
import { PracticeSession } from "@/app/practice/types";

const DATA_FILE_PATH = path.join(
  process.cwd(),
  "app/practice/data/practice-sessions.json"
);

async function readSessionsFile() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with empty sessions array
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify({ sessions: [] }));
    return { sessions: [] };
  }
}

async function writeSessionsFile(sessions: PracticeSession[]) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify({ sessions }, null, 2));
}

export async function getPracticeSessions() {
  try {
    const data = await readSessionsFile();
    return { success: true, data: data.sessions as PracticeSession[] };
  } catch (error) {
    return { success: false, error: "Failed to fetch practice sessions" };
  }
}

export async function createSession(formData: FormData) {
  try {
    const data = await readSessionsFile();
    const newSession = {
      id: crypto.randomUUID(),
      type: formData.get('type'),
      title: formData.get('title'),
      link: formData.get('link'),
      estimatedDuration: formData.get('estimatedDuration'),
      actualDuration: formData.get('actualDuration'),
      status: formData.get('status') || 'in-progress',
      learnings: formData.get('learnings'),
      createdAt: new Date().toISOString()
    } as PracticeSession;

    data.sessions.push(newSession);
    await writeSessionsFile(data.sessions);
    revalidatePath('/practice');
    return { success: true, data: newSession };
  } catch (error) {
    return { success: false, error: "Failed to create session" };
  }
}

export async function updateSession(id: string, formData: FormData) {
  try {
    const data = await readSessionsFile();
    const sessionIndex = data.sessions.findIndex((s: PracticeSession) => s.id === id);
    
    if (sessionIndex === -1) {
      return { success: false, error: "Session not found" };
    }

    const updatedSession = {
      ...data.sessions[sessionIndex],
      title: formData.get('title') || data.sessions[sessionIndex].title,
      link: formData.get('link') || data.sessions[sessionIndex].link,
      estimatedDuration: formData.get('estimatedDuration') || data.sessions[sessionIndex].estimatedDuration,
      actualDuration: formData.get('actualDuration') || data.sessions[sessionIndex].actualDuration,
      status: formData.get('status') || data.sessions[sessionIndex].status,
      learnings: formData.get('learnings') || data.sessions[sessionIndex].learnings,
    };

    data.sessions[sessionIndex] = updatedSession;
    await writeSessionsFile(data.sessions);
    revalidatePath('/practice');
    return { success: true, data: updatedSession };
  } catch (error) {
    return { success: false, error: "Failed to update session" };
  }
}

export async function createPracticeSession(newSession: PracticeSession) {
  try {
    const data = await readSessionsFile();

    data.sessions.push(newSession);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));

    return newSession;
  } catch (error) {
    return { error: "Failed to save practice session" };
  }
}

export async function updatePracticeSession(
  id: string,
  updates: Partial<PracticeSession>
) {
  try {
    const data = await readSessionsFile();

    data.sessions = data.sessions.map((session: PracticeSession) =>
      session.id === id ? { ...session, ...updates } : session
    );

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
    return { success: true };
  } catch (error) {
    return { error: "Failed to update practice session" };
  }
}

export async function deletePracticeSession(id: string) {
  try {
    const data = await readSessionsFile();

    data.sessions = data.sessions.filter(
      (session: PracticeSession) => session.id !== id
    );

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete practice session" };
  }
}
