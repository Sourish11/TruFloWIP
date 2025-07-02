import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import MoodPickerModal from '../components/ui/MoodPickerModal';
import FocusTimer from '../components/ui/FocusTimer';
import SmartTaskAI from '../components/ui/SmartTaskAI';
import ProgressGraph from '../components/ui/ProgressGraph';
import trufloLogo from '../assets/truflo-logo.png';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [currentMood, setCurrentMood] = useState(null);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [showFocusTimer, setShowFocusTimer] = useState(false);
  const [showSmartTaskAI, setShowSmartTaskAI] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userStats, setUserStats] = useState({
    xp: 1250,
    streak: 7,
    tasksCompleted: 12,
    focusHours: 8.5,
    timeWasted: 45, // minutes wasted today without TruFlo
    timeSaved: 120, // minutes saved today with TruFlo
    weeklyTimeSaved: 840, // minutes saved this week
    totalTimeSaved: 5400 // total minutes saved since joining
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
    
    // Load profile picture
    const savedPfp = localStorage.getItem(`profile_picture_${auth.currentUser?.uid}`);
    if (savedPfp) {
      setProfilePicture(savedPfp);
    }
    
    // Load tasks
    const savedTasks = localStorage.getItem('truflo_tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    // Check if mood was set today
    const today = new Date().toDateString();
    const savedMood = localStorage.getItem(`mood_${today}`);
    if (savedMood) {
      setCurrentMood(JSON.parse(savedMood));
    }

    // Load user stats
    const savedStats = localStorage.getItem(`user_stats_${auth.currentUser?.uid}`);
    if (savedStats) {
      setUserStats(prev => ({ ...prev, ...JSON.parse(savedStats) }));
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
    // Award XP and update stats
    const newStats = {
      ...userStats,
      xp: userStats.xp + 50,
      focusHours: userStats.focusHours + 0.5,
      timeSaved: userStats.timeSaved + 25 // 25 minutes saved per focus session
    };
    setUserStats(newStats);
    localStorage.setItem(`user_stats_${user.uid}`, JSON.stringify(newStats));
    
    // Trigger confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setProfilePicture(imageData);
        localStorage.setItem(`profile_picture_${user.uid}`, imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAITasksGenerated = (aiTasks) => {
    const updatedTasks = [...tasks, ...aiTasks];
    setTasks(updatedTasks);
    localStorage.setItem('truflo_tasks', JSON.stringify(updatedTasks));
    
    // Auto-schedule tasks on calendar
    const calendarEvents = aiTasks.map(task => ({
      id: task.id,
      title: task.title,
      start: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in next 7 days
      duration: task.estMins,
      type: 'ai-generated',
      difficulty: task.difficulty
    }));
    
    const existingCalendarEvents = JSON.parse(localStorage.getItem('calendar_events') || '[]');
    localStorage.setItem('calendar_events', JSON.stringify([...existingCalendarEvents, ...calendarEvents]));
    
    setShowSmartTaskAI(false);
    
    // Trigger confetti for AI task generation
    if (window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A855F7', '#3B82F6', '#10B981']
      });
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getTimeSavingsMessage = () => {
    const totalHours = Math.floor(userStats.totalTimeSaved / 60);
    if (totalHours > 24) {
      const days = Math.floor(totalHours / 24);
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    return `${totalHours} hour${totalHours > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Logo and Profile */}
      <Card className="p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-400/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={trufloLogo}
              alt="TruFlo Logo"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 font-heading">
                Welcome back, {user?.email?.split('@')[0] || 'there'}! 👋
              </h1>
              <p className="text-white/80 text-lg font-body">
                Ready to make today productive? Let's check in with how you're feeling.
              </p>
            </div>
          </div>
          
          {/* Profile Picture Upload */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 cursor-pointer group">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold group-hover:opacity-80 transition-opacity">
                    {(user?.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs">Upload</span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            
            {/* XP Bar */}
            <div className="text-right">
              <div className="text-white/80 text-sm mb-1">XP: {userStats.xp}</div>
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(userStats.xp % 100)}%` }}
                />
              </div>
              <div className="text-white/60 text-xs mt-1">
                Level {Math.floor(userStats.xp / 100)}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Time Savings Analytics */}
      <Card className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4 font-heading">
            🎯 Your Productivity Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2 font-ui">
                {formatTime(userStats.timeSaved)}
              </div>
              <div className="text-sm text-white/70 font-body">
                Time Saved Today
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2 font-ui">
                {formatTime(userStats.weeklyTimeSaved)}
              </div>
              <div className="text-sm text-white/70 font-body">
                This Week
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2 font-ui">
                {getTimeSavingsMessage()}
              </div>
              <div className="text-sm text-white/70 font-body">
                Total Time Saved
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2 font-ui">
                {formatTime(userStats.timeWasted)}
              </div>
              <div className="text-sm text-white/70 font-body">
                Would've Wasted
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-white/90 font-body">
              Without TruFlo, you would have wasted <span className="font-bold text-red-400">{formatTime(userStats.timeWasted)}</span> today on distractions. 
              Instead, you've been <span className="font-bold text-green-400">{Math.round((userStats.timeSaved / (userStats.timeSaved + userStats.timeWasted)) * 100)}% more productive</span>!
            </p>
          </div>
        </div>
      </Card>

      {/* Progress Graph */}
      <ProgressGraph />

      {/* Mood Badge */}
      {currentMood && (
        <Card className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{currentMood.emoji}</span>
            <div>
              <div className="text-white font-semibold">
                Feeling {currentMood.label} today
              </div>
              <div className="text-white/70 text-sm">
                {currentMood.description}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover className="cursor-pointer" onClick={handleStartFocus}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-white font-heading">
              Start Focus Session
            </h3>
          </CardContent>
        </Card>

        <Card hover className="cursor-pointer" onClick={() => setShowMoodPicker(true)}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">😊</span>
            </div>
            <h3 className="font-semibold text-white font-heading">
              Check Mood
            </h3>
          </CardContent>
        </Card>

        <Card hover className="cursor-pointer" onClick={() => setShowSmartTaskAI(true)}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="font-semibold text-white font-heading">
              AI Smart Tasks
            </h3>
          </CardContent>
        </Card>

        <Card hover className="cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="font-semibold text-white font-heading">
              Join Challenge
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Today's Stats */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-white font-heading">
            Today's Progress
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1 font-ui">
                {userStats.tasksCompleted}
              </div>
              <div className="text-sm text-white/70 font-body">
                Tasks Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1 font-ui">
                {userStats.focusHours}h
              </div>
              <div className="text-sm text-white/70 font-body">
                Focus Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1 font-ui">
                {userStats.streak} days
              </div>
              <div className="text-sm text-white/70 font-body">
                Streak
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1 font-ui">
                {userStats.xp}
              </div>
              <div className="text-sm text-white/70 font-body">
                Total XP
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Plan */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-white font-heading">
            Today's Plan
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.filter(task => task.status === 'todo').slice(0, 3).map((task, index) => (
              <div key={task.id} className="flex items-center space-x-3 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                <span className="text-blue-400">
                  {task.isAIGenerated ? '✨' : '📝'}
                </span>
                <span className="text-white flex-1">{task.title}</span>
                <span className="text-sm text-white/60">{task.estMins}m</span>
              </div>
            ))}
            
            {tasks.filter(task => task.status === 'todo').length === 0 && (
              <div className="text-center py-8 text-white/60">
                <p className="text-sm">No tasks planned yet</p>
                <Button
                  variant="glass"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowSmartTaskAI(true)}
                >
                  Create AI Tasks
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <Button 
              variant="glass" 
              size="sm"
              onClick={() => setShowSmartTaskAI(true)}
            >
              + Add Smart Task
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <MoodPickerModal
        isOpen={showMoodPicker}
        onClose={() => setShowMoodPicker(false)}
        onMoodSelect={handleMoodSelect}
      />

      <FocusTimer
        isActive={showFocusTimer}
        onStart={() => {}}
        onPause={() => {}}
        onComplete={handleFocusComplete}
        onQuit={() => setShowFocusTimer(false)}
        mood={currentMood?.label || 'Focused'}
        duration={25}
      />

      {/* Smart Task AI Modal */}
      {showSmartTaskAI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-auto p-6">
            <Card className="glass-enhanced shadow-2xl border-2 border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white font-heading">
                    ✨ AI Smart Task Planner
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSmartTaskAI(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <SmartTaskAI
                  onTasksGenerated={handleAITasksGenerated}
                  userProfile={{ focusLength: 25 }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}