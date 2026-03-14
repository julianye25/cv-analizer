export interface CVAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywords: string[];
}

export interface JobMatchResult {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendation: string;
}

export type AppState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; analysis: CVAnalysis }
  | { status: 'error'; message: string };