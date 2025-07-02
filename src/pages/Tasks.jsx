import { useState, useEffect } from 'react';
import TaskManager from '../components/ui/TaskManager';
import SmartTaskAI from '../components/ui/SmartTaskAI';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [currentMood, setCurrentMood] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('truflo_tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    // Load current mood
    const today = new Date().toDateString();
    const savedMood = localStorage.getItem(`mood_${today}`);
    if (savedMood) {
      setCurrentMood(JSON.parse(savedMood));
    }

    // Load user profile from onboarding
    const auth = { currentUser: { uid: 'demo' } }; // Mock auth
    const savedProfile = localStorage.getItem(`onboarding_${auth.currentUser.uid}`);
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleTasksChange = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('truflo_tasks', JSON.stringify(newTasks));
  };

  const handleAITasksGenerated = (aiTasks) => {
    const updatedTasks = [...tasks, ...aiTasks];
    handleTasksChange(updatedTasks);
    
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 font-heading">
          Smart Task Management
        </h1>
        <p className="text-white/80 font-body">
          AI-powered task breakdown with mood-adaptive recommendations
        </p>
      </div>

      {/* AI Task Generator */}
      <SmartTaskAI 
        onTasksGenerated={handleAITasksGenerated}
        userProfile={userProfile}
      />

      {/* Task Manager */}
      <TaskManager
        tasks={tasks}
        onTasksChange={handleTasksChange}
        currentMood={currentMood?.label}
      />
    </div>
  );
}