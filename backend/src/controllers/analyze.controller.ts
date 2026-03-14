import { Request, Response } from 'express';
import { extractTextFromPDF } from '../services/pdf.service';
import { analyzeCVWithAI, matchCVWithJob } from '../services/gemini.service';

export const analyzeCV = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No se recibió ningún archivo PDF.' });
      return;
    }

    const cvText = await extractTextFromPDF(req.file.buffer);
    const analysis = await analyzeCVWithAI(cvText);

    res.json({
      success: true,
      analysis,
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno del servidor';
    res.status(500).json({ error: message });
  }
};

export const matchCV = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No se recibió ningún archivo PDF.' });
      return;
    }

    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim().length === 0) {
      res.status(400).json({ error: 'Se requiere la descripción del puesto.' });
      return;
    }

    const cvText = await extractTextFromPDF(req.file.buffer);
    const matchResult = await matchCVWithJob(cvText, jobDescription);

    res.json({
      success: true,
      match: matchResult,
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno del servidor';
    res.status(500).json({ error: message });
  }
};