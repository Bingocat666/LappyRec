
import type { Question } from './types';

export const quizQuestions: Question[] = [
  {
    key: 'primaryUse',
    question: "What will be your primary use for this laptop?",
    options: ["Gaming & Streaming", "Professional Work (Office, Coding)", "Creative (Video/Photo Editing)", "School & Everyday Browsing"],
  },
  {
    key: 'budget',
    question: "What is your approximate budget?",
    options: ["Under $700", "$700 - $1200", "$1200 - $1800", "$1800+"],
  },
  {
    key: 'portability',
    question: "How important is portability to you?",
    options: ["Very important (I travel a lot)", "Somewhat important (occasional travel)", "Not important (mostly stationary)"],
  },
  {
    key: 'os',
    question: "Which operating system do you prefer?",
    options: ["Windows", "macOS", "ChromeOS", "No preference"],
  },
  {
    key: 'performance',
    question: "What level of performance do you need?",
    options: ["Basic (web, email, office apps)", "Mid-range (multitasking, light creative work)", "High-end (heavy gaming, 4K video editing, complex software)"],
  },
  {
    key: 'screenSize',
    question: "What screen size are you looking for?",
    options: ["Compact (11-13 inches)", "Standard (14-15 inches)", "Large (16+ inches)"],
  },
];
