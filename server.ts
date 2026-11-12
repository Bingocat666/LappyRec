import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

function formatErrorMessage(err: any): string {
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

const recommendationSchema = {
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

async function generateLaptopRecommendations(prompt: string) {
  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let lastError: any = null;

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

app.post('/api/recommendations', async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Missing or invalid answers array.' });
    }

    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not configured on the server.');
      return res.status(500).json({
        error: 'Gemini API key is not configured on the server. Please check Settings > Secrets.',
      });
    }

    const answersText = answers
      .map((a: { question: string; answer: string }) => `- ${a.question}: ${a.answer}`)
      .join('\n');

    const prompt = `Based on the following user answers to a laptop quiz, please recommend 4 distinct laptops from different brands if possible.

User's Answers:
${answersText}

For each recommendation, provide the requested details. Ensure the match percentage accurately reflects how well the laptop's features and price align with *all* of the user's answers. The recommendations should be sorted in descending order of the match percentage.

Return your response as a JSON array that adheres to the provided schema.`;

    const recommendations = await generateLaptopRecommendations(prompt);
    return res.json({ recommendations });
  } catch (error: any) {
    console.error('Error in /api/recommendations:', error);
    const formatted = formatErrorMessage(error);
    return res.status(500).json({
      error: formatted || 'Failed to get recommendations from the AI model.',
    });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
