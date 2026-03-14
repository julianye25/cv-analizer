import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoutes from './routes/analyze.routes';

dotenv.config();
console.log('API KEY cargada:', process.env.GEMINI_API_KEY ? 'SÍ ✓' : 'NO ✗');
console.log('Longitud de la key:', process.env.GEMINI_API_KEY?.length);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CV Analyzer API running' });
});

app.use('/api', analyzeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});