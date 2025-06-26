import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function HomeSection() {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    { title: 'Start Focus Session', icon: '🎯', color: 'from-blue-500/20 to-blue-600/20 border-blue-400/30' },
    { title: 'Check Mood', icon: '😊', color: 'from-green-500/20 to-green-600/20 border-green-400/30' },
    { title: 'View Progress', icon: '📊', color: 'from-purple-500/20 to-purple-600/20 border-purple-400/30' },
    { title: 'Join Challenge', icon: '🏆', color: 'from-orange-500/20 to-orange-600/20 border-orange-400/30' },
  ];

  const todayStats = [
    { label: 'Tasks Completed', value: '3/8', color: 'text-blue-400' },
    { label: 'Focus Time', value: '2h 15m', color: 'text-green-400' },
    { label: 'Streak', value: '7 days', color: 'text-purple-400' },
    { label: 'XP Earned', value: '150', color: 'text-orange-400' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <Card className="p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-400/30">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.email?.split('@')[0] || 'there'}! 👋
        </h1>
        <p className="text-white/80 text-lg">
          Ready to make today productive? Let's check in with how you're feeling.
        </p>
        <div className="mt-4 text-white/70">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} hover className="cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mx-auto mb-3 border`}>
                <span className="text-2xl">{action.icon}</span>
              </div>
              <h3 className="font-semibold text-white">
                {action.title}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Stats */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-white">
            Today's Progress
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {todayStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mood Check-in */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-white">
            How are you feeling today?
          </h2>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4 mb-6">
            {['😴', '😐', '😊', '🚀', '💪'].map((emoji, index) => (
              <button
                key={index}
                className="text-4xl p-3 rounded-full hover:bg-white/10 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="text-center">
            <Button variant="glass">
              Tell us more about your mood
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-white">
            Recent Activity
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
              <span className="text-green-400">✅</span>
              <span className="text-white">Completed morning routine</span>
              <span className="text-sm text-white/60 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
              <span className="text-blue-400">🎯</span>
              <span className="text-white">Started focus session</span>
              <span className="text-sm text-white/60 ml-auto">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-500/20 border border-purple-400/30 rounded-lg">
              <span className="text-purple-400">🏆</span>
              <span className="text-white">Earned 50 XP from challenge</span>
              <span className="text-sm text-white/60 ml-auto">Yesterday</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}