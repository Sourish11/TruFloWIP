import { useState, useEffect } from 'react';

export default function UnlockButton({ 
  children, 
  unlockThreshold = 27, 
  onUnlock,
  storageKey,
  className = '' 
}) {
  const [pressCount, setPressCount] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Reset on each page load - no persistence for unlock state
  }, []);

  const handlePress = () => {
    if (isUnlocked) return;
    
    const newCount = pressCount + 1;
    setPressCount(newCount);
    
    if (newCount >= unlockThreshold) {
      setIsUnlocked(true);
      // Trigger confetti effect
      if (window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B']
        });
      }
      onUnlock?.();
    }
  };

  if (isUnlocked) {
    return (
      <div className={`animate-fade-in ${className}`}>
        {children}
      </div>
    );
  }

  const remaining = unlockThreshold - pressCount;

  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={handlePress}
        className="glass-button px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-white/20 font-ui"
      >
        🔒 Unlock with {remaining} More Press{remaining !== 1 ? 'es' : ''}
      </button>
      
      {pressCount > 0 && (
        <div className="mt-2">
          <div className="w-full bg-white/20 rounded-full h-2 max-w-xs mx-auto">
            <div 
              className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(pressCount / unlockThreshold) * 100}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-1 font-body">
            {pressCount}/{unlockThreshold} presses
          </p>
        </div>
      )}
    </div>
  );
}