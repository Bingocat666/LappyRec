
export interface Question {
  question: string;
  options: string[];
  key: string;
}

export interface Answer {
  question: string;
  answer: string;
}

export interface LaptopSpecs {
  processor: string;
  ram: string;
  storage: string;
  graphics: string;
}

export interface LaptopRecommendation {
  name: string;
  specs: LaptopSpecs;
  description: string;
  matchPercentage: number;
}

export enum QuizState {
  WELCOME,
  QUIZ,
  LOADING,
  RESULTS
}
