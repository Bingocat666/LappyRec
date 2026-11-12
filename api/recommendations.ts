import { generateLaptopRecommendations, formatErrorMessage } from '../services/recommendationService';

export default async function handler(req: any, res: any) {
  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    let body = req.body;
    // Handle stringified body if not automatically parsed
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: 'Invalid JSON request body.' });
      }
    }

    const { answers } = body || {};
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Missing or invalid answers array.' });
    }

    const recommendations = await generateLaptopRecommendations(answers);
    return res.status(200).json({ recommendations });
  } catch (error: any) {
    console.error('Error in Vercel /api/recommendations handler:', error);
    const formatted = formatErrorMessage(error);
    return res.status(500).json({
      error: formatted || 'Failed to generate laptop recommendations.',
    });
  }
}
