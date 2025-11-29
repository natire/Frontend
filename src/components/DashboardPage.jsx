import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('today');

  const stats = [
    {
      title: 'Tickets Nuevos',
      value: '1,204',
      change: '+5%',
      isPositive: true,
      icon: 'mail'
    },
    {
      title: 'T. Resp. Prom.',
      value: '1h 15m',
      change: '-2%',
      isPositive: false,
      icon: 'schedule'
    },
    {
      title: 'Tasa Autom. (IA)',
      value: '42%',
      change: '+3%',
      isPositive: true,
      icon: 'auto_awesome'
    },
    {
      title: 'CSAT',
      value: '93%',
      change: '+1%',
      isPositive: true,
      icon: 'sentiment_satisfied'
    }
  ];

  const urgentTickets = [
    {
      id: 8321,
      title: 'El servidor de pagos está caído',
      assigned: 'Equipo de DevOps',
      priority: 'high',
      icon: 'priority_high'
    },
    {
      id: 8319,
      title: 'Error de login en la app móvil',
      assigned: 'Ana García',
      priority: 'medium',
      icon: 'hourglass_top'
    },
    {
      id: 8315,
      title: 'Consulta sobre facturación',
      assigned: 'IA Asistente',
      priority: 'low',
      icon: 'chat_error'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/50';
      case 'medium':
        return 'bg-orange-100 dark:bg-orange-900/50';
      case 'low':
        return 'bg-yellow-100 dark:bg-yellow-900/50';
      default:
        return 'bg-blue-100 dark:bg-blue-900/50';
    }
  };

  const getIconColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 dark:text-red-400';
      case 'medium':
        return 'text-orange-500 dark:text-orange-400';
      case 'low':
        return 'text-yellow-500 dark:text-yellow-400';
      default:
        return 'text-blue-500 dark:text-blue-400';
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      {/* TopAppBar */}
      <div className="sticky top-0 z-10 flex flex-col bg-white dark:bg-slate-900 shadow-sm dark:shadow-none border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 pb-2 justify-between">
          <div className="flex size-12 shrink-0 items-center justify-start text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-3xl">widgets</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Resumen de Actividad
          </h2>
          <button
            onClick={() => navigate('/tickets')}
            className="flex size-12 items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">arrow_back</span>
          </button>
        </div>

        {/* Date Range Chips */}
        <div className="flex gap-3 p-4 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'today', label: 'Hoy' },
            { id: 'week', label: 'Últimos 7 días' },
            { id: 'month', label: 'Últimos 30 días' },
            { id: 'custom', label: 'Personalizado', icon: true }
          ].map(range => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-3 transition-all ${
                timeRange === range.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
              }`}
            >
              <p className="text-sm font-medium leading-normal">{range.label}</p>
              {range.icon && <span className="material-symbols-outlined text-lg">calendar_today</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 p-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 rounded-xl bg-white dark:bg-slate-900/50 p-4 border border-slate-200 dark:border-slate-800"
            >
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal">
                {stat.title}
              </p>
              <p className="text-slate-900 dark:text-white tracking-light text-2xl font-bold leading-tight">
                {stat.value}
              </p>
              <p className={`text-sm font-medium leading-normal flex items-center gap-1 ${
                stat.isPositive
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : 'text-red-500 dark:text-red-400'
              }`}>
                <span className="material-symbols-outlined text-base">
                  {stat.isPositive ? 'arrow_upward' : 'arrow_downward'}
                </span>
                <span>{stat.change}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="flex flex-col gap-4 px-4 pb-4">
          {/* Volume Chart */}
          <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-slate-900/50 p-4 border border-slate-200 dark:border-slate-800">
            <p className="text-slate-900 dark:text-white text-base font-semibold leading-normal">
              Volumen de Tickets
            </p>
            <div className="flex gap-1 items-baseline">
              <p className="text-slate-900 dark:text-white tracking-light text-3xl font-bold leading-tight truncate">
                8,421
              </p>
              <p className="text-emerald-500 dark:text-emerald-400 text-sm font-medium leading-normal">
                +12.5%
              </p>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
              Últimos 7 días
            </p>
            <div className="grid min-h-[160px] grid-flow-col gap-2 grid-rows-[1fr_auto] items-end justify-items-center pt-4">
              {[90, 60, 80, 30, 100, 100, 10].map((height, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 w-full">
                  <div
                    className={`w-full rounded-t-lg ${
                      idx >= 4
                        ? 'bg-blue-600'
                        : 'bg-blue-600/20 dark:bg-blue-600/30'
                    }`}
                    style={{ height: `${height * 1.2}px` }}
                  ></div>
                  <p className={`text-xs font-medium ${
                    idx >= 4
                      ? 'text-slate-900 dark:text-white font-bold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][idx]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Donut Chart */}
            <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-slate-900/50 p-4 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-900 dark:text-white text-base font-semibold leading-normal">
                Tickets por Estado
              </p>
              <div className="flex min-h-[180px] items-center justify-center gap-6 py-4">
                <div className="relative flex items-center justify-center w-36 h-36">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle className="stroke-purple-200 dark:stroke-purple-900/50" cx="18" cy="18" fill="none" r="15.915" strokeWidth="4"></circle>
                    <circle className="stroke-orange-200 dark:stroke-orange-900/50" cx="18" cy="18" fill="none" r="15.915" strokeDasharray="75, 25" strokeWidth="4"></circle>
                    <circle className="stroke-blue-600" cx="18" cy="18" fill="none" r="15.915" strokeDasharray="40, 60" strokeDashOffset="-25" strokeWidth="4"></circle>
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">1,2k</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { color: 'bg-blue-600', label: 'Abierto' },
                    { color: 'bg-orange-400', label: 'En Proceso' },
                    { color: 'bg-purple-400', label: 'Resuelto' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-slate-900/50 p-4 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-900 dark:text-white text-base font-semibold leading-normal">
                Rendimiento IA vs Agentes
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                Tickets resueltos
              </p>
              <div className="flex flex-1 flex-col justify-end min-h-[180px]">
                <svg className="h-32" fill="none" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#137fec" strokeLinecap="round" strokeWidth="3"></path>
                  <path d="M0 60C18.1538 60 18.1538 100 36.3077 100C54.4615 100 54.4615 80 72.6154 80C90.7692 80 90.7692 40 108.923 40C127.077 40 127.077 90 145.231 90C163.385 90 163.385 30 181.538 30C199.692 30 199.692 70 217.846 70C236 70 236 85 254.154 85C272.308 85 272.308 40 290.462 40C308.615 40 308.615 20 326.769 20C344.923 20 344.923 120 363.077 120C381.231 120 381.231 60 399.385 60C417.538 60 417.538 90 435.692 90C453.846 90 453.846 110 472 110" stroke="#fb923c" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="3"></path>
                </svg>
                <div className="flex justify-around border-t border-slate-200 dark:border-slate-800 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 rounded-full bg-blue-600"></div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">IA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 rounded-full bg-orange-400" style={{ borderStyle: 'dashed' }}></div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Agentes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Urgent Tickets Section */}
        <div className="px-4 pb-24">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
            Tickets Urgentes
          </h3>
          <div className="flex flex-col gap-3">
            {urgentTickets.map(ticket => (
              <button
                key={ticket.id}
                onClick={() => navigate(`/tickets/${ticket.id}`)}
                className="flex items-center gap-4 rounded-xl p-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className={`flex items-center justify-center size-10 rounded-full ${getPriorityColor(ticket.priority)}`}>
                  <span className={`material-symbols-outlined ${getIconColor(ticket.priority)}`}>
                    {ticket.icon}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    #{ticket.id} - {ticket.title}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Asignado a: {ticket.assigned}
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">
                  chevron_right
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/tickets')}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-110 active:scale-95"
      >
        <span className="material-symbols-outlined text-3xl">arrow_back</span>
      </button>
    </div>
  );
}

export default DashboardPage;