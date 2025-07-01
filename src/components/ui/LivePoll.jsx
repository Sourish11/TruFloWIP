import { useState, useEffect } from 'react';
import { Card, CardContent } from './Card';

const pollOptions = [
  { id: 'social', label: 'Social Media', emoji: '📱', color: 'bg-blue-500' },
  { id: 'doubt', label: 'Self-Doubt', emoji: '😔', color: 'bg-red-500' },
  { id: 'multitask', label: 'Multitasking', emoji: '🤹', color: 'bg-purple-500' }
];

export default function LivePoll() {
  const [votes, setVotes] = useState({
    social: 42,
    doubt: 24,
    multitask: 34
  });
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('pollVote');
    if (saved) {
      setUserVote(saved);
    }

    // Simulate live voting
    const interval = setInterval(() => {
      setVotes(prev => {
        const options = Object.keys(prev);
        const randomOption = options[Math.floor(Math.random() * options.length)];
        return {
          ...prev,
          [randomOption]: prev[randomOption] + 1
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  const handleVote = (optionId) => {
    if (userVote) return; // Already voted
    
    setVotes(prev => ({
      ...prev,
      [optionId]: prev[optionId] + 1
    }));
    
    setUserVote(optionId);
    localStorage.setItem('pollVote', optionId);
  };

  const getPercentage = (count) => {
    return Math.round((count / totalVotes) * 100);
  };

  return (
    <Card className="glass-enhanced shadow-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">
          📊 What's your biggest distraction this week?
        </h3>
        
        <div className="space-y-3">
          {pollOptions.map((option) => {
            const percentage = getPercentage(votes[option.id]);
            const isSelected = userVote === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={userVote !== null}
                className={`w-full p-3 rounded-lg transition-all duration-300 ${
                  userVote ? 'cursor-default' : 'hover:bg-white/10 cursor-pointer'
                } ${isSelected ? 'ring-2 ring-white/50' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{option.emoji}</span>
                    <span className="text-white font-medium">{option.label}</span>
                  </div>
                  <span className="text-white/80 font-semibold">{percentage}%</span>
                </div>
                
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${option.color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-4 text-center text-white/60 text-sm">
          {userVote ? 'Thanks for voting!' : 'Click to vote'} • {totalVotes} total votes
        </div>
      </CardContent>
    </Card>
  );
}