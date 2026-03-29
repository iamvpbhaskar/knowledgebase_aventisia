// src/components/Sidebar.jsx
import React, { useEffect } from 'react';
import {
  BarChart3,
  Bot,
  BookOpen,
  BrainCircuit,
  CheckCircle,
  Cpu,
  FileBox,
  Key,
  Library,
  Link2,
  List,
  Play,
  Shield,
  User,
  Zap,
} from 'lucide-react';

export default function Sidebar({ isOpen = false, onClose }) {
  const sidebarItems = [
    { icon: Bot, label: 'Agents', section: 'MY PROJECTS' },
    { icon: FileBox, label: 'AI Models', section: 'MY PROJECTS' },
    { icon: Library, label: 'Library', section: 'MY PROJECTS' },
    { icon: CheckCircle, label: 'Published', section: 'ORCHESTRATOR' },
    { icon: Cpu, label: 'Machines', section: 'ORCHESTRATOR' },
    { icon: List, label: 'Queues', section: 'ORCHESTRATOR' },
    { icon: Zap, label: 'Triggers', section: 'ORCHESTRATOR' },
    { icon: BarChart3, label: 'Jobs', section: 'ORCHESTRATOR' },
    { icon: Play, label: 'Executions', section: 'ORCHESTRATOR' },
    { icon: Shield, label: 'Vault', section: 'ORCHESTRATOR' },
    { icon: BookOpen, label: 'Knowledge Base', section: 'ORCHESTRATOR', isActive: true },
    { icon: Key, label: 'Key Store', section: 'ORCHESTRATOR' },
    { icon: User, label: 'Tenant', section: 'ADMIN' },
    { icon: Link2, label: 'Integrations', section: 'ADMIN' },
  ];

  let currentSection = '';

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* BACKDROP (MOBILE/TABLET) */}
      <div
        className={`fixed left-0 right-0 bottom-0 top-[4.5rem] z-30 bg-black/40 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => onClose?.()}
      />

      <aside
        className={`w-56 lg:w-64 max-w-[85vw] bg-white text-gray-800 overflow-y-auto sidebar-scroll border-r border-gray-200 flex flex-col shrink-0 shadow-xl
          fixed lg:static top-[4.5rem] bottom-0 left-0 z-40 lg:z-auto transition-transform duration-200 ease-out lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:flex`}
      >
        <nav className="flex-1 px-3 lg:px-4 py-5 space-y-1">
          {sidebarItems.map((item) => {
            const showSection = item.section !== currentSection;
            currentSection = item.section;
            const Icon = item.icon;

            return (
              <div key={item.label}>
                {showSection && (
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2 px-2">
                    {item.section}
                  </div>
                )}
                <button
                  type="button"
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
                    item.isActive
                      ? 'bg-indigo-50 text-[#4F46E5] relative'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#4F46E5]" />
                  )}
                  <Icon
                    size={18}
                    strokeWidth={1.75}
                    className={item.isActive ? 'text-[#4F46E5]' : 'text-gray-500'}
                  />
                  <span className={item.isActive ? 'font-medium' : ''}>{item.label}</span>
                </button>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
