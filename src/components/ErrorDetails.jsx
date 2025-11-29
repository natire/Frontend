function ErrorDetails({ errors, isExpanded, onToggle }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
          Detalle de Errores
        </h3>
        <span className={`material-symbols-outlined text-slate-500 transition-transform ${
          isExpanded ? 'rotate-180' : ''
        }`}>
          expand_more
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 md:p-6 space-y-3">
          {errors.map(error => (
            <div 
              key={error.id}
              className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900"
            >
              <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-xl mt-0.5">
                error
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Ticket {error.ticket}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {error.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ErrorDetails;