function FilterChips({ filters, activeFilter, onFilterChange }) {
  return (
    <nav className="flex gap-2 px-4 py-3 overflow-x-auto whitespace-nowrap">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 font-medium transition-all transform hover:scale-105 active:scale-95 text-sm ${
            activeFilter === filter.id
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          <span>{filter.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default FilterChips;