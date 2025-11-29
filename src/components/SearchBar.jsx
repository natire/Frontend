function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="px-4 py-3 flex gap-2">
      <div className="relative flex-1">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
          search
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 focus:outline-none transition-all duration-200"
        />
      </div>
      <button className="flex size-10 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">
        <span className="material-symbols-outlined">tune</span>
      </button>
    </div>
  );
}
export default SearchBar;