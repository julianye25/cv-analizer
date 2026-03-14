import { Request, Response } from 'express';
import { extractTextFromPDF } from '../services/pdf.service';

export const analyzeCV = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No se recibió ningún archivo PDF.' });
      return;
    }

    const text = await extractTextFromPDF(req.file.buffer);

    res.json({
      success: true,
      characters: text.length,
      preview: text.substring(0, 300) + '...',
      fullText: text,
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno del servidor';
    res.status(500).json({ error: message });
  }
};