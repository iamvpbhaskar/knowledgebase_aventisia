import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  portal = false,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);
  const [menuStyle, setMenuStyle] = useState(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e) => {
      const root = rootRef.current;
      const menu = menuRef.current;
      if (root?.contains(e.target)) return;
      if (menu?.contains(e.target)) return;
      setOpen(false);
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

  useEffect(() => {
    if (!open || !portal) return;

    const estimateHeight = Math.min(320, options.length * 40 + 12);
    const gap = 8;

    const update = () => {
      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const width =
        widthClassName === 'w-full' ? rect.width : undefined;

      const measured = menuRef.current?.getBoundingClientRect().height;
      const resolvedHeight = measured && measured > 0 ? measured : menuHeight || estimateHeight;

      // If asked to open bottom but there isn't enough space, flip to top.
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const wantsBottom = placement !== 'top';
      const useBottom = wantsBottom ? spaceBelow >= resolvedHeight + gap || spaceBelow >= spaceAbove : false;

      const top = useBottom ? rect.bottom + gap : Math.max(gap, rect.top - resolvedHeight - gap);
      let left = align === 'right' ? rect.right - (width ?? rect.width) : rect.left;

      const finalWidth = width ?? rect.width;
      left = Math.max(gap, Math.min(left, window.innerWidth - finalWidth - gap));

      setMenuStyle({
        position: 'fixed',
        top,
        left,
        width: widthClassName === 'w-full' ? finalWidth : undefined,
        zIndex: 9999,
      });
    };

    update();

    const handleScroll = () => update();
    const handleResize = () => update();

    // Capture scroll from any scroll container.
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [open, portal, options.length, placement, align, widthClassName, menuHeight]);

  useEffect(() => {
    if (!open) return;
    const measured = menuRef.current?.getBoundingClientRect().height;
    if (measured && measured > 0) setMenuHeight(measured);
  }, [open, value, options]);

  const selected = useMemo(() => options.find((o) => o.value === value) ?? null, [options, value]);

  const sideClass = placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
  const alignClass = align === 'right' ? 'right-0' : 'left-0';
  const rootZ = open && !portal ? 'z-50' : 'z-0';

  const menuEl = (
    <div
      ref={menuRef}
      role="listbox"
      style={portal ? (menuStyle ?? { position: 'fixed', zIndex: 9999 }) : undefined}
      className={`${portal ? '' : `absolute ${alignClass} ${sideClass} ${widthClassName}`} origin-top-left rounded-lg border border-white/10 bg-[#111827]/70 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-200 ease-out ${
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
  );

  return (
    <div className={`relative ${rootZ}`} ref={rootRef}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((v) => !v)}
        ref={buttonRef}
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

      {portal ? createPortal(menuEl, document.body) : menuEl}
    </div>
  );
}
