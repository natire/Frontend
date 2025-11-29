import { useState } from 'react';


const filterButtons = [
  { id: "all", label: "Todos" },
  { id: "open", label: "Abiertos" },
  { id: "closed", label: "Cerrados" }
];

function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrar tickets según el filtro activo y la búsqueda
  const filteredTickets = ticketsData.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.sender.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "open") return matchesSearch && ticket.status === "Abierto";
    if (activeFilter === "closed") return matchesSearch && ticket.status === "Finalizado";
    
    return matchesSearch;
  });

  return (
    <div className="relative flex min-h-screen w-screen flex-col bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      
      {/* Header */}
      <div className="sticky top-0 z-10 flex flex-col bg-slate-50 dark:bg-slate-950 w-full">
        <div className="flex items-center p-4 md:p-6 pb-2 justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="text-slate-800 dark:text-white flex size-10 sm:size-12 shrink-0 items-center -ml-2 sm:-ml-3">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">menu</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg sm:text-xl font-bold leading-tight tracking-tight">Bandeja de Entrada</h2>
          </div>
          <div className="flex items-center">
            <img 
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full" 
              alt="User profile picture" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu4gBNau2SNz7kS3-o9FFXHXe-bQnvbAQ06AycduQRHFzblo9PD5xfln1-b65E8gGLsGFBQJ4DqBmOnI9QaDhj4Pgs4CrOYcdMLs9pchARV_xQZpO9LpIKfgOirc9_uD_x9Lb4WdqnyI0Z26j35sgiwkCwdpGoRXkN4SbvwijLiZ77LtINQVklguruHTAbatHkAFHZQB-_Ea3cWMkitlst5e7al3HcGA2UbL9B-bvcE1oOp11pYup_1cJ4noFzqQt3RIx2gf3GmEo5" 
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 md:px-6 py-3 max-w-7xl mx-auto w-full">
          <label className="flex flex-col min-w-40 h-11 sm:h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
              <div className="text-slate-400 dark:text-slate-500 flex border border-r-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 items-center justify-center pl-3 sm:pl-4 rounded-l-xl">
                <span className="material-symbols-outlined text-xl sm:text-2xl">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 sm:px-4 rounded-l-none border-l-0 pl-2 text-sm sm:text-base font-normal leading-normal" 
                placeholder="Buscar por título, remitente..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 md:gap-3 px-4 md:px-6 pb-4 overflow-x-auto scrollbar-hide max-w-7xl mx-auto w-full">
          {filterButtons.map(filter => (
            <button 
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex h-9 sm:h-10 shrink-0 items-center justify-center gap-x-2 rounded-full pl-3 pr-3 sm:pl-4 sm:pr-4 transition-colors ${
                activeFilter === filter.id 
                  ? 'bg-primary' 
                  : 'bg-slate-200 dark:bg-slate-800'
              }`}
            >
              <p className={`text-xs sm:text-sm font-medium leading-normal ${
                activeFilter === filter.id 
                  ? 'text-white' 
                  : 'text-slate-800 dark:text-slate-300'
              }`}>
                {filter.label}
              </p>
            </button>
          ))}
        </div>
        <div className="h-px w-full bg-slate-200 dark:bg-slate-800"></div>
      </div>

      {/* Tickets List */}
      <div className="flex flex-col flex-1 px-4 md:px-6 py-2 space-y-3 max-w-7xl mx-auto w-full">
        {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => (
            <div 
              key={ticket.id}
              className={`flex items-center gap-3 sm:gap-4 bg-transparent min-h-[68px] sm:min-h-[72px] py-2 ${
                ticket.closed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-center shrink-0 size-10 sm:size-12 relative">
                {ticket.status === "urgent" && (
                  <div className="absolute inset-0.5 rounded-full bg-red-500 opacity-20"></div>
                )}
                <div className={`text-${ticket.color}-500 flex items-center justify-center rounded-full bg-${ticket.color}-500/20 shrink-0 size-9 sm:size-10`}>
                  <span className="material-symbols-outlined text-xl sm:text-2xl">{ticket.icon}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center min-w-0">
                <p className="text-slate-900 dark:text-white text-sm sm:text-base font-medium leading-normal line-clamp-1">
                  {ticket.title}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-normal leading-normal line-clamp-1">
                  {ticket.sender} - {ticket.time}
                </p>
              </div>
              <div className="shrink-0 ml-auto">
                <div className={`flex size-6 sm:size-7 items-center justify-center rounded-full bg-${ticket.color}-500/20`}>
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-${ticket.color}-500`}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4 sm:px-6">
            <div className="flex items-center justify-center size-16 sm:size-20 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined" style={{ fontSize: 32 }}>upcoming</span>
            </div>
            <h3 className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold text-slate-900 dark:text-white">¡Todo en orden!</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              No hay tickets que coincidan con tu búsqueda o filtro.
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/40 hover:bg-primary/90 transition-colors">
        <span className="material-symbols-outlined text-2xl sm:text-3xl">add</span>
      </button>
    </div>
  );
}

export default App;