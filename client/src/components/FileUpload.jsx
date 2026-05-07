import { useState, useRef } from 'react';

export default function FileUpload({ onFileSelect, disabled }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndSelect(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) validateAndSelect(file);
  };

  const validateAndSelect = (file) => {
    const allowed = ['.pdf', '.docx', '.doc', '.txt'];
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    if (!allowed.includes(ext)) {
      alert('Formato no permitido. Usa PDF, DOCX o TXT');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo es muy grande. Máximo 10MB');
      return;
    }
    onFileSelect(file);
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
        transition-all duration-300 ease-out
        ${dragOver ? 'border-primary bg-primary/10 scale-105' : 'border-gray-300 hover:border-primary'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onDragOver={(e) => { e.preventDefault(); !disabled && setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => !disabled && handleDrop(e)}
      onClick={() => !disabled && fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
      
      <div className="space-y-3">
        <div className="text-5xl">
          📄
        </div>
        <div>
          <p className="text-lg font-medium text-gray-700">
            {dragOver ? 'Suelta el archivo' : 'Arrastra tu CV aquí'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            o haz clic para seleccionar
          </p>
        </div>
        <p className="text-xs text-gray-400">
          Formatos: PDF, DOCX, DOC, TXT (máx 10MB)
        </p>
      </div>
    </div>
  );
}