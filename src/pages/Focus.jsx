import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import FocusTimer from '../components/ui/FocusTimer';
import MoodPickerModal from '../components/ui/MoodPickerModal';

export default function Focus() {
  const [showFocusTimer, setShowFocusTimer] = useState(false);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [currentMood, setCurrentMood] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [focusLength, setFocusLength] = useState(25);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load current mood
    const today = new Date().toDateString();
    const savedMood = localStorage.getItem(`mood_${today}`);
    if (savedMood) {
      setCurrentMood(JSON.parse(savedMood));
    }

    // Load tasks
    const savedTasks = localStorage.getItem('truflo_tasks');
    if (savedTasks) {
      const allTasks = JSON.parse(savedTasks);
      setTasks(allTasks.filter(task => task.status === 'todo'));
    }
  }, []);

  const handleMoodSelect = (mood) => {
    const today = new Date().toDateString();
    const moodData = {
      ...mood,
      date: today,
      timestamp: Date.now()
    };
    
    setCurrentMood(moodData);
    localStorage.setItem(`mood_${today}`, JSON.stringify(moodData));
    setShowMoodPicker(false);
  };

  const handleStartFocus = () => {
    if (!currentMood) {
      setShowMoodPicker(true);
      return;
    }
    setShowFocusTimer(true);
  };

  const handleFocusComplete = () => {
    setShowFocusTimer(false);
    
    // Mark selected tasks as completed and award XP
    const completedTasks = selectedTasks.map(task => ({
      ...task,
      status: 'done',
      completedAt: Date.now()
    }));
    
    // Calculate XP based on difficulty and time
    const earnedXP = selectedTasks.reduce((total, task) => {
      return total + (task.difficulty * focusLength);
    }, 0);
    
    // Save focus session log
    const sessionLog = {
      id: Math.random().toString(36).substr(2, 9),
      taskIds: selectedTasks.map(t => t.id),
      moodEmoji: currentMood.emoji,
      start: Date.now() - (focusLength * 60 * 1000),
      end: Date.now(),
      earnedXP,
      lengthMins: focusLength
    };
    
    const savedLogs = JSON.parse(localStorage.getItem('focus_logs') || '[]');
    localStorage.setItem('focus_logs', JSON.stringify([...savedLogs, sessionLog]));
    
    // Trigger confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const toggleTaskSelection = (task) => {
    setSelectedTasks(prev => {
      const isSelected = prev.find(t => t.id === task.id);
      if (isSelected) {
        return prev.filter(t => t.id !== task.id);
      } else {
        return [...prev, task];
      }
    });
  };

  const getMoodRecommendedLength = () => {
    if (!currentMood) return 25;
    
    switch (currentMood.label) {
      case 'Overwhelmed': return 15;
      case 'Meh': return 20;
      case 'Focused': return 45;
      case 'Energized': return 60;
      default: return 25;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 font-heading">
          Focus Session
        </h1>
        <p className="text-white/80 font-body">
          Block distractions and enter deep work mode
        </p>
      </div>

      {!showFocusTimer ? (
        <>
          {/* Mood Check */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-white font-heading">
                Current Mood
              </h2>
            </CardHeader>
            <CardContent>
              {currentMood ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{currentMood.emoji}</span>
                    <div>
                      <div className="text-white font-semibold">
                        {currentMood.label}
                      </div>
                      <div className="text-white/70 text-sm">
                        {currentMood.description}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMoodPicker(true)}
                  >
                    Change Mood
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-white/70 mb-4">
                    Let's check in with how you're feeling first
                  </p>
                  <Button onClick={() => setShowMoodPicker(true)}>
                    Set Your Mood
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Focus Length */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-white font-heading">
                Focus Duration
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[15, 25, 45, 90].map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => setFocusLength(minutes)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      focusLength === minutes
                        ? 'border-purple-400 bg-purple-500/20'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-white font-semibold">{minutes}m</div>
                    <div className="text-white/60 text-xs">
                      {minutes === 15 && 'Quick'}
                      {minutes === 25 && 'Pomodoro'}
                      {minutes === 45 && 'Deep Work'}
                      {minutes === 90 && 'Flow State'}
                    </div>
                  </button>
                ))}
              </div>
              
              {currentMood && (
                <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    💡 Based on your {currentMood.label} mood, we recommend {getMoodRecommendedLength()} minutes
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Task Selection */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-white font-heading">
                Select Tasks to Focus On
              </h2>
            </CardHeader>
            <CardContent>
              {tasks.length > 0 ? (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTaskSelection(task)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedTasks.find(t => t.id === task.id)
                          ? 'border-green-400 bg-green-500/20'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{task.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-white/60">
                              {task.difficulty === 1 && '🟢 Easy'}
                              {task.difficulty === 2 && '🟡 Medium'}
                              {task.difficulty === 3 && '🔴 Hard'}
                            </span>
                            <span className="text-xs text-white/60">
                              ~{task.estMins}m
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl">
                          {selectedTasks.find(t => t.id === task.id) ? '✅' : '⭕'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-white/60">
                  <p>No tasks available. Add some tasks first!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Start Focus Button */}
          <div className="text-center">
            <Button
              onClick={handleStartFocus}
              size="lg"
              className="px-12"
              disabled={!currentMood}
            >
              Start {focusLength}-Minute Focus Session
            </Button>
          </div>
        </>
      ) : null}

      {/* Focus Timer */}
      <FocusTimer
        isActive={showFocusTimer}
        onStart={() => {}}
        onPause={() => {}}
        onComplete={handleFocusComplete}
        onQuit={() => setShowFocusTimer(false)}
        mood={currentMood?.label || 'Focused'}
        duration={focusLength}
        tasks={selectedTasks}
      />

      {/* Mood Picker Modal */}
      <MoodPickerModal
        isOpen={showMoodPicker}
        onClose={() => setShowMoodPicker(false)}
        onMoodSelect={handleMoodSelect}
      />
    </div>
  );
}