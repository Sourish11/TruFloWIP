import { forwardRef } from 'react';

const Input = forwardRef(({ 
  className = '', 
  type = 'text',
  label,
  error,
  helperText,
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 glass-button rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 placeholder-white/60 text-white';
  const errorClasses = error 
    ? 'border-red-400/50 focus:ring-red-400/50' 
    : 'border-white/30';
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white/90">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-300">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-white/60">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };