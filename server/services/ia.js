import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeCV(cvText) {
  const prompt = `
Eres un experto en recursos humanos con más de 15 años de experiencia evaluando candidatos para empresas de tecnología, banca y empresas multinacionales.

Analiza el siguiente currículum vitae y proporciona una evaluación completa en formato JSON con esta estructura exacta:

{
  "resumen": "Resumen ejecutivo de 2-3 oraciones sobre el perfil del candidato",
  "fortalezas": [
    "Fortaleza 1 encontrada en el CV",
    "Fortaleza 2 encontrada en el CV",
    "Fortaleza 3 encontrada en el CV"
  ],
  "areas_mejorar": [
    "Área de mejora 1 identificada",
    "Área de mejora 2 identificada",
    "Área de mejora 3 identificada"
  ],
  "recomendaciones": [
    "Recomendación concreta 1 para mejorar el CV",
    "Recomendación concreta 2 para mejorar el CV",
    "Recomendación concreta 3 para mejorar el CV",
    "Recomendación concreta 4 para mejorar el CV",
    "Recomendación concreta 5 para mejorar el CV"
  ],
  "puntuacion": numero entre 0 y 100 representando la calidad general del CV
}

Sigue estas reglas:
1. Las recomendaciones deben ser específicas y accionables, no genéricas
2. Considera: formato, ortografía, estructura, claridad, cuantificación de logros, palabras clave, experiencia
3. Si el CV está vacío o no contiene información relevante, retorna puntuacion: 0 y indica que no se pudo analizar
4. Usa solo español para todas las respuestas
5. El JSON debe ser válido y parseable, sin comentarios adicionales

Aqui está el CV a analizar:
${cvText}
`;

  try {
    const chat = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4000,
    });

    const text = chat.choices[0]?.message?.content || "";

    if (!text) {
      throw new Error("No se recibió respuesta de Groq");
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    return JSON.parse(cleanText);
  } catch (error) {
    throw new Error("Error al analizar CV con IA: " + error.message);
  }
}
