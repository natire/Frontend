function ImportProgress({ progress, currentStatus, imported }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
          Importando...
        </h3>
        <span className="text-sm md:text-base text-slate-500 dark:text-slate-400">
          {imported}/1000 tickets
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 md:h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
        <div 
          className="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status */}
      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
        {currentStatus}
      </p>
    </div>
  );
}

export default ImportProgress;
