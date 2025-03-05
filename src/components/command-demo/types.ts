
export interface Task {
  id: string;
  type: "social" | "email";
  status: "pending" | "completed" | "failed";
  content: string;
  timestamp: string;
  details?: {
    sent?: number;
    failed?: number;
    opened?: number;
  };
}
