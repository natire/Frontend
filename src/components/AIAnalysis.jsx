function AIAnalysis({ data }) {
  const maxCount = Math.max(...data.distribution.map(d => d.count));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Análisis Inicial por IA
      </h3>

      {/* Distribution Chart */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-base md:text-lg font-medium text-slate-900 dark:text-white">
            Distribución de Tickets
          </h4>
          <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
            <span className="material-symbols-outlined text-base">trending_up</span>
            <span className="font-medium">{data.trend}</span>
          </div>
        </div>
        
        <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">
          {data.distribution.reduce((sum, d) => sum + d.count, 0)}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Última importación {new Date(data.lastImport).toLocaleDateString('es-ES')}
        </p>

        {/* Bar Chart */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 h-48 md:h-64 items-end">
          {data.distribution.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div 
                className="w-full bg-blue-500 rounded-t-lg transition-all duration-500"
                style={{ 
                  height: `${(item.count / maxCount) * 100}%`,
                  minHeight: '20px'
                }}
              />
              <p className="text-xs md:text-sm font-medium text-slate-900 dark:text-white text-center">
                {item.category}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Details */}
      <div className="space-y-2">
        {data.distribution.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm md:text-base text-slate-700 dark:text-slate-300">
                {item.category}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm md:text-base font-medium text-slate-900 dark:text-white">
                {item.count}
              </span>
              <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 w-12 text-right">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIAnalysis;