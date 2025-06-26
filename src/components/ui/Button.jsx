import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/20',
    secondary: 'glass-button shadow-md hover:shadow-lg',
    outline: 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm',
    ghost: 'text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm',
    glass: 'glass-button font-medium',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 border border-white/20',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 border border-white/20'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-2.5 text-base rounded-lg',
    lg: 'px-8 py-3 text-lg rounded-xl',
    xl: 'px-10 py-4 text-xl rounded-xl'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {/* Subtle shine effect on hover - NO GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
      
      {loading && (
        <div className="spinner mr-2" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
});

Button.displayName = 'Button';

export { Button };