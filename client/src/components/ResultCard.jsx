export default function ResultCard({ analysis, filename }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'from-green-50 to-green-100';
    if (score >= 60) return 'from-yellow-50 to-yellow-100';
    return 'from-red-50 to-red-100';
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Resultados del Análisis</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filename}</span>
        </div>

        <div className={`text-center py-10 rounded-2xl bg-gradient-to-br ${getScoreBg(analysis.puntuacion)}`}>
          <div className={`text-7xl font-bold ${getScoreColor(analysis.puntuacion)}`}>
            {analysis.puntuacion}
          </div>
          <div className="text-gray-600 mt-2 font-medium">Puntuación General</div>
        </div>

        {analysis.resumen && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              📝 Resumen
            </h3>
            <p className="text-gray-600 leading-relaxed">{analysis.resumen}</p>
          </div>
        )}

        {analysis.fortalezas?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
              ✅ Fortalezas
            </h3>
            <ul className="space-y-3">
              {analysis.fortalezas.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.areas_mejorar?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-yellow-600 mb-3 flex items-center gap-2">
              ⚠️ Áreas a Mejorar
            </h3>
            <ul className="space-y-3">
              {analysis.areas_mejorar.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">•</span>
                  <span className="text-gray-700">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.recomendaciones?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
              💡 Recomendaciones
            </h3>
            <ul className="space-y-3">
              {analysis.recomendaciones.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary font-bold">{i + 1}.</span>
                  <span className="text-gray-700">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}