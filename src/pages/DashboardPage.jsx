import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Datos de ejemplo (reemplaza con tu import real)
const dashboardData = {
  statsByRange: {
    today: [
      { id: 1, title: 'Tickets Activos', value: '12', change: '+5%', isPositive: true },
      { id: 2, title: 'Tiempo Respuesta', value: '2.3h', change: '-15%', isPositive: true },
      { id: 3, title: 'Satisfacción', value: '94%', change: '+2%', isPositive: true },
      { id: 4, title: 'Riesgo Churn', value: '8', change: '+25%', isPositive: false }
    ],
    week: [
      { id: 1, title: 'Tickets Activos', value: '45', change: '+12%', isPositive: true },
      { id: 2, title: 'Tiempo Respuesta', value: '3.1h', change: '-8%', isPositive: true },
      { id: 3, title: 'Satisfacción', value: '92%', change: '+3%', isPositive: true },
      { id: 4, title: 'Riesgo Churn', value: '18', change: '+10%', isPositive: false }
    ],
    month: [
      { id: 1, title: 'Tickets Activos', value: '156', change: '+8%', isPositive: true },
      { id: 2, title: 'Tiempo Respuesta', value: '3.5h', change: '-5%', isPositive: true },
      { id: 3, title: 'Satisfacción', value: '91%', change: '+1%', isPositive: true },
      { id: 4, title: 'Riesgo Churn', value: '42', change: '+15%', isPositive: false }
    ],
    custom: [
      { id: 1, title: 'Tickets Activos', value: '--', change: '--', isPositive: true },
      { id: 2, title: 'Tiempo Respuesta', value: '--', change: '--', isPositive: true },
      { id: 3, title: 'Satisfacción', value: '--', change: '--', isPositive: true },
      { id: 4, title: 'Riesgo Churn', value: '--', change: '--', isPositive: false }
    ]
  }
};

function DashboardPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Se actualiza cuando cambia el timeRange
  useEffect(() => {
    try {
      const newStats = dashboardData.statsByRange?.[timeRange];
      setStats(Array.isArray(newStats) ? newStats : []);
      setLoading(false);
      console.log('✅ Datos del dashboard cargados correctamente');
    } catch (error) {
      console.error('❌ Error cargando datos del dashboard:', error);
      setLoading(false);
    }
  }, [timeRange]); // Ahora se ejecuta cuando cambia timeRange

  const handleTimeRangeChange = (rangeId) => {
    setTimeRange(rangeId);
  };

  const timeRanges = [
    { id: 'today', label: 'Hoy' },
    { id: 'week', label: 'Últimos 7 días' },
    { id: 'month', label: 'Últimos 30 días' },
    { id: 'custom', label: 'calendar_today', isIcon: true }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      icon: 'trending_down',
      title: 'Riesgo de Churn: Cliente X',
      description: 'Actividad reducida un 60%.'
    },
    {
      id: 2,
      type: 'danger',
      icon: 'security',
      title: 'Alerta de Seguridad',
      description: 'Intento de phishing detectado.'
    },
    {
      id: 3,
      type: 'warning',
      icon: 'trending_down',
      title: 'Riesgo de Churn: Acme Corp',
      description: 'Tickets de soporte negativos.'
    }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-500/20 text-amber-600 dark:text-amber-400';
      case 'danger':
        return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default:
        return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-950">
        <p className="text-slate-600 dark:text-slate-300 font-medium">
          Cargando dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-slate-100 dark:bg-slate-950 font-display">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => navigate('/tickets')}
          className="flex h-12 w-12 items-center justify-center text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <button className="flex h-12 w-12 items-center justify-center text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {/* Time Range Chips */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex w-max gap-2">
            {timeRanges.map(range => (
              <button
                key={range.id}
                onClick={() => handleTimeRangeChange(range.id)}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-full px-4 text-sm font-medium transition-all ${
                  timeRange === range.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {range.isIcon ? (
                  <span className="material-symbols-outlined !text-xl">{range.label}</span>
                ) : (
                  <span>{range.label}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Resumen General
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {(stats || []).map(stat => (
              <div
                key={stat.id}
                className="flex flex-col gap-2 rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800"
              >
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1">
                  <span
                    className={`material-symbols-outlined !text-base ${
                      stat.isPositive
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {stat.isPositive ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                  <p
                    className={`text-sm font-medium ${
                      stat.isPositive
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Churn Risk Chart */}
        <section className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Evolución Riesgo de Churn
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Últimos 7 días
              </p>
            </div>
            <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>

          <div className="relative h-48">
            <div className="absolute inset-0 grid grid-rows-4">
              <div className="border-t border-dashed border-slate-200 dark:border-slate-700"></div>
              <div className="border-t border-dashed border-slate-200 dark:border-slate-700"></div>
              <div className="border-t border-dashed border-slate-200 dark:border-slate-700"></div>
              <div className="border-t border-dashed border-slate-200 dark:border-slate-700"></div>
            </div>

            <svg
              className="absolute inset-0 h-full w-full"
              fill="none"
              viewBox="0 0 300 192"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="churnGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#DD6B20" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#DD6B20" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path
                d="M 0 115.2 L 50 96 L 100 124.8 L 150 105.6 L 200 67.2 L 250 86.4 L 300 57.6 L 300 192 L 0 192 Z"
                fill="url(#churnGradient)"
              ></path>
              <path
                className="stroke-amber-500"
                d="M 0 115.2 L 50 96 L 100 124.8 L 150 105.6 L 200 67.2 L 250 86.4 L 300 57.6"
                strokeWidth="2"
              ></path>
              <circle
                className="fill-amber-500 stroke-2 stroke-white dark:stroke-slate-900"
                cx="200"
                cy="67.2"
                r="4"
              ></circle>
            </svg>

            <div className="absolute bottom-0 left-[calc(66.66%-8px)] flex flex-col items-center">
              <div className="mb-2 rounded bg-slate-900 dark:bg-slate-100 px-2 py-1 text-xs text-white dark:text-slate-900">
                <p className="font-bold">18 Clientes</p>
                <p className="opacity-80">Jueves</p>
              </div>
              <div className="h-2 w-px bg-slate-900 dark:bg-white"></div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 text-center">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, idx) => (
              <p
                key={idx}
                className={`text-xs font-medium ${
                  idx === 3
                    ? 'font-bold text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {day}
              </p>
            ))}
          </div>
        </section>

        {/* Ticket Volume Chart */}
        <section className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
            Volumen de Tickets
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Últimos 7 días
          </p>

          <div className="grid h-40 grid-flow-col items-end justify-items-center gap-4 px-2">
            {[30, 90, 20, 30, 70, 40, 80].map((height, idx) => (
              <div
                key={idx}
                className={`w-full rounded-t-lg transition-all ${
                  idx === 4
                    ? 'bg-blue-600'
                    : 'bg-blue-600/20 dark:bg-blue-600/30'
                }`}
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>

          <div className="mt-4 grid grid-flow-col justify-items-center gap-4 px-2">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, idx) => (
              <p
                key={idx}
                className={`text-xs font-medium ${
                  idx === 4
                    ? 'text-blue-600 font-semibold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {day}
              </p>
            ))}
          </div>
        </section>

        {/* Recent Alerts */}
        <section className="pb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Alertas Recientes
          </h2>
          <div className="flex flex-col gap-3">
            {alerts.map(alert => (
              <button
                key={alert.id}
                className="flex items-center gap-4 rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getAlertColor(alert.type)}`}>
                  <span className="material-symbols-outlined">{alert.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {alert.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {alert.description}
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 shrink-0">
                  chevron_right
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/tickets')}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all transform hover:scale-110 active:scale-95"
      >
        <span className="material-symbols-outlined text-3xl">arrow_back</span>
      </button>
    </div>
  );
}

export default DashboardPage;