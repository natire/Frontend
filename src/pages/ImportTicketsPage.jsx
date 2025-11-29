import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ImportProgress from '../components/ImportProgress';
import ImportStats from '../components/ImportStats';
import ErrorDetails from '../components/ErrorDetails';
import AIAnalysis from '../components/AIAnalysis';

function ImportTicketsPage() {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('');
  const [importStats, setImportStats] = useState({
    imported: 0,
    errors: 0,
    categories: 0
  });
  const [errors, setErrors] = useState([]);
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  // Simulación de importación
  const startImport = () => {
    setImporting(true);
    setProgress(0);
    setCurrentStatus('Iniciando importación...');

    // Simular progreso
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setImporting(false);
          setCurrentStatus('Importación completada');
          // Generar estadísticas finales
          setImportStats({
            imported: 750,
            errors: 2,
            categories: 4
          });
          setErrors([
            { id: 1, ticket: '#1234', reason: 'Campo requerido "prioridad" faltante' },
            { id: 2, ticket: '#5678', reason: 'Formato de fecha inválido' }
          ]);
          generateAnalysis();
          return 100;
        }
        
        // Actualizar estado según progreso
        if (prev < 30) {
          setCurrentStatus('Conectando con Jira...');
        } else if (prev < 60) {
          setCurrentStatus('Procesando tickets...');
          setImportStats(prev => ({ ...prev, imported: Math.floor(prev * 7.5) }));
        } else if (prev < 90) {
          setCurrentStatus('Categorizando con IA...');
        } else {
          setCurrentStatus('Finalizando...');
        }
        
        return prev + 2;
      });
    }, 100);
  };

  const generateAnalysis = () => {
    setAnalysisData({
      distribution: [
        { category: 'Bugs', count: 90, percentage: 12 },
        { category: 'Mejoras', count: 180, percentage: 24 },
        { category: 'Soporte', count: 300, percentage: 40 },
        { category: 'Pregunta', count: 180, percentage: 24 }
      ],
      trend: '+15%',
      lastImport: new Date().toISOString()
    });
  };

  return (
    <div className="relative flex min-h-screen w-screen flex-col bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <Header title="Importar Tickets" showBackButton />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 md:p-6 space-y-4 max-w-7xl mx-auto w-full">
        
        {/* Progress Card */}
        {importing && (
          <ImportProgress 
            progress={progress} 
            currentStatus={currentStatus}
            imported={importStats.imported}
          />
        )}

        {/* Stats Cards */}
        {!importing && importStats.imported > 0 && (
          <ImportStats stats={importStats} />
        )}

        {/* Errors Card */}
        {!importing && errors.length > 0 && (
          <ErrorDetails 
            errors={errors}
            isExpanded={showErrorDetails}
            onToggle={() => setShowErrorDetails(!showErrorDetails)}
          />
        )}

        {/* AI Analysis */}
        {!importing && analysisData && (
          <AIAnalysis data={analysisData} />
        )}

        {/* Import Button */}
        {!importing && importStats.imported === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex items-center justify-center size-20 md:size-24 rounded-full bg-blue-500/20 text-blue-500 mb-6">
              <span className="material-symbols-outlined text-5xl md:text-6xl">cloud_upload</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Importar desde Jira
            </h3>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-6 text-center max-w-md">
              Conecta tu cuenta de Jira para importar tickets automáticamente
            </p>
            <button
              onClick={startImport}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
            >
              <span className="material-symbols-outlined">sync</span>
              <span>Iniciar Importación</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {!importing && importStats.imported > 0 && (
        <button 
          onClick={startImport}
          className="fixed bottom-5 right-5 md:bottom-6 md:right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500/40"
        >
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>
      )}
    </div>
  );
}

export default ImportTicketsPage;