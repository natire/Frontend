function TicketHeader({ ticket }) {
  const priorityColors = {
    high: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    medium: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
  };

  const statusColors = {
    urgent: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    new: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    closed: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Status and Priority Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
            {ticket.status === 'urgent' ? 'Urgente' : 
             ticket.status === 'new' ? 'Nuevo' : 
             ticket.status === 'pending' ? 'Pendiente' : 'Cerrado'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
            Prioridad {ticket.priority === 'high' ? 'Alta' : ticket.priority === 'medium' ? 'Media' : 'Baja'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Ticket #{ticket.id} - {ticket.title}
        </h1>

        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400">Cliente</p>
            <p className="text-slate-900 dark:text-white font-medium">{ticket.customer}</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400">Asignado a</p>
            <p className="text-slate-900 dark:text-white font-medium">{ticket.assignedTo}</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400">Fecha de creación</p>
            <p className="text-slate-900 dark:text-white font-medium">
              {new Date(ticket.createdAt).toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketHeader;