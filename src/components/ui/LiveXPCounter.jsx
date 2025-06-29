import { useState, useEffect } from 'react';
import { Card, CardContent } from './Card';

export default function LiveXPCounter() {
  const [stats, setStats] = useState({
    xp: 137440,
    focusMinutes: 22540,
    tasksCompleted: 4302
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        xp: prev.xp + Math.floor(Math.random() * 50) + 10,
        focusMinutes: prev.focusMinutes + Math.floor(Math.random() * 5) + 1,
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <Card className="glass-enhanced shadow-2xl">
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-md">
          Together, we've earned...
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-4xl">🔥</div>
            <div className="text-3xl font-bold gradient-text-white animate-pulse">
              {formatNumber(stats.xp)} XP
            </div>
            <div className="text-white/70 text-sm">Experience Points</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl">⏱️</div>
            <div className="text-3xl font-bold gradient-text-white animate-pulse">
              {formatNumber(stats.focusMinutes)}
            </div>
            <div className="text-white/70 text-sm">Focus Minutes</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-4xl">🚀</div>
            <div className="text-3xl font-bold gradient-text-white animate-pulse">
              {formatNumber(stats.tasksCompleted)}
            </div>
            <div className="text-white/70 text-sm">Tasks Completed</div>
          </div>
        </div>
        
        <div className="mt-6 text-white/60 text-sm">
          ✨ Growing in real-time as our community engages
        </div>
      </CardContent>
    </Card>
  );
}