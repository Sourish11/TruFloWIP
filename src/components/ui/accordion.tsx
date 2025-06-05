import React, { useState } from 'react';

export function Accordion({ children, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  );
}

export function AccordionItem({ title, children, className = '' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-md overflow-hidden ${className}`}>
      <button
        className="w-full text-left px-4 py-3 font-semibold flex items-center focus:outline-none bg-white text-black"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="ml-auto text-6xl font-bold">{open ? '-' : '+'}</span>
      </button>
      {open && (
        <div className="px-4 py-3 border-t bg-neutral-50 dark:bg-neutral-800 text-left text-black bg-white">
          {children}
        </div>
      )}
    </div>
  );
}