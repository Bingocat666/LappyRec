import type { Answer, LaptopRecommendation } from '../types';

export const getLaptopRecommendations = async (answers: Answer[]): Promise<LaptopRecommendation[]> => {
  const response = await fetch('/api/recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to get recommendations from the server.');
  }

  const data = await response.json();
  if (!data || !Array.isArray(data.recommendations)) {
    throw new Error('Invalid response format received from the server.');
  }

  return data.recommendations;
};
