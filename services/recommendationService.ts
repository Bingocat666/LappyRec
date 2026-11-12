import { GoogleGenAI, Type } from '@google/genai';
import type { Answer, LaptopRecommendation } from '../types';

export const recommendationSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: 'A plausible, specific laptop model name (e.g., "Dell XPS 15 (9530)", "Apple MacBook Air (M3)").',
      },
      specs: {
        type: Type.OBJECT,
        properties: {
          processor: { type: Type.STRING },
          ram: { type: Type.STRING },
          storage: { type: Type.STRING },
          graphics: { type: Type.STRING },
        },
        required: ['processor', 'ram', 'storage', 'graphics'],
      },
      description: {
        type: Type.STRING,
        description: "A brief description (2-3 sentences) explaining why it's a good fit for the user.",
      },
      matchPercentage: {
        type: Type.INTEGER,
        description: "A number from 0 to 100 indicating how well it aligns with the user's answers.",
      },
    },
    required: ['name', 'specs', 'description', 'matchPercentage'],
  },
};

export const getApiKey = (): string =>
  process.env.GEMINI_API_KEY ||
  process.env.API_KEY ||
  process.env.VITE_GEMINI_API_KEY ||
  '';

export const getAiClient = () =>
  new GoogleGenAI({
    apiKey: getApiKey(),
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

export function formatErrorMessage(err: any): string {
  if (!err) return 'An unexpected error occurred.';
  const raw = err?.message || String(err);
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.error?.message) {
      return parsed.error.message;
    }
  } catch {
    // raw is plain text
  }
  return raw;
}

export async function generateLaptopRecommendations(answers: Answer[]): Promise<LaptopRecommendation[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error(
      'Gemini API key is not configured. On Vercel, please add GEMINI_API_KEY in Project Settings > Environment Variables, then Redeploy.'
    );
  }

  const answersText = answers
    .map((a: Answer) => `- ${a.question}: ${a.answer}`)
    .join('\n');

  const prompt = `Based on the following user answers to a laptop quiz, please recommend 4 distinct laptops from different brands if possible.

User's Answers:
${answersText}

For each recommendation, provide the requested details. Ensure the match percentage accurately reflects how well the laptop's features and price align with *all* of the user's answers. The recommendations should be sorted in descending order of the match percentage.

Return your response as a JSON array that adheres to the provided schema.`;

  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let lastError: any = null;
  const ai = getAiClient();

  for (const model of models) {
    try {
      console.log(`[INFO] Requesting laptop recommendations using model: ${model}`);
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: recommendationSchema,
        },
      });

      const jsonText = (response.text ?? '').trim();
      const recommendations = JSON.parse(jsonText);

      if (!Array.isArray(recommendations) || recommendations.length === 0) {
        throw new Error('Model did not return a valid array of recommendations.');
      }

      console.log(`[INFO] Successfully generated ${recommendations.length} recommendations using ${model}`);
      return recommendations;
    } catch (err: any) {
      lastError = err;
      const msg = err?.message || '';
      console.warn(`[WARN] Model ${model} failed: ${msg}. Attempting next available model if possible.`);
    }
  }

  throw lastError || new Error('Failed to generate laptop recommendations.');
}
