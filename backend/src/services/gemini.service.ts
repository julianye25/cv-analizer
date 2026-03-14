import { GoogleGenerativeAI } from '@google/generative-ai';

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

const parseJSON = <T>(text: string): T => {
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
};

const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY no está definida en el entorno.');
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { temperature: 0.3 },
  });
};

export const analyzeCVWithAI = async (cvText: string): Promise<CVAnalysis> => {
  const model = getModel(); // ← se crea aquí, cuando ya dotenv cargó
  
  const prompt = `
Eres un experto en recursos humanos y reclutamiento técnico.
Analiza el siguiente CV y responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, sin bloques de código markdown.

El JSON debe tener exactamente esta estructura:
{
  "score": número del 0 al 100 que representa la calidad general del CV,
  "summary": "resumen ejecutivo del perfil en 2-3 oraciones",
  "strengths": ["fortaleza 1", "fortaleza 2", "fortaleza 3"],
  "weaknesses": ["debilidad 1", "debilidad 2"],
  "suggestions": ["sugerencia concreta 1", "sugerencia concreta 2", "sugerencia concreta 3"],
  "keywords": ["tecnología o habilidad clave 1", "tecnología 2", "tecnología 3"]
}

CV a analizar:
"""
${cvText}
"""
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseJSON<CVAnalysis>(text);
};

export const matchCVWithJob = async (
  cvText: string,
  jobDescription: string
): Promise<JobMatchResult> => {
  const model = getModel(); // ← igual aquí

  const prompt = `
Eres un experto en reclutamiento técnico.
Compara el CV con la descripción del puesto y responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional.

El JSON debe tener exactamente esta estructura:
{
  "matchPercentage": número del 0 al 100,
  "matchingSkills": ["habilidad que el candidato tiene y el puesto pide"],
  "missingSkills": ["habilidad que el puesto pide y el candidato no tiene"],
  "recommendation": "recomendación concreta en 2 oraciones sobre si aplicar o qué mejorar"
}

CV:
"""
${cvText}
"""

Descripción del puesto:
"""
${jobDescription}
"""
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseJSON<JobMatchResult>(text);
};