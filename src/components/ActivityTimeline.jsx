import { useState } from 'react';
import ActivityItem from './ActivityItem';

function ActivityTimeline({ activities }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 p-4 md:p-6 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header con botón de expandir/colapsar */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between mb-4 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg p-2 -m-2 transition-colors"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Historial de Actividad
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {activities.length} {activities.length === 1 ? 'actividad' : 'actividades'}
            </span>
            <span className={`material-symbols-outlined text-slate-500 dark:text-slate-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}>
              expand_more
            </span>
          </div>
        </button>

        {/* Timeline colapsable */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-0 pt-2">
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isLast={index === activities.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Preview cuando está colapsado */}
        {!isExpanded && activities.length > 0 && (
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center shrink-0 size-8 rounded-full bg-blue-500/20">
              <span className="material-symbols-outlined text-blue-500 text-sm">
                history
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {activities[activities.length - 1].user}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {activities[activities.length - 1].description}
              </p>
            </div>
            <time className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {new Date(activities[activities.length - 1].timestamp).toLocaleString('es-ES', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </time>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityTimeline;