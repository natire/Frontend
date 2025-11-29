function ActivityItem({ activity, isLast }) {
  const getIcon = (type) => {
    switch (type) {
      case 'created': return 'add_circle';
      case 'assigned': return 'person_add';
      case 'comment': return 'chat_bubble';
      case 'status_change': return 'autorenew';
      default: return 'circle';
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'created': return 'text-blue-500 bg-blue-500/20';
      case 'assigned': return 'text-purple-500 bg-purple-500/20';
      case 'comment': return 'text-green-500 bg-green-500/20';
      case 'status_change': return 'text-orange-500 bg-orange-500/20';
      default: return 'text-slate-500 bg-slate-500/20';
    }
  };

  return (
    <div className="flex gap-3 relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-12 w-0.5 h-full bg-slate-200 dark:bg-slate-800"></div>
      )}

      {/* Icon */}
      <div className={`flex items-center justify-center shrink-0 size-10 rounded-full ${getColor(activity.type)} z-10`}>
        <span className={`material-symbols-outlined text-lg ${getColor(activity.type).split(' ')[0]}`}>
          {getIcon(activity.type)}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
          <div className="flex items-start justify-between mb-1">
            <p className="font-medium text-slate-900 dark:text-white text-sm">
              {activity.user}
            </p>
            <time className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(activity.timestamp).toLocaleString('es-ES', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </time>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {activity.description}
          </p>
        </div>
      </div>
    </div>
  );
}
export default ActivityItem;