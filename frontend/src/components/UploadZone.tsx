import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface Props {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export const UploadZone = ({ onFileSelected, disabled }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) onFileSelected(acceptedFiles[0]);
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled,
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 6,
        textAlign: 'center',
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'divider',
        borderRadius: 3,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        bgcolor: isDragActive ? 'action.hover' : 'background.paper',
        '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
      }}
    >
      <input {...getInputProps()} />
      <UploadFileIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        {isDragActive ? 'Suelta el PDF aquí' : 'Arrastra tu CV aquí'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        o haz clic para seleccionar — solo PDF, máximo 5MB
      </Typography>
    </Paper>
  );
};