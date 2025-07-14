import { useState } from 'react';
import { Card, CardContent, CardHeader } from './Card';
import { Button } from './Button';
import { Input } from './Input';

const difficultyColors = {
  1: 'bg-green-500/20 border-green-400/30 text-green-400',
  2: 'bg-yellow-500/20 border-yellow-400/30 text-yellow-400',
  3: 'bg-red-500/20 border-red-400/30 text-red-400'
};

const difficultyLabels = {
  1: 'Easy',
  2: 'Medium', 
  3: 'Hard'
};

export default function TaskManager({ tasks = [], onTasksChange, currentMood }) {
  const [newTask, setNewTask] = useState({
    title: '',
    difficulty: 2,
    estMins: 25,
    tags: []
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const columns = [
    { id: 'todo', title: 'Today', status: 'todo' },
    { id: 'doing', title: 'In Progress', status: 'doing' },
    { id: 'done', title: 'Completed', status: 'done' }
  ];

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      difficulty: newTask.difficulty,
      estMins: newTask.estMins,
      status: 'todo',
      createdAt: Date.now(),
      tags: newTask.tags
    };

    onTasksChange([...tasks, task]);
    setNewTask({ title: '', difficulty: 2, estMins: 25, tags: [] });
    setShowAddForm(false);
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    onTasksChange(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    onTasksChange(updatedTasks);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  // Suggest task length based on mood
  const getSuggestedLength = () => {
    if (currentMood === 'Overwhelmed') return 15;
    if (currentMood === 'Meh') return 20;
    if (currentMood === 'Focused') return 45;
    if (currentMood === 'Energized') return 60;
    return 25;
  };

  return (
    <div className="space-y-6">
      {/* Add Task Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Task Manager</h2>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              size="sm"
            >
              {showAddForm ? 'Cancel' : '+ Add Task'}
            </Button>
          </div>
        </CardHeader>
        
        {showAddForm && (
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Task Title"
                placeholder="What needs to be done?"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={newTask.difficulty}
                    onChange={(e) => setNewTask({ ...newTask, difficulty: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 glass-button rounded-lg text-white"
                  >
                    <option value={1} className="bg-gray-800">Easy</option>
                    <option value={2} className="bg-gray-800">Medium</option>
                    <option value={3} className="bg-gray-800">Hard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Estimated Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={newTask.estMins}
                    onChange={(e) => setNewTask({ ...newTask, estMins: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 glass-button rounded-lg text-white"
                    placeholder={getSuggestedLength().toString()}
                  />
                </div>
              </div>
              
              {currentMood === 'Overwhelmed' && (
                <div className="p-3 bg-orange-500/20 border border-orange-400/30 rounded-lg">
                  <p className="text-orange-300 text-sm">
                    💡 Since you're feeling overwhelmed, consider breaking this into smaller 15-minute tasks.
                  </p>
                </div>
              )}
              
              <Button onClick={handleAddTask} className="w-full">
                Add Task
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <Card key={column.id}>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">
                {column.title}
                <span className="ml-2 text-sm text-white/60">
                  ({getTasksByStatus(column.status).length})
                </span>
              </h3>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {getTasksByStatus(column.status).map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium text-sm leading-relaxed">
                        {task.title}
                      </h4>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-white/40 hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[task.difficulty]}`}>
                          {difficultyLabels[task.difficulty]}
                        </span>
                        <span className="text-white/60 text-xs">
                          {task.estMins}m
                        </span>
                      </div>
                      
                      <div className="flex space-x-1">
                        {column.status !== 'todo' && (
                          <button
                            onClick={() => handleTaskStatusChange(task.id, 'todo')}
                            className="text-white/60 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10"
                          >
                            ← Todo
                          </button>
                        )}
                        {column.status !== 'doing' && (
                          <button
                            onClick={() => handleTaskStatusChange(task.id, 'doing')}
                            className="text-white/60 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10"
                          >
                            {column.status === 'todo' ? 'Start →' : '← Doing'}
                          </button>
                        )}
                        {column.status !== 'done' && (
                          <button
                            onClick={() => handleTaskStatusChange(task.id, 'done')}
                            className="text-white/60 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10"
                          >
                            Done ✓
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {getTasksByStatus(column.status).length === 0 && (
                  <div className="text-center py-8 text-white/40">
                    <p className="text-sm">No tasks here yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}