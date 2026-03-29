import React, { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, Menu, Search, X } from 'lucide-react';

export default function Header({
  searchQuery = '',
  onSearchChange,
  sidebarOpen = false,
  onToggleSidebar,
}) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [workspace, setWorkspace] = useState('Workspace 1');
  const workspaceRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!workspaceOpen) return;

    const handlePointerDown = (e) => {
      if (!workspaceRef.current) return;
      if (!workspaceRef.current.contains(e.target)) setWorkspaceOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setWorkspaceOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [workspaceOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K');
      if (!isCmdK) return;
      e.preventDefault();
      searchRef.current?.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const workspaces = ['Workspace 1', 'Workspace 2', 'Workspace 3'];

  return (
    <header className="relative isolate z-50 h-14 text-white bg-gradient-to-r from-[#1E1B4B] via-[#2E2B7A] to-[#111827] rounded-2xl border border-white/10 shadow-[0_10px_24px_rgba(17,24,39,0.18)]">
      <div className="h-full px-3 sm:px-5 flex items-center justify-between gap-3 sm:gap-5">
        {/* LEFT: BRAND + WORKSPACE */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={() => onToggleSidebar?.()}
            className="lg:hidden p-2 rounded-md hover:bg-white/10 transition"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {sidebarOpen ? <X size={18} className="text-white/85" /> : <Menu size={18} className="text-white/85" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex w-8 h-8 rounded-xl bg-white/5 border border-white/10 items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <svg
                viewBox="0 0 64 64"
                className="w-5 h-5"
                fill="#4F46E5"
                aria-hidden="true"
              >
                {/* Donut + diagonal mark (logo-like) */}
                <path
                  fillRule="evenodd"
                  d="
                    M22 44
                    m -14 0
                    a 14 14 0 1 0 28 0
                    a 14 14 0 1 0 -28 0
                    M22 44
                    m -6 0
                    a 6 6 0 1 1 12 0
                    a 6 6 0 1 1 -12 0
                  "
                />
                <path
                  fillRule="evenodd"
                  d="
                    M41 8
                    L56 17
                    L40 57
                    L26 48
                    Z
                    M39 22
                    L45 25.5
                    L39 36
                    L33 32.5
                    Z
                  "
                />
              </svg>
            </div>
            <span className="text-sm sm:text-base font-semibold tracking-wide">Workspace</span>
          </div>

          <div className="relative z-50" ref={workspaceRef}>
            <button
              type="button"
              onClick={() => setWorkspaceOpen((v) => !v)}
              className="flex items-center gap-2 min-w-0 max-w-[132px] sm:max-w-none px-3 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[11px] sm:text-sm hover:bg-white/15 transition select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              aria-haspopup="menu"
              aria-expanded={workspaceOpen}
            >
              <span className="leading-none truncate">{workspace}</span>
              <ChevronDown
                size={16}
                className={`opacity-80 transition-transform duration-200 ${workspaceOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              role="menu"
              className={`absolute left-0 sm:left-0 right-0 sm:right-auto top-full mt-2 w-44 origin-top-left rounded-lg border border-white/10 bg-[#111827]/70 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-200 ease-out z-50 ${
                workspaceOpen
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'
              }`}
            >
              {workspaces.map((name) => (
                <button
                  key={name}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setWorkspace(name);
                    setWorkspaceOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between transition ${
                    name === workspace ? 'bg-white/10 text-white' : 'text-white/85 hover:bg-white/10'
                  }`}
                >
                  <span>{name}</span>
                  {name === workspace && <span className="text-xs text-white/70">Active</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: SEARCH */}
        <div className="hidden sm:flex flex-1 justify-center min-w-0">
          <div className="w-full max-w-md relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              ref={searchRef}
              className="w-full h-9 pl-9 pr-14 rounded-lg bg-white/10 border border-white/10 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <div className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-white/60 border border-white/15 rounded-md px-2 py-0.5">
              ⌘ K
            </div>
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center justify-end gap-2 min-w-[92px] sm:min-w-[160px] lg:min-w-[260px]">
          <button type="button" className="hidden sm:inline-flex p-2 rounded-md hover:bg-white/10 transition">
            <Bell size={18} className="text-white/80" />
          </button>
          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-sm font-semibold">
            GK
          </div>
        </div>
      </div>
    </header>
  );
}
