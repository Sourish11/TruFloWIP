export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-neutral-900 rounded-xl shadow p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`text-base ${className}`}>
      {children}
    </div>
  );
}