import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';

export async function extractText(file) {
  const buffer = file.buffer;
  const filename = file.originalname.toLowerCase();
  
  if (filename.endsWith('.pdf')) {
    return await extractPDF(buffer);
  } else if (filename.endsWith('.docx')) {
    return await extractDOCX(buffer);
  } else if (filename.endsWith('.doc')) {
    return await extractDOCX(buffer);
  } else if (filename.endsWith('.txt')) {
    return buffer.toString('utf-8');
  }
  
  throw new Error('Formato no soportado. Usa PDF, DOCX o TXT');
}

async function extractPDF(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text.trim();
  } catch (error) {
    throw new Error('Error al leer PDF: ' + error.message);
  }
}

async function extractDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  } catch (error) {
    throw new Error('Error al leer DOCX: ' + error.message);
  }
}