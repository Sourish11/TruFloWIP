export function Card({ children, className = '', hover = false, ...props }) {
  const baseClasses = 'glass-card rounded-xl transition-all duration-300';
  const hoverClasses = hover ? 'hover:scale-[1.02] cursor-pointer hover:shadow-2xl' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 border-b border-white/10 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 border-t border-white/10 ${className}`}>
      {children}
    </div>
  );
}