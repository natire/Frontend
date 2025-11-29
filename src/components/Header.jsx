function Header({ title }) {
  return (
    <header className="flex items-center bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 pb-2 justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md">
          <span className="material-symbols-outlined text-2xl">mail</span>
        </div>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          {title}
        </h1>
      </div>
      <button className="flex size-10 shrink-0 items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
        <span className="material-symbols-outlined text-2xl">account_circle</span>
      </button>
    </header>
  );
}

export default Header;