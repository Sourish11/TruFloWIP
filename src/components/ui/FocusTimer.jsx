import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './Card';
import { Button } from './Button';

const moodGradients = {
  'Energized': 'from-green-400 to-emerald-500',
  'Focused': 'from-blue-400 to-cyan-500',
  'Meh': 'from-gray-400 to-slate-500',
  'Overwhelmed': 'from-red-400 to-rose-500'
};

export default function FocusTimer({ 
  isActive, 
  onStart, 
  onPause, 
  onComplete, 
  onQuit,
  duration = 25, // minutes
  mood = 'Focused',
  tasks = []
}) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isRunning, timeLeft, onComplete]);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const handleStart = () => {
    setIsRunning(true);
    onStart();
  };

  const handlePause = () => {
    setIsRunning(false);
    onPause();
  };

  const handleQuit = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
    setShowQuitConfirm(false);
    onQuit();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-auto p-6">
        <Card className="glass-enhanced shadow-2xl border-2 border-white/20">
          <CardContent className="p-12 text-center">
            {/* Mood-based gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${moodGradients[mood]} opacity-10 rounded-xl`} />
            
            <div className="relative z-10">
              {/* Timer display */}
              <div className="mb-8">
                <div className={`text-8xl font-bold text-white mb-4 font-heading bg-gradient-to-r ${moodGradients[mood]} bg-clip-text text-transparent`}>
                  {formatTime(timeLeft)}
                </div>
                
                {/* Progress ring */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 54}`}
                      strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Pulse effect when running */}
                  {isRunning && (
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${moodGradients[mood]} opacity-20 animate-ping`} />
                  )}
                </div>
              </div>

              {/* Current mood indicator */}
              <div className="mb-6">
                <div className="text-white/80 text-sm mb-2">Current Mood</div>
                <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${moodGradients[mood]} bg-opacity-20 border border-white/20`}>
                  <span className="text-white font-medium">{mood}</span>
                </div>
              </div>

              {/* Task list (locked during focus) */}
              {tasks.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-white/80 text-sm mb-4">Focus Tasks</h3>
                  <div className="space-y-2">
                    {tasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-center space-x-2 text-white/60">
                        <span className="w-2 h-2 bg-white/40 rounded-full" />
                        <span className="text-sm">{task.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Control buttons */}
              <div className="flex justify-center space-x-4">
                {!isRunning ? (
                  <Button
                    onClick={handleStart}
                    size="lg"
                    className="px-8"
                  >
                    {timeLeft === duration * 60 ? 'Start Focus' : 'Resume'}
                  </Button>
                ) : (
                  <Button
                    onClick={handlePause}
                    variant="secondary"
                    size="lg"
                    className="px-8"
                  >
                    Pause
                  </Button>
                )}
                
                <Button
                  onClick={() => setShowQuitConfirm(true)}
                  variant="ghost"
                  size="lg"
                >
                  Quit Session
                </Button>
              </div>

              {/* Quit confirmation */}
              {showQuitConfirm && (
                <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-white mb-4">Are you sure you want to quit this focus session?</p>
                  <div className="flex justify-center space-x-3">
                    <Button
                      onClick={handleQuit}
                      variant="danger"
                      size="sm"
                    >
                      Yes, Quit
                    </Button>
                    <Button
                      onClick={() => setShowQuitConfirm(false)}
                      variant="ghost"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}