import { Router } from 'express';
import multer from 'multer';
import { analyzeCV, matchCV } from '../controllers/analyze.controller';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF.'));
    }
  },
});

// Ruta 1: análisis completo del CV
router.post('/analyze', upload.single('cv'), analyzeCV);

// Ruta 2: match del CV con una oferta de trabajo
router.post('/match', upload.single('cv'), matchCV);

export default router;