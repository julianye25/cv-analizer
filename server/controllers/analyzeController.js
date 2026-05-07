import multer from "multer";
import { extractText } from "../services/extractor.js";
import { analyzeCV } from "../services/ia.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".docx", ".doc", ".txt"];
    const ext = file.originalname
      .toLowerCase()
      .slice(file.originalname.lastIndexOf("."));
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Formato no permitido. Usa PDF, DOCX o TXT"));
    }
  },
});

export const analyzeFile = [
  upload.single("cv"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No se subió ningún archivo" });
      }

      const text = await extractText(req.file);

      if (!text || text.length < 50) {
        return res.status(400).json({
          error: "El CV parece estar vacío o tiene muy poco contenido",
        });
      }

      const analysis = await analyzeCV(text);

      res.json({
        success: true,
        analysis,
        filename: req.file.originalname,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },
];
