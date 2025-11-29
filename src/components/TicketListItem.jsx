import { useNavigate } from 'react-router-dom';

function TicketListItem({ ticket }) {
  const navigate = useNavigate();

  // Mapeo completo de colores (no dinámico)
  const colorClasses = {
    red: {
      icon: 'text-red-500',
      bg: 'bg-red-500/20',
      badge: 'bg-red-500'
    },
    blue: {
      icon: 'text-blue-500',
      bg: 'bg-blue-500/20',
      badge: 'bg-blue-500'
    },
    purple: {
      icon: 'text-purple-500',
      bg: 'bg-purple-500/20',
      badge: 'bg-purple-500'
    },
    green: {
      icon: 'text-green-500',
      bg: 'bg-green-500/20',
      badge: 'bg-green-500'
    },
    orange: {
      icon: 'text-orange-500',
      bg: 'bg-orange-500/20',
      badge: 'bg-orange-500'
    },
    yellow: {
      icon: 'text-yellow-500',
      bg: 'bg-yellow-500/20',
      badge: 'bg-yellow-500'
    }
  };

  const colors = colorClasses[ticket.color] || colorClasses.blue;

  const handleTicketClick = () => {
    navigate(`/tickets/${ticket.id}`);
  };

  return (
    <div
      onClick={handleTicketClick}
      className={`flex items-center gap-3 md:gap-4 bg-transparent min-h-[68px] md:min-h-[72px] py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900/50 rounded-lg px-2 transition-colors ${
        ticket.closed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center justify-center shrink-0 size-10 md:size-12 relative">
        {ticket.status === "urgent" && (
          <div className="absolute inset-0.5 rounded-full bg-red-500 opacity-20"></div>
        )}
        <div className={`${colors.icon} flex items-center justify-center rounded-full ${colors.bg} shrink-0 size-9 md:size-10`}>
          <span className="material-symbols-outlined text-xl md:text-2xl">{ticket.icon}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center min-w-0">
        <p className="text-slate-900 dark:text-white text-sm md:text-base font-medium leading-normal line-clamp-1">
          {ticket.title}
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-normal leading-normal line-clamp-1">
          {ticket.sender} - {ticket.time}
        </p>
      </div>
      <div className="shrink-0 ml-auto">
        <div className={`flex size-6 md:size-7 items-center justify-center rounded-full ${colors.bg}`}>
          <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${colors.badge}`}></div>
        </div>
      </div>
    </div>
  );
}

export default TicketListItem;