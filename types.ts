export interface TP {
  id: string;
  code: string;
  label: string;
  desc: string;
}

export interface Student {
  id: number;
  name: string;
  scores: Record<string, number | string>;
}

export interface Config {
  schoolName: string;
  teacherName: string;
  headmasterName: string;
  subject: string;
  phase: string;
  year: string;
}

export interface IntervalStatus {
  label: string;
  color: string;
  text: string;
  action: string;
}

export interface User {
  username: string;
  password?: string; // stored securely (simulated)
  name?: string;
}