import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Dropdown({
  value,
  options,
  onChange,
  placeholder = 'Select',
  placement = 'bottom', // 'bottom' | 'top'
  buttonClassName = '',
  menuClassName = '',
  optionClassName = '',
  align = 'left', // 'left' | 'right'
  widthClassName = 'w-44',
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const selected = useMemo(() => options.find((o) => o.value === value) ?? null, [options, value]);

  const sideClass = placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
  const alignClass = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`flex items-center justify-between gap-2 ${buttonClassName} ${
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 opacity-70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        role="listbox"
        className={`absolute ${alignClass} ${sideClass} ${widthClassName} origin-top-left rounded-lg border border-white/10 bg-[#111827]/70 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-200 ease-out ${
          open
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'
        } ${menuClassName}`}
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => {
                setOpen(false);
                onChange?.(opt.value);
              }}
              className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between transition ${
                active ? 'bg-white/10 text-white' : 'text-white/85 hover:bg-white/10'
              } ${optionClassName}`}
            >
              <span className="truncate">{opt.label}</span>
              {active && <span className="text-xs text-white/70">Active</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

