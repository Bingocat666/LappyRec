import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local' });

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  generateLaptopRecommendations,
  formatErrorMessage,
} from './services/recommendationService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.post('/api/recommendations', async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Missing or invalid answers array.' });
    }

    const recommendations = await generateLaptopRecommendations(answers);
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
