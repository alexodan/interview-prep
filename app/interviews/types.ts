export type InterviewType = "technical" | "behavioral" | "system-design";
export type InterviewRound = "initial" | "coding" | "system-design" | "behavioral" | "final";
export type InterviewStatus = "scheduled" | "completed" | "cancelled";

export interface Interview {
  id: string;
  company: string;
  role: string;
  date: string;
  type: InterviewType;
  round: InterviewRound;
  status: InterviewStatus;
  notes?: string;
}
