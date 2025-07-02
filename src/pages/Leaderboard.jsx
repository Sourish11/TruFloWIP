import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

const mockLeaderboardData = [
  { id: 1, name: 'Alex Chen', xp: 2847, streak: 15, avatar: 'A', level: 28, weeklyXP: 420 },
  { id: 2, name: 'Sarah Kim', xp: 2654, streak: 12, avatar: 'S', level: 26, weeklyXP: 380 },
  { id: 3, name: 'Mike Johnson', xp: 2431, streak: 8, avatar: 'M', level: 24, weeklyXP: 350 },
  { id: 4, name: 'Emma Davis', xp: 2298, streak: 18, avatar: 'E', level: 22, weeklyXP: 320 },
  { id: 5, name: 'David Wilson', xp: 2156, streak: 6, avatar: 'D', level: 21, weeklyXP: 290 },
  { id: 6, name: 'Lisa Brown', xp: 2034, streak: 11, avatar: 'L', level: 20, weeklyXP: 260 },
  { id: 7, name: 'Tom Garcia', xp: 1923, streak: 9, avatar: 'T', level: 19, weeklyXP: 240 },
  { id: 8, name: 'Anna Martinez', xp: 1812, streak: 14, avatar: 'A', level: 18, weeklyXP: 220 },
  { id: 9, name: 'Chris Lee', xp: 1701, streak: 7, avatar: 'C', level: 17, weeklyXP: 200 },
  { id: 10, name: 'You', xp: 1250, streak: 7, avatar: 'Y', level: 12, weeklyXP: 150, isCurrentUser: true }
];

const mockFriends = [
  { id: 'f1', name: 'Best Friend', xp: 1890, streak: 10, avatar: 'B', level: 18, weeklyXP: 180 },
  { id: 'f2', name: 'Study Buddy', xp: 1456, streak: 5, avatar: 'S', level: 14, weeklyXP: 120 },
  { id: 'f3', name: 'Workout Partner', xp: 1234, streak: 8, avatar: 'W', level: 12, weeklyXP: 140 }
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('global');
  const [timeframe, setTimeframe] = useState('weekly');
  const [leaderboardData, setLeaderboardData] = useState(mockLeaderboardData);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLeaderboardData(prev => 
        prev.map(user => ({
          ...user,
          xp: user.xp + Math.floor(Math.random() * 5),
          weeklyXP: user.weeklyXP + Math.floor(Math.random() * 3)
        })).sort((a, b) => {
          if (timeframe === 'weekly') {
            return b.weeklyXP - a.weeklyXP;
          }
          return b.xp - a.xp;
        })
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [timeframe]);

  const getDisplayData = () => {
    switch (activeTab) {
      case 'friends':
        return mockFriends.sort((a, b) => 
          timeframe === 'weekly' ? b.weeklyXP - a.weeklyXP : b.xp - a.xp
        );
      case 'challenges':
        return leaderboardData.slice(0, 5); // Top 5 for challenge-specific
      default:
        return leaderboardData;
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getAvatarColor = (rank, isCurrentUser = false) => {
    if (isCurrentUser) return 'from-purple-500 to-blue-500';
    if (rank === 1) return 'from-yellow-400 to-orange-500';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-orange-400 to-red-500';
    return 'from-blue-500 to-cyan-500';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 font-heading">
          Leaderboard
        </h1>
        <p className="text-white/80 font-body">
          Compete with friends and the global community
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-2 mb-6">
        {[
          { id: 'global', label: '🌍 Global', count: leaderboardData.length },
          { id: 'friends', label: '👥 Friends', count: mockFriends.length },
          { id: 'challenges', label: '🏆 Challenge', count: 5 }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} ({tab.count})
          </Button>
        ))}
      </div>

      {/* Timeframe Toggle */}
      <div className="flex justify-center space-x-2 mb-6">
        <Button
          variant={timeframe === 'weekly' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setTimeframe('weekly')}
        >
          This Week
        </Button>
        <Button
          variant={timeframe === 'alltime' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setTimeframe('alltime')}
        >
          All Time
        </Button>
      </div>

      {/* Podium for Top 3 */}
      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <div className="flex justify-center items-end space-x-8 mb-8">
            {getDisplayData().slice(0, 3).map((user, index) => {
              const rank = index + 1;
              const heights = ['h-24', 'h-32', 'h-20']; // 2nd, 1st, 3rd
              const order = [1, 0, 2]; // Display order: 2nd, 1st, 3rd
              const actualIndex = order.indexOf(index);
              
              return (
                <motion.div
                  key={user.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: actualIndex * 0.2 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${getAvatarColor(rank, user.isCurrentUser)} rounded-full flex items-center justify-center text-white text-xl font-bold mb-3 mx-auto shadow-lg`}>
                    {user.avatar}
                  </div>
                  <div className="text-white font-semibold mb-1">{user.name}</div>
                  <div className="text-white/70 text-sm mb-2">
                    {timeframe === 'weekly' ? `${user.weeklyXP} XP` : `${user.xp} XP`}
                  </div>
                  <div className={`${heights[actualIndex]} w-20 bg-gradient-to-t ${getAvatarColor(rank)} rounded-t-lg flex items-center justify-center text-white text-2xl font-bold`}>
                    {getRankIcon(rank)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white font-heading">
              {activeTab === 'global' ? 'Global Rankings' : 
               activeTab === 'friends' ? 'Friends Rankings' : 
               'Challenge Rankings'}
            </h2>
            <div className="text-white/60 text-sm">
              🔄 Updates every 10 seconds
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getDisplayData().map((user, index) => {
              const rank = index + 1;
              return (
                <motion.div
                  key={user.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${
                    user.isCurrentUser 
                      ? 'bg-purple-500/20 border-2 border-purple-400/50' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {/* Rank */}
                  <div className="w-12 text-center">
                    <span className="text-2xl">
                      {getRankIcon(rank)}
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${getAvatarColor(rank, user.isCurrentUser)} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                    {user.avatar}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">
                        {user.name}
                      </span>
                      {user.isCurrentUser && (
                        <span className="px-2 py-1 bg-purple-500/30 text-purple-300 text-xs rounded">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-white/60 text-sm">
                      Level {user.level} • {user.streak} day streak
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <div className="text-white font-bold">
                      {timeframe === 'weekly' ? user.weeklyXP : user.xp} XP
                    </div>
                    <div className="text-white/60 text-sm">
                      {timeframe === 'weekly' ? 'This week' : 'Total'}
                    </div>
                  </div>

                  {/* Trend Arrow */}
                  <div className="w-6">
                    {rank <= 3 && (
                      <span className="text-green-400">↗️</span>
                    )}
                    {rank > 3 && rank <= 7 && (
                      <span className="text-yellow-400">→</span>
                    )}
                    {rank > 7 && (
                      <span className="text-red-400">↘️</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Your Stats */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-white font-heading">
            Your Performance
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                #10
              </div>
              <div className="text-sm text-white/70">
                Global Rank
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                150
              </div>
              <div className="text-sm text-white/70">
                Weekly XP
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                7
              </div>
              <div className="text-sm text-white/70">
                Day Streak
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                ↗️ +2
              </div>
              <div className="text-sm text-white/70">
                Rank Change
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}