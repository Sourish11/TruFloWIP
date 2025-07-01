import { useState } from 'react';
import { Card, CardContent } from './Card';
import UnlockButton from './UnlockButton';

const insights = [
  {
    title: "The 2-Minute Rule",
    content: "Your brain resists starting because it overestimates effort. If something takes less than 2 minutes, do it immediately to build momentum."
  },
  {
    title: "Dopamine Prediction Error",
    content: "Your brain releases more dopamine from anticipating rewards than receiving them. Use this by celebrating small wins along the way."
  },
  {
    title: "The Zeigarnik Effect",
    content: "Unfinished tasks occupy mental space. Write them down to free your mind and reduce cognitive load."
  },
  {
    title: "Attention Residue",
    content: "When you switch tasks, part of your attention stays stuck on the previous task. Take a moment to mentally 'close' each task."
  },
  {
    title: "The Paradox of Choice",
    content: "Too many options create decision paralysis. Limit your choices to 3-5 options maximum for better decision-making."
  },
  {
    title: "Flow State Triggers",
    content: "Flow happens when challenge matches skill level. If bored, increase difficulty. If anxious, build more skills first."
  }
];

export default function BrainDrop() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(0);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const nextInsight = () => {
    setCurrentInsight((prev) => (prev + 1) % insights.length);
  };

  const prevInsight = () => {
    setCurrentInsight((prev) => (prev - 1 + insights.length) % insights.length);
  };

  return (
    <Card className="glass-enhanced shadow-xl">
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-4 font-heading">
            🧠 Daily Brain Drop
          </h3>
          
          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-white/20 mb-4">
            <div className="text-2xl mb-2">🎁</div>
            <div className="text-white font-medium font-body">
              Today's Drop: "Why your brain hates to start things"
            </div>
          </div>

          {!isUnlocked ? (
            <UnlockButton
              unlockThreshold={25}
              onUnlock={handleUnlock}
              storageKey="brainDropUnlock"
              className="w-full"
            >
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white/90 font-ui">
                    Brain Insights Collection
                  </h4>
                </div>
                
                <div className="p-4 bg-white/10 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 font-heading">
                    {insights[currentInsight].title}
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed font-body">
                    {insights[currentInsight].content}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevInsight}
                    className="glass-button px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-all duration-300 font-ui"
                  >
                    ← Previous
                  </button>
                  
                  <div className="text-xs text-white/60 font-ui">
                    {currentInsight + 1} of {insights.length}
                  </div>
                  
                  <button
                    onClick={nextInsight}
                    className="glass-button px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-all duration-300 font-ui"
                  >
                    Next →
                  </button>
                </div>
                
                {/* Insight indicators */}
                <div className="flex justify-center space-x-1 mt-3">
                  {insights.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentInsight(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentInsight 
                          ? 'bg-purple-400' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </UnlockButton>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white/90 font-ui">
                  Brain Insights Collection
                </h4>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <h4 className="font-semibold text-white mb-2 font-heading">
                  {insights[currentInsight].title}
                </h4>
                <p className="text-white/80 text-sm leading-relaxed font-body">
                  {insights[currentInsight].content}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={prevInsight}
                  className="glass-button px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-all duration-300 font-ui"
                >
                  ← Previous
                </button>
                
                <div className="text-xs text-white/60 font-ui">
                  {currentInsight + 1} of {insights.length}
                </div>
                
                <button
                  onClick={nextInsight}
                  className="glass-button px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-all duration-300 font-ui"
                >
                  Next →
                </button>
              </div>
              
              {/* Insight indicators */}
              <div className="flex justify-center space-x-1 mt-3">
                {insights.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentInsight(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentInsight 
                        ? 'bg-purple-400' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}