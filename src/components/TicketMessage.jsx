function TicketMessage({ message, attachments }) {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          Descripción
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          {message}
        </p>

        {attachments && attachments.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
              Archivos adjuntos
            </h3>
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-lg">
                    {file.type === 'image' ? 'image' : 'description'}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-slate-900 dark:text-white font-medium truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {file.size}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketMessage;