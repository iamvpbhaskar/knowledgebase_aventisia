// src/components/KBCard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { MoreVertical, Pencil, Pin, PinOff, Trash2 } from 'lucide-react';

export default function KBCard({ kb, onEdit, onDelete, onTogglePin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition group">
      {/* CARD HEADER */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{kb.title}</h3>
          {kb.pinned && (
            <span className="inline-flex items-center gap-1 text-[10px] text-[#4F46E5] bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5">
              <Pin size={12} />
              Pinned
            </span>
          )}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1 text-gray-300 hover:text-gray-500 transition"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
          <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-8 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-20"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit?.();
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Pencil size={16} className="text-gray-500" />
                Edit
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onTogglePin?.();
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                {kb.pinned ? (
                  <PinOff size={16} className="text-gray-500" />
                ) : (
                  <Pin size={16} className="text-gray-500" />
                )}
                {kb.pinned ? 'Unpin' : 'Pin'}
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete?.();
                }}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 size={16} className="text-red-500" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-xs leading-5 text-gray-500 mb-6 line-clamp-3">
        {kb.description}
      </p>

      {/* FOOTER */}
      <div className="pt-3 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">Created On: {kb.createdOn}</p>
      </div>
    </div>
  );
}
