import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const mockChallenges = [
  {
    id: 'challenge1',
    title: '7-Day Focus Sprint',
    creator: 'Ali Abdaal',
    description: 'Complete 300 XP worth of focused work over 7 days',
    goal: 300,
    rewardXP: 100,
    startDate: new Date('2025-01-20'),
    endDate: new Date('2025-01-27'),
    bannerUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    participants: 1247,
    category: 'Productivity'
  },
  {
    id: 'challenge2',
    title: 'Morning Routine Mastery',
    creator: 'Thomas Frank',
    description: 'Establish a consistent morning routine for 14 days',
    goal: 14,
    rewardXP: 150,
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-01-29'),
    bannerUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
    participants: 892,
    category: 'Habits'
  },
  {
    id: 'challenge3',
    title: 'Deep Work December',
    creator: 'Cal Newport',
    description: 'Complete 20 hours of deep work this month',
    goal: 1200, // minutes
    rewardXP: 200,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    bannerUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    participants: 2156,
    category: 'Focus'
  }
];

export default function Challenges() {
  const [challenges, setChallenges] = useState(mockChallenges);
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Productivity', 'Habits', 'Focus', 'Learning'];

  useEffect(() => {
    // Load joined challenges from localStorage
    const saved = localStorage.getItem('joined_challenges');
    if (saved) {
      setJoinedChallenges(JSON.parse(saved));
    }

    // Load user progress
    const savedProgress = localStorage.getItem('challenge_progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const joinChallenge = (challengeId) => {
    const newJoined = [...joinedChallenges, challengeId];
    setJoinedChallenges(newJoined);
    localStorage.setItem('joined_challenges', JSON.stringify(newJoined));

    // Initialize progress
    const newProgress = {
      ...userProgress,
      [challengeId]: {
        current: 0,
        joinedAt: Date.now()
      }
    };
    setUserProgress(newProgress);
    localStorage.setItem('challenge_progress', JSON.stringify(newProgress));

    // Trigger confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const leaveChallenge = (challengeId) => {
    const newJoined = joinedChallenges.filter(id => id !== challengeId);
    setJoinedChallenges(newJoined);
    localStorage.setItem('joined_challenges', JSON.stringify(newJoined));
  };

  const getProgress = (challengeId) => {
    return userProgress[challengeId] || { current: 0 };
  };

  const getProgressPercentage = (challenge) => {
    const progress = getProgress(challenge.id);
    return Math.min((progress.current / challenge.goal) * 100, 100);
  };

  const getDaysRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const filteredChallenges = selectedCategory === 'All' 
    ? challenges 
    : challenges.filter(c => c.category === selectedCategory);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 font-heading">
          Community Challenges
        </h1>
        <p className="text-white/80 font-body">
          Join influencer-led challenges and compete with the community
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center space-x-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Joined Challenges */}
      {joinedChallenges.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 font-heading">
            Your Active Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges
              .filter(challenge => joinedChallenges.includes(challenge.id))
              .map((challenge) => (
                <Card key={challenge.id} className="overflow-hidden">
                  <div 
                    className="h-32 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${challenge.bannerUrl})` }}
                  >
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-green-500/80 text-white text-xs rounded font-ui">
                        Joined
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-white mb-1 font-heading">
                        {challenge.title}
                      </h3>
                      <p className="text-white/60 text-sm font-body">
                        by {challenge.creator}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">Progress</span>
                        <span className="text-white/80">
                          {getProgress(challenge.id).current} / {challenge.goal}
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getProgressPercentage(challenge)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-white/70">
                      <span>{getDaysRemaining(challenge.endDate)} days left</span>
                      <span>🏆 {challenge.rewardXP} XP</span>
                    </div>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => leaveChallenge(challenge.id)}
                      className="w-full mt-4"
                    >
                      Leave Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Available Challenges */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 font-heading">
          Available Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges
            .filter(challenge => !joinedChallenges.includes(challenge.id))
            .map((challenge) => (
              <Card key={challenge.id} hover className="overflow-hidden cursor-pointer">
                <div 
                  className="h-32 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${challenge.bannerUrl})` }}
                >
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-purple-500/80 text-white text-xs rounded font-ui">
                      {challenge.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white/80 text-xs">
                      👥 {challenge.participants.toLocaleString()} participants
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-1 font-heading">
                      {challenge.title}
                    </h3>
                    <p className="text-white/60 text-sm font-body">
                      by {challenge.creator}
                    </p>
                  </div>

                  <p className="text-white/80 text-sm mb-4 font-body">
                    {challenge.description}
                  </p>

                  <div className="flex justify-between items-center text-sm text-white/70 mb-4">
                    <span>{getDaysRemaining(challenge.endDate)} days left</span>
                    <span>🏆 {challenge.rewardXP} XP reward</span>
                  </div>

                  <Button
                    onClick={() => joinChallenge(challenge.id)}
                    className="w-full"
                  >
                    Join Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Challenge Feed */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-white font-heading">
            Community Feed
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Alex completed the 7-Day Focus Sprint!</div>
                <div className="text-white/60 text-xs mt-1">2 hours ago • Earned 100 XP</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                S
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Sarah is on day 10 of Morning Routine Mastery</div>
                <div className="text-white/60 text-xs mt-1">5 hours ago • 4 days to go!</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                M
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Mike just joined Deep Work December</div>
                <div className="text-white/60 text-xs mt-1">1 day ago • Welcome to the challenge!</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}