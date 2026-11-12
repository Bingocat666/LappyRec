# Laptop Recommender AI

An intelligent full-stack quiz application that asks users about their computing needs and budget, then uses Google Gemini AI to analyze requirements and recommend top laptops matching their profile.

## Getting Started Locally (from GitHub)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A Google Gemini API Key (free from [Google AI Studio](https://aistudio.google.com/app/apikey))

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Configure API Key
Create a `.env` file in the root directory (you can copy `.env.example`):
```bash
cp .env.example .env
```

Open `.env` and paste your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### 5. Production Build
To create an optimized production build:
```bash
npm run build
npm start
```

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TSX
- **AI SDK**: `@google/genai` (Google Gen AI TypeScript SDK)
