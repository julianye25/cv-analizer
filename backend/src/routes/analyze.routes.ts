import { Router } from 'express';
import multer from 'multer';
import { analyzeCV } from '../controllers/analyze.controller';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(), // el PDF queda en memoria, no en disco
  limits: { fileSize: 5 * 1024 * 1024 }, // máximo 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF.'));
    }
  },
});

router.post('/analyze', upload.single('cv'), analyzeCV);

export default router;