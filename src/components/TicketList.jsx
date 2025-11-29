import TicketListItem from './TicketListItem';

function TicketList({ tickets, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-slate-500 dark:text-slate-400">Cargando tickets...</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 md:py-16 px-4 md:px-6">
        <div className="flex items-center justify-center size-16 md:size-20 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined" style={{ fontSize: 32 }}>upcoming</span>
        </div>
        <h3 className="mt-4 md:mt-6 text-base md:text-lg font-semibold text-slate-900 dark:text-white">
          ¡Todo en orden!
        </h3>
        <p className="mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
          No hay tickets que coincidan con tu búsqueda o filtro.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-4 md:px-6 py-2 space-y-3 max-w-7xl mx-auto w-full">
      {tickets.map(ticket => (
        <TicketListItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
export default TicketList;