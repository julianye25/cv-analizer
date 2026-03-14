import { Box, Typography, Chip, Paper, Grid, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { ScoreGauge } from './ScoreGauge';
import type { CVAnalysis } from '../types/analysis.types';

interface Props {
  analysis: CVAnalysis;
}

export const AnalysisResult = ({ analysis }: Props) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

    {/* Score + Summary */}
    <Paper sx={{ p: 3, display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
      <ScoreGauge score={analysis.score} />
      <Box sx={{ flex: 1, minWidth: 200 }}>
        <Typography variant="h6" gutterBottom>Resumen del perfil</Typography>
        <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
          {analysis.summary}
        </Typography>
      </Box>
    </Paper>

    <Grid container spacing={2}>
      {/* Fortalezas */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CheckCircleIcon sx={{ color: '#22c55e' }} />
            <Typography variant="h6">Fortalezas</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {analysis.strengths.map((s, i) => (
            <Typography key={i} variant="body2" color="text.secondary"
              sx={{ mb: 1, pl: 1, borderLeft: '2px solid #22c55e' }}>
              {s}
            </Typography>
          ))}
        </Paper>
      </Grid>

      {/* Debilidades */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <WarningIcon sx={{ color: '#f59e0b' }} />
            <Typography variant="h6">Áreas de mejora</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {analysis.weaknesses.map((w, i) => (
            <Typography key={i} variant="body2" color="text.secondary"
              sx={{ mb: 1, pl: 1, borderLeft: '2px solid #f59e0b' }}>
              {w}
            </Typography>
          ))}
        </Paper>
      </Grid>
    </Grid>

    {/* Sugerencias */}
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <TipsAndUpdatesIcon sx={{ color: '#6366f1' }} />
        <Typography variant="h6">Sugerencias concretas</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {analysis.suggestions.map((s, i) => (
        <Typography key={i} variant="body2" color="text.secondary"
          sx={{ mb: 1.5, pl: 1, borderLeft: '2px solid #6366f1' }}>
          {i + 1}. {s}
        </Typography>
      ))}
    </Paper>

    {/* Keywords */}
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Palabras clave detectadas</Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {analysis.keywords.map((k, i) => (
          <Chip key={i} label={k} size="small" color="primary" variant="outlined" />
        ))}
      </Box>
    </Paper>

  </Box>
);