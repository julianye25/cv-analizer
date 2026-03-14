import { PDFParse } from 'pdf-parse';

export const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  const data = await parser.getText();
  await parser.destroy();
  
  if (!data.text || data.text.trim().length === 0) {
    throw new Error('No se pudo extraer texto del PDF. Verifica que no sea una imagen escaneada.');
  }

  return data.text.trim();
};