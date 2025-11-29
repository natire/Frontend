function ImportStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Imported */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6">
        <h4 className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-2">
          Tickets Importados
        </h4>
        <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          {stats.imported}
        </p>
      </div>

      {/* Errors */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-orange-300 dark:border-orange-900 p-4 md:p-6">
        <h4 className="text-sm md:text-base text-orange-600 dark:text-orange-400 mb-2">
          Errores
        </h4>
        <p className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400">
          {stats.errors}
        </p>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6">
        <h4 className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-2">
          Categorías Detectadas
        </h4>
        <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          {stats.categories}
        </p>
      </div>
    </div>
  );
}

export default ImportStats;