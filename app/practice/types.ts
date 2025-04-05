interface BaseSession {
  id: string;
  createdAt: string;
}

export interface LeetCodeSession extends BaseSession {
  type: "leetcode";
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  duration: number;
  language: string;
  status: "solved" | "unsolved" | "review";
  notes?: string;
}

export interface MiniChallengeSession extends BaseSession {
  type: "mini-challenge";
  title: string;
  link: string;
  estimatedDuration: number;
  actualDuration: number;
  status: "completed" | "in-progress" | "abandoned";
  learnings?: string;
}

export interface StudySession extends BaseSession {
  type: "study";
  topic: string;
  resources: string;
  duration: number;
  comprehensionLevel: "low" | "medium" | "high";
  keyTakeaways?: string;
  nextSteps?: string;
}

export interface TypingSession extends BaseSession {
  type: "typing";
  wpm?: number;
  accuracy?: number;
  notes?: string;
}

export type PracticeSession =
  | LeetCodeSession
  | MiniChallengeSession
  | StudySession
  | TypingSession;

export type NewPracticeSession = Omit<PracticeSession, "id" | "createdAt">;

type BaseFormState = {
  createdAt: string;
};

export type LeetCodeFormState = BaseFormState & {
  type: "leetcode";
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard" | "";
  duration: string;
  language: string;
  status: "solved" | "unsolved" | "review" | "";
  notes: string;
};

export type MiniChallengeFormState = BaseFormState & {
  type: "mini-challenge";
  title: string;
  link: string;
  estimatedDuration: string;
  actualDuration: string;
  status: "completed" | "in-progress" | "abandoned" | "";
  learnings: string;
};

export type StudyFormState = BaseFormState & {
  type: "study";
  topic: string;
  resources: string;
  duration: string;
  comprehensionLevel: "low" | "medium" | "high" | "";
  keyTakeaways: string;
  nextSteps: string;
};

export type TypingFormState = BaseFormState & {
  type: "typing";
  wpm: string;
  accuracy: string;
  notes: string;
};

export type PracticeFormState =
  | LeetCodeFormState
  | MiniChallengeFormState
  | StudyFormState
  | TypingFormState;
