import React, { useState } from 'react';

export function Accordion({ children, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
}

export function AccordionItem({ title, children, className = '' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`glass-card rounded-lg overflow-hidden ${className}`}>
      <button
        className="w-full text-left px-6 py-4 font-semibold flex items-center justify-between focus:outline-none text-white hover:bg-white/5 transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-lg">{title}</span>
        <span className={`text-2xl font-bold transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-6 py-4 border-t border-white/10 bg-white/5">
          {children}
        </div>
      )}
    </div>
  );
}