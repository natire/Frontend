import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ticketsService from '../services/ticketsService';

function DashboardPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const allTickets = await ticketsService.getTickets({});
      setTickets(allTickets);
      calculateStats(allTickets);
      calculateChartData(allTickets);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ticketsList) => {
    const now = new Date();
    let filteredTickets = ticketsList;

    // Filtrar por rango de tiempo
    if (timeRange === 'today') {
      filteredTickets = ticketsList.filter(t => {
        const ticketDate = new Date(t.createdAt);
        return ticketDate.toDateString() === now.toDateString();
      });
    } else if (timeRange === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filteredTickets = ticketsList.filter(t => new Date(t.createdAt) >= weekAgo);
    } else if (timeRange === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filteredTickets = ticketsList.filter(t => new Date(t.createdAt) >= monthAgo);
    }

    // Calcular estadísticas
    const activeTickets = filteredTickets.filter(t => t.status === 'Abierto').length;
    const closedTickets = filteredTickets.filter(t => t.status === 'Finalizado').length;
    
    // Contar tickets de alto riesgo (Emergencia, Crítico, Alto)
    const highRiskTickets = filteredTickets.filter(t => 
      ['Emergencia', 'Critico', 'Alto'].includes(t.priority)
    ).length;

    // Calcular satisfacción basada en proporción de tickets cerrados
    const satisfaction = filteredTickets.length > 0 
      ? Math.round((closedTickets / filteredTickets.length) * 100) 
      : 0;

    // Calcular tiempo promedio de respuesta (simulado basado en prioridad)
    const avgResponseTime = filteredTickets.length > 0
      ? (filteredTickets.reduce((acc, t) => {
          if (t.priority === 'Emergencia') return acc + 0.5;
          if (t.priority === 'Critico') return acc + 1;
          if (t.priority === 'Alto') return acc + 2;
          return acc + 4;
        }, 0) / filteredTickets.length).toFixed(1)
      : '0';

    setStats([
      { 
        id: 1, 
        title: 'Tickets Activos', 
        value: activeTickets.toString(), 
        change: '+5%', 
        isPositive: true 
      },
      { 
        id: 2, 
        title: 'Tiempo Respuesta', 
        value: `${avgResponseTime}h`, 
        change: '-15%', 
        isPositive: true 
      },
      { 
        id: 3, 
        title: 'Satisfacción', 
        value: `${satisfaction}%`, 
        change: '+2%', 
        isPositive: true 
      },
      { 
        id: 4, 
        title: 'Riesgo Alto', 
        value: highRiskTickets.toString(), 
        change: '+25%', 
        isPositive: false 
      }
    ]);
  };

  const calculateChartData = (ticketsList) => {
    const last7Days = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayTickets = ticketsList.filter(t => {
        const ticketDate = new Date(t.createdAt);
        return ticketDate.toDateString() === date.toDateString();
      });
      
      const highRisk = dayTickets.filter(t => 
        ['Emergencia', 'Critico', 'Alto'].includes(t.priority)
      ).length;
      
      last7Days.push({
        day: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][date.getDay()],
        total: dayTickets.length,
        highRisk: highRisk
      });
    }
    
    setChartData(last7Days);
  };

  const handleTimeRangeChange = (rangeId) => {
    setTimeRange(rangeId);
  };

  const timeRanges = [
    { id: 'today', label: 'Hoy' },
    { id: 'week', label: 'Últimos 7 días' },
    { id: 'month', label: 'Últimos 30 días' }
  ];

  // Generar alertas basadas en tickets reales
  const generateAlerts = () => {
    const highPriorityTickets = tickets.filter(t => 
      ['EMERGENCIA', 'CRÍTICO', 'ALTO' ].includes(t.priority) && t.status === 'Abierto'
    );

    return highPriorityTickets.slice(0, 3).map((ticket, idx) => ({
      id: idx + 1,
      type: ticket.priority === 'Emergencia' ? 'danger' : 'warning',
      icon: ticket.priority === 'Emergencia' ? 'security' : 'trending_down',
      title: `${ticket.priority}: ${ticket.customer || 'Cliente'}`,
      description: ticket.title.substring(0, 50) + '...'
    }));
  };

  const alerts = generateAlerts();

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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 font-medium">
            Cargando dashboard...
          </p>
        </div>
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
                <span>{range.label}</span>
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
            {stats.map(stat => (
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

        {/* Ticket Volume Chart */}
        <section className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
            Volumen de Tickets
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Últimos 7 días
          </p>

          <div className="grid h-40 grid-flow-col items-end justify-items-center gap-4 px-2">
            {chartData.map((day, idx) => {
              const maxTickets = Math.max(...chartData.map(d => d.total), 1);
              const height = (day.total / maxTickets) * 100;
              return (
                <div
                  key={idx}
                  className="w-full rounded-t-lg transition-all bg-blue-600/80 hover:bg-blue-600"
                  style={{ height: `${Math.max(height, 10)}%` }}
                  title={`${day.total} tickets`}
                ></div>
              );
            })}
          </div>

          <div className="mt-4 grid grid-flow-col justify-items-center gap-4 px-2">
            {chartData.map((day, idx) => (
              <p
                key={idx}
                className="text-xs font-medium text-slate-600 dark:text-slate-400"
              >
                {day.day}
              </p>
            ))}
          </div>
        </section>

        {/* High Risk Tickets Chart */}
        <section className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
            Tickets de Alto Riesgo
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Últimos 7 días
          </p>

          <div className="grid h-40 grid-flow-col items-end justify-items-center gap-4 px-2">
            {chartData.map((day, idx) => {
              const maxRisk = Math.max(...chartData.map(d => d.highRisk), 1);
              const height = (day.highRisk / maxRisk) * 100;
              return (
                <div
                  key={idx}
                  className="w-full rounded-t-lg transition-all bg-red-600/80 hover:bg-red-600"
                  style={{ height: `${Math.max(height, 10)}%` }}
                  title={`${day.highRisk} tickets de alto riesgo`}
                ></div>
              );
            })}
          </div>

          <div className="mt-4 grid grid-flow-col justify-items-center gap-4 px-2">
            {chartData.map((day, idx) => (
              <p
                key={idx}
                className="text-xs font-medium text-slate-600 dark:text-slate-400"
              >
                {day.day}
              </p>
            ))}
          </div>
        </section>

        {/* Recent Alerts */}
        {alerts.length > 0 && (
          <section className="pb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Alertas Recientes
            </h2>
            <div className="flex flex-col gap-3">
              {alerts.map(alert => (
                <button
                  key={alert.id}
                  className="flex items-center gap-4 rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                  onClick={() => navigate('/tickets')}
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
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/tickets')}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all transform hover:scale-110 active:scale-95"
      >
        <span className="material-symbols-outlined text-3xl">inbox</span>
      </button>
    </div>
  );
}

export default DashboardPage;