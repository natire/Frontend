import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import TicketList from '../components/TicketList';
import ticketsService from '../services/ticketsService';

const filterButtons = [
  { id: "all", label: "Todos" },
  { id: "new", label: "Nuevos" },
  { id: "closed", label: "Cerrados" }
];

function InboxPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFabMenu, setShowFabMenu] = useState(false);

  useEffect(() => {
    loadTickets();
  }, [activeFilter, searchQuery]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await ticketsService.getTickets({
        status: activeFilter !== 'all' ? activeFilter : undefined,
        search: searchQuery
      });
      setTickets(data);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Tickets en InboxPage:", tickets);


  return (
    <div className="relative flex min-h-screen w-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-x-hidden">
      <div className="sticky top-0 z-10 flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 w-full">
        <Header title="Bandeja de Entrada" />
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar por título, remitente..."
        />
        <FilterChips
          filters={filterButtons}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <TicketList tickets={tickets} loading={loading} />

      {/* Floating Action Button with Menu */}
      <div
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 flex flex-col items-end gap-3"
        onMouseEnter={() => setShowFabMenu(true)}
        onMouseLeave={() => setShowFabMenu(false)}
      >
        {/* FAB Menu Items */}
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-300 transform ${
            showFabMenu
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/analytics');
              setShowFabMenu(false);
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 px-4 py-2 shadow-md border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all transform hover:scale-105">
              <p className="text-sm font-semibold text-blue-700 dark:text-cyan-300 whitespace-nowrap">
                Ver Análisis
              </p>
            </div>
            <div className="flex size-12 md:size-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined text-2xl md:text-3xl">analytics</span>
            </div>
          </button>
        </div>

        {/* Main FAB */}
        <button
          onClick={() => setShowFabMenu(!showFabMenu)}
          className={`flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 text-white shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/40 hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-600 dark:hover:to-cyan-600 transition-all transform hover:scale-110 active:scale-95 ${
            showFabMenu ? 'rotate-45' : ''
          }`}
        >
          <span className="material-symbols-outlined text-3xl md:text-4xl">add</span>
        </button>
      </div>
    </div>
  );
}

export default InboxPage;