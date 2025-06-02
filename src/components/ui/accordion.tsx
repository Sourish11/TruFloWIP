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
        className="w-full text-black text-left px-4 py-3 font-semibold focus:outline-none bg-white dark:bg-neutral-900"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {title}
      </button>
      {open && (
        <div className="px-4 py-3  text-black border-t bg-neutral-50 dark:bg-neutral-800 text-left">
          {children}
        </div>
      )}
    </div>
  );
}