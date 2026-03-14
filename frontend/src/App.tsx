import { useState } from 'react';
import {
  ThemeProvider, CssBaseline, Container, Box,
  Typography, TextField, Button, Alert,
  CircularProgress, Divider,
} from '@mui/material';
import { theme } from './theme';
import { UploadZone } from './components/UploadZone';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeCV, matchCVWithJob } from './services/api';
import type { AppState, JobMatchResult } from './types/analysis.types';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [state, setState] = useState<AppState>({ status: 'idle' });
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);

  const handleAnalyze = async () => {
    if (!file) return;
    setState({ status: 'loading' });
    setMatchResult(null);
    try {
      const analysis = await analyzeCV(file);
      setState({ status: 'success', analysis });
    } catch {
      setState({ status: 'error', message: 'Error al analizar el CV. Intenta de nuevo.' });
    }
  };

  const handleMatch = async () => {
    if (!file || !jobDescription.trim()) return;
    try {
      const result = await matchCVWithJob(file, jobDescription);
      setMatchResult(result);
    } catch {
      setState({ status: 'error', message: 'Error al comparar con la oferta.' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 6 }}>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h4" fontWeight={700}>CV Analyzer AI</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Sube tu CV y obtén un análisis detallado con inteligencia artificial
          </Typography>
        </Box>

        {/* Upload */}
        <UploadZone onFileSelected={setFile} disabled={state.status === 'loading'} />

        {file && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              📄 {file.name}
            </Typography>
            <Button
              variant="contained"
              onClick={handleAnalyze}
              disabled={state.status === 'loading'}
              startIcon={state.status === 'loading'
                ? <CircularProgress size={16} color="inherit" />
                : <AutoAwesomeIcon />}
            >
              {state.status === 'loading' ? 'Analizando...' : 'Analizar CV'}
            </Button>
          </Box>
        )}

        {/* Error */}
        {state.status === 'error' && (
          <Alert severity="error" sx={{ mt: 2 }}>{state.message}</Alert>
        )}

        {/* Resultados */}
        {state.status === 'success' && (
          <Box sx={{ mt: 4 }}>
            <AnalysisResult analysis={state.analysis} />

            {/* Job Match */}
            <Divider sx={{ my: 4 }} />
            <Typography variant="h6" gutterBottom>
              ¿Quieres saber qué tan compatible eres con una oferta?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              placeholder="Pega aquí la descripción del puesto de trabajo..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="outlined"
              onClick={handleMatch}
              disabled={!jobDescription.trim()}
            >
              Ver compatibilidad
            </Button>

            {/* Match Result */}
            {matchResult && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography fontWeight={700} gutterBottom>
                  Compatibilidad: {matchResult.matchPercentage}%
                </Typography>
                <Typography variant="body2">{matchResult.recommendation}</Typography>
                {matchResult.missingSkills.length > 0 && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Skills faltantes:</strong> {matchResult.missingSkills.join(', ')}
                  </Typography>
                )}
              </Alert>
            )}
          </Box>
        )}

      </Container>
    </ThemeProvider>
  );
}