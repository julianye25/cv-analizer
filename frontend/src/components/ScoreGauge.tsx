import { Box, Typography, CircularProgress } from "@mui/material";

interface Props {
  score: number;
}

const getColor = (score: number) => {
  if (score >= 75) return "#22c55e";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
};

export const ScoreGauge = ({ score }: Props) => {
  const color = getColor(score);

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={140}
        thickness={4}
        sx={{ color: "divider", position: "absolute" }}
      />
      <CircularProgress
        variant="determinate"
        value={score}
        size={140}
        thickness={4}
        sx={{ color }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" fontWeight={700} sx={{ color }}>
          {score}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          / 100
        </Typography>
      </Box>
    </Box>
  );
};
