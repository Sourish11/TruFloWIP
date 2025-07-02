import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week'); // 'week' or 'day'
  const [tasks, setTasks] = useState([]);
  const [externalEvents, setExternalEvents] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('truflo_tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    // Load external calendar events (simulated)
    const mockExternalEvents = [
      {
        id: 'ext1',
        title: 'Team Meeting',
        start: new Date(2025, 0, 20, 10, 0),
        end: new Date(2025, 0, 20, 11, 0),
        type: 'external',
        source: 'Google Calendar'
      },
      {
        id: 'ext2',
        title: 'Doctor Appointment',
        start: new Date(2025, 0, 22, 14, 30),
        end: new Date(2025, 0, 22, 15, 30),
        type: 'external',
        source: 'Outlook'
      }
    ];
    setExternalEvents(mockExternalEvents);
  }, []);

  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      if (!task.scheduledDate) return false;
      const taskDate = new Date(task.scheduledDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const getExternalEventsForDate = (date) => {
    return externalEvents.filter(event => {
      return event.start.toDateString() === date.toDateString();
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1: return 'bg-green-500/20 border-green-400/30 text-green-400';
      case 2: return 'bg-yellow-500/20 border-yellow-400/30 text-yellow-400';
      case 3: return 'bg-red-500/20 border-red-400/30 text-red-400';
      default: return 'bg-blue-500/20 border-blue-400/30 text-blue-400';
    }
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const scheduleNotification = (task) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notificationTime = new Date(task.scheduledDate);
      notificationTime.setMinutes(notificationTime.getMinutes() - 15);
      
      const timeUntilNotification = notificationTime.getTime() - Date.now();
      
      if (timeUntilNotification > 0) {
        setTimeout(() => {
          new Notification(`Upcoming: ${task.title}`, {
            body: `Starts in 15 minutes`,
            icon: '/TruFlo.png'
          });
        }, timeUntilNotification);
      }
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-heading">
            Calendar
          </h1>
          <p className="text-white/80 font-body">
            Manage your schedule with AI-optimized time blocks
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="glass"
            size="sm"
            onClick={() => setShowImportModal(true)}
          >
            📅 Connect Calendar
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={view === 'week' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
            <Button
              variant={view === 'day' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('day')}
            >
              Day
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => view === 'week' ? navigateWeek(-1) : navigateDay(-1)}
            >
              ← Previous
            </Button>
            
            <h2 className="text-xl font-semibold text-white font-heading">
              {view === 'week' 
                ? `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                : currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
              }
            </h2>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => view === 'week' ? navigateWeek(1) : navigateDay(1)}
            >
              Next →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      {view === 'week' ? (
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b border-white/10">
              {daysOfWeek.map((day) => (
                <div key={day} className="p-4 text-center border-r border-white/10 last:border-r-0">
                  <div className="text-white/70 text-sm font-medium font-ui">
                    {day}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 min-h-[400px]">
              {getWeekDates(currentDate).map((date, index) => (
                <div key={index} className="border-r border-white/10 last:border-r-0 p-2">
                  <div className="text-center mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-sm font-medium ${
                      date.toDateString() === new Date().toDateString()
                        ? 'bg-purple-500 text-white'
                        : 'text-white/70'
                    }`}>
                      {date.getDate()}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {/* AI-scheduled tasks */}
                    {getTasksForDate(date).map((task) => (
                      <div
                        key={task.id}
                        className={`p-2 rounded text-xs ${getDifficultyColor(task.difficulty)} border`}
                      >
                        <div className="font-medium truncate">
                          {task.isAIGenerated && '✨'} {task.title}
                        </div>
                        <div className="text-xs opacity-75">
                          {task.estMins}m
                        </div>
                      </div>
                    ))}
                    
                    {/* External calendar events */}
                    {getExternalEventsForDate(date).map((event) => (
                      <div
                        key={event.id}
                        className="p-2 rounded text-xs bg-blue-500/20 border border-blue-400/30 text-blue-400"
                      >
                        <div className="font-medium truncate">
                          📅 {event.title}
                        </div>
                        <div className="text-xs opacity-75">
                          {event.start.toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Time slots for day view */}
              {Array.from({ length: 24 }, (_, hour) => (
                <div key={hour} className="flex items-start space-x-4 border-b border-white/5 pb-4">
                  <div className="w-16 text-white/60 text-sm font-ui">
                    {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                  </div>
                  
                  <div className="flex-1 min-h-[40px]">
                    {/* Show tasks and events for this hour */}
                    {[...getTasksForDate(currentDate), ...getExternalEventsForDate(currentDate)]
                      .filter(item => {
                        const itemHour = item.scheduledDate ? new Date(item.scheduledDate).getHours() : item.start.getHours();
                        return itemHour === hour;
                      })
                      .map((item, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg mb-2 ${
                            item.type === 'external' 
                              ? 'bg-blue-500/20 border border-blue-400/30' 
                              : getDifficultyColor(item.difficulty)
                          }`}
                        >
                          <div className="font-medium text-sm">
                            {item.isAIGenerated && '✨'} {item.title}
                          </div>
                          <div className="text-xs opacity-75 mt-1">
                            {item.estMins ? `${item.estMins} minutes` : 
                             `${item.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${item.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h3 className="text-xl font-semibold text-white font-heading">
                Connect Your Calendar
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-white/80 text-sm font-body">
                  Import events from your existing calendars to avoid scheduling conflicts.
                </p>
                
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="glass">
                    <span className="mr-3">📧</span>
                    Connect Google Calendar
                  </Button>
                  <Button className="w-full justify-start" variant="glass">
                    <span className="mr-3">📅</span>
                    Connect Outlook
                  </Button>
                  <Button className="w-full justify-start" variant="glass">
                    <span className="mr-3">🍎</span>
                    Connect Apple Calendar
                  </Button>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => setShowImportModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setShowImportModal(false)}
                    className="flex-1"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}