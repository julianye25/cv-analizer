import { useState } from "react";
import FileUpload from "./components/FileUpload";
import ResultCard from "./components/ResultCard";
import { analyzeCV } from "./services/api";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filename, setFilename] = useState("");

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Selecciona un archivo primero");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await analyzeCV(selectedFile);
      setAnalysis(response.analysis);
      setFilename(response.filename);
    } catch (err) {
      const msg =
        err.response?.data?.error || err.message || "Error al analizar";
      setError(msg);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setAnalysis(null);
    setError("");
    setFilename("");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">CV Analyzer</h1>
          <p className="text-gray-600">
            Analiza tu hoja de vida con Inteligencia Artificial
          </p>
        </div>

        {!analysis ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <FileUpload onFileSelect={setSelectedFile} disabled={loading} />

            {selectedFile && (
              <div className="flex items-center justify-between bg-primary/10 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <span>📄</span>
                  <span className="font-medium text-gray-700">
                    {selectedFile.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!selectedFile || loading}
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white text-xl font-medium rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Analizando...
                </>
              ) : (
                <>
                  <span>🔍</span>
                  Analizar CV
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Powered by Groq AI • Tu CV nunca se almacena
            </p>
          </div>
        ) : (
          <ResultCard analysis={analysis} filename={filename} />
        )}

        {analysis && (
          <button
            onClick={reset}
            className="mt-6 w-full py-3 text-gray-600 hover:text-gray-800"
          >
            ← Analizar otro CV
          </button>
        )}
      </div>
    </div>
  );
}