import { useState, useEffect } from "react";
import { llamaService } from "../services/llamaService";

export default function SmartTasksPanel({ userId, onTasksApplied }) {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showDailyPlanDropdown, setShowDailyPlanDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dailyPlans, setDailyPlans] = useState({});
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiStatus, setAiStatus] = useState({
    isConnected: false,
    lastResponseTime: null,
    lastResponseSuccess: null,
    lastError: null,
    responseCount: 0,
  });
  const [showCalendarView, setShowCalendarView] = useState(false);

  // Initialize with safety checks
  if (!userId) {
    console.warn("SmartTasksPanel: userId is required");
    return <div className="text-red-500">Error: User ID is required</div>;
  }

  // Days of the week for dropdown
  const daysOfWeek = [
    { key: "monday", label: "Monday", emoji: "📅" },
    { key: "tuesday", label: "Tuesday", emoji: "📅" },
    { key: "wednesday", label: "Wednesday", emoji: "📅" },
    { key: "thursday", label: "Thursday", emoji: "📅" },
    { key: "friday", label: "Friday", emoji: "📅" },
    { key: "saturday", label: "Saturday", emoji: "🎯" },
    { key: "sunday", label: "Sunday", emoji: "🌟" },
  ];

  // Load daily plan for selected day
  const loadDailyPlan = (dayKey) => {
    const today = new Date();
    const targetDate = new Date(today);
    const dayIndex = daysOfWeek.findIndex((d) => d.key === dayKey);
    const currentDayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Adjust for Monday being index 0 in our array
    const adjustedCurrentDay = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
    const dayDiff = dayIndex - adjustedCurrentDay;

    targetDate.setDate(today.getDate() + dayDiff);
    const dateKey = targetDate.toISOString().split("T")[0];

    const planKey = `dailySchedule_${userId}_${dateKey}`;
    const savedPlan = localStorage.getItem(planKey);
    if (savedPlan) {
      return JSON.parse(savedPlan);
    }
    return null;
  };

  // Handle day selection - navigate to calendar view
  const handleDaySelect = (dayKey) => {
    setSelectedDay(dayKey);
    const plan = loadDailyPlan(dayKey);
    setDailyPlans({ ...dailyPlans, [dayKey]: plan });
    setShowDailyPlanDropdown(false);
    setShowCalendarView(true);

    // Scroll to calendar section
    setTimeout(() => {
      const calendarSection = document.getElementById("calendar-section");
      if (calendarSection) {
        calendarSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Test AI connection
  const testConnection = async () => {
    setLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      const isConnected = await llamaService.testConnection();
      const responseTime = Date.now() - startTime;

      setAiStatus((prev) => ({
        ...prev,
        isConnected,
        lastResponseTime: responseTime,
        lastResponseSuccess: isConnected,
        lastError: isConnected ? null : "Connection test failed",
        responseCount: prev.responseCount + 1,
      }));

      if (isConnected) {
        setError(
          `✅ AI connection successful! Response time: ${responseTime}ms. You can now create goals with AI assistance.`,
        );
      } else {
        setError(
          "❌ AI connection failed. Check your ngrok endpoint in .env.local file.",
        );
      }
    } catch (err) {
      const responseTime = Date.now() - startTime;
      setAiStatus((prev) => ({
        ...prev,
        isConnected: false,
        lastResponseTime: responseTime,
        lastResponseSuccess: false,
        lastError: err.message,
        responseCount: prev.responseCount + 1,
      }));

      setError(
        `❌ AI connection failed: ${err.message}. Check your ngrok endpoint.`,
      );
    } finally {
      setLoading(false);
    }
  };

  // Load goals from localStorage and test connection
  useEffect(() => {
    const savedGoals = localStorage.getItem(`goals_${userId}`);
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }

    // Auto-test connection on mount
    const autoTestConnection = async () => {
      if (llamaService.endpoint) {
        console.log("Auto-testing Llama connection...");
        await llamaService.testConnection();
      }
    };

    autoTestConnection();
  }, [userId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDailyPlanDropdown &&
        !event.target.closest(".daily-plan-dropdown")
      ) {
        setShowDailyPlanDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDailyPlanDropdown]);

  // Save goals to localStorage
  const saveGoals = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem(`goals_${userId}`, JSON.stringify(newGoals));
  };

  // Delete goal
  const deleteGoal = (goalId, event) => {
    // Prevent the goal card onClick from triggering
    event.stopPropagation();

    // Remove goal from goals array
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    saveGoals(updatedGoals);

    // Clear selected goal if it was the deleted one
    if (selectedGoal?.id === goalId) {
      setSelectedGoal(null);
      setCurrentPlan(null);
    }
  };

  const addGoal = async (goalData) => {
    setLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      console.log("Creating weekly task plan for goal:", goalData.title);
      const planResponse = await llamaService.createWeeklyPlan(
        goalData.title,
        goalData.duration,
        goalData.dailyTime,
      );

      const responseTime = Date.now() - startTime;
      const isSuccess = planResponse && planResponse.plan;

      setAiStatus((prev) => ({
        ...prev,
        isConnected: llamaService.isOnline,
        lastResponseTime: responseTime,
        lastResponseSuccess: isSuccess,
        lastError: isSuccess ? null : "Invalid plan response",
        responseCount: prev.responseCount + 1,
      }));

      if (!planResponse || !planResponse.plan) {
        throw new Error("Invalid response from AI service");
      }

      const newGoal = {
        id: Date.now().toString(),
        ...goalData,
        plan: planResponse.plan,
        createdAt: new Date().toISOString(),
        progress: 0,
        isOffline: !llamaService.isOnline,
      };

      saveGoals([...goals, newGoal]);

      // Save plan to localStorage
      localStorage.setItem(
        `plan_${userId}_${newGoal.id}`,
        JSON.stringify(planResponse.plan),
      );

      setShowAddGoalModal(false);
      setError(null); // Clear any previous errors

      // Show success message with mode indicator
      if (!llamaService.isOnline) {
        setError(
          "✅ Goal created successfully in offline mode! Basic weekly plan generated. AI features will be enhanced when connection is restored.",
        );
      } else {
        setError(
          "✅ Goal created successfully with AI-powered weekly breakdown!",
        );
      }
    } catch (err) {
      console.error("Error creating goal:", err);
      setError(
        "⚠️ Unable to create goal plan. Please try again or check your internet connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  const selectGoal = (goal) => {
    setSelectedGoal(goal);
    const savedPlan = localStorage.getItem(`plan_${userId}_${goal.id}`);
    if (savedPlan) {
      setCurrentPlan(JSON.parse(savedPlan));
    }
  };

  const applyTasksForToday = async (mood, availableTime) => {
    if (!currentPlan) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Creating daily schedule with mood:", mood);
      const todayResponse = await llamaService.createDailySchedule(
        currentPlan,
        mood,
        availableTime,
      );

      if (!todayResponse || !todayResponse.schedule) {
        throw new Error("Invalid response from AI service");
      }

      // Save today's schedule
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem(
        `dailySchedule_${userId}_${today}`,
        JSON.stringify(todayResponse.schedule),
      );

      // Emit tasks for Focus mode
      if (onTasksApplied) {
        onTasksApplied(todayResponse.schedule.tasks);
      }

      setShowMoodModal(false);
      setError(null); // Clear any previous errors

      // Show success message
      if (!llamaService.isOnline) {
        setError(
          "✅ Daily schedule created in offline mode! Basic time-blocked tasks generated.",
        );
      } else {
        setError(
          "✅ Daily schedule created successfully with AI mood adaptation!",
        );
      }
    } catch (err) {
      console.error("Error creating schedule:", err);
      setError(
        "⚠️ Unable to create daily schedule. Please try again or check your internet connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-white font-heading">
              🧩 Smart Tasks
            </h2>
            {/* Enhanced AI Status Display */}
            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs border ${
                  aiStatus.isConnected
                    ? "bg-green-500/20 text-green-300 border-green-400/30"
                    : "bg-red-500/20 text-red-300 border-red-400/30"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    aiStatus.isConnected ? "bg-green-400" : "bg-red-400"
                  }`}
                ></div>
                <span>
                  {aiStatus.isConnected ? "AI Connected" : "AI Disconnected"}
                </span>
              </div>

              {/* Response Status */}
              {aiStatus.responseCount > 0 && (
                <div
                  className={`px-2 py-1 rounded text-xs ${
                    aiStatus.lastResponseSuccess
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-orange-500/20 text-orange-300"
                  }`}
                >
                  {aiStatus.lastResponseSuccess ? "✅" : "❌"}
                  {aiStatus.lastResponseTime}ms
                  {aiStatus.responseCount > 1 && ` (${aiStatus.responseCount})`}
                </div>
              )}

              {/* Proxy Mode Indicator */}
              <div className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300 border border-purple-400/30">
                🔄 Proxy Mode
              </div>

              {/* Test Button */}
              <button
                onClick={testConnection}
                disabled={loading}
                className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 rounded-lg py-1 px-2 transition-colors disabled:opacity-50"
              >
                {loading ? "Testing..." : "Test AI"}
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowAddGoalModal(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl py-2 px-4 font-medium transition-colors"
          >
            + Add Goal
          </button>
        </div>

        {error && (
          <div
            className={`border rounded-lg p-4 mb-4 ${
              error.includes("offline mode") || error.includes("limited")
                ? "bg-yellow-500/20 border-yellow-400/30"
                : "bg-red-500/20 border-red-400/30"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">
                {error.includes("offline mode") || error.includes("limited")
                  ? "⚠️"
                  : "❌"}
              </span>
              <p
                className={`text-sm ${
                  error.includes("offline mode") || error.includes("limited")
                    ? "text-yellow-300"
                    : "text-red-300"
                }`}
              >
                {error}
              </p>
            </div>
            {!llamaService.isOnline && (
              <div className="mt-2 text-xs text-yellow-300">
                <p>• Basic task management is still available</p>
                <p>
                  • Check your ngrok connection and refresh to restore AI
                  features
                </p>
              </div>
            )}
          </div>
        )}

        {/* Goals List */}
        <div className="space-y-4 mb-6">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`rounded-2xl shadow-md p-4 cursor-pointer transition-colors border relative ${
                selectedGoal?.id === goal.id
                  ? "bg-indigo-500/20 border-indigo-400/50"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
              onClick={() => selectGoal(goal)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{goal.title}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-white/70">
                    <span>📅 {goal.duration}</span>
                    <span>⏱️ {goal.dailyTime}/day</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-white/70 mb-1">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full transition-all"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                {goal.plan && (
                  <div className="text-right ml-4">
                    <p className="text-sm font-medium text-purple-400">
                      {goal.plan.totalXP} XP
                    </p>
                    <p className="text-xs text-white/60">
                      {goal.plan.weeks?.length || 0} weeks
                    </p>
                  </div>
                )}
              </div>

              {/* Delete Button - Right Bottom Corner */}
              <button
                onClick={(e) => deleteGoal(goal.id, e)}
                className="absolute bottom-3 right-3 w-8 h-8 bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 rounded-full flex items-center justify-center transition-all border border-red-500/30 hover:border-red-400/60"
                title="Delete task"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Expanded Goal View */}
        {selectedGoal && currentPlan && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">
              🧩 {selectedGoal.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-sm text-white/70">Total XP</p>
                <p className="text-xl font-bold text-purple-400">
                  {currentPlan.totalXP}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-sm text-white/70">Duration</p>
                <p className="text-xl font-bold text-white">
                  {selectedGoal.duration}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-sm text-white/70">Daily Time</p>
                <p className="text-xl font-bold text-white">
                  {selectedGoal.dailyTime}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setShowMoodModal(true)}
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl py-2 px-4 font-medium transition-colors disabled:opacity-50"
              >
                {loading
                  ? "🕒 Creating Schedule..."
                  : "�� Create Daily Schedule"}
              </button>
              <button
                onClick={() => setShowCalendarModal(true)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl py-2 px-4 font-medium transition-colors"
              >
                📅 View Weekly Plan
              </button>
              <div className="relative daily-plan-dropdown">
                <button
                  onClick={() =>
                    setShowDailyPlanDropdown(!showDailyPlanDropdown)
                  }
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl py-2 px-4 font-medium transition-colors flex items-center space-x-2"
                >
                  <span>🗓️ View Daily Plan</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${showDailyPlanDropdown ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showDailyPlanDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-white/20 rounded-xl shadow-xl z-10">
                    <div className="py-2">
                      {daysOfWeek.map((day) => {
                        const plan = loadDailyPlan(day.key);
                        const hasActivePlan =
                          plan && plan.tasks && plan.tasks.length > 0;

                        return (
                          <button
                            key={day.key}
                            onClick={() => handleDaySelect(day.key)}
                            className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2">
                              <span>{day.emoji}</span>
                              <span>{day.label}</span>
                            </div>
                            {hasActivePlan && (
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-xs text-green-400">
                                  {plan.tasks.length}
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Daily Plan Display */}
            {selectedDay && dailyPlans[selectedDay] && (
              <div className="mt-6 mb-6">
                <h4 className="font-medium mb-3 flex items-center text-white">
                  🗓️ Daily Plan -{" "}
                  {daysOfWeek.find((d) => d.key === selectedDay)?.label}
                </h4>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-white/80 text-sm">
                        Mood: {dailyPlans[selectedDay].mood}
                      </p>
                      <p className="text-white/80 text-sm">
                        Available: {dailyPlans[selectedDay].availableTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-purple-400">
                        🏆 {dailyPlans[selectedDay].totalXP} XP
                      </p>
                      <p className="text-xs text-white/60">
                        📅 {dailyPlans[selectedDay].streakStatus} streak
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {dailyPlans[selectedDay].tasks?.map((task, index) => (
                      <div
                        key={task.id}
                        className="bg-white/5 border border-white/10 rounded-lg p-3"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-lg">{task.emoji}</span>
                              <h6 className="font-medium text-white">
                                {task.title}
                              </h6>
                              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                                {task.taskType}
                              </span>
                            </div>
                            <p className="text-white/70 text-sm mb-1">
                              {task.aiFeedback}
                            </p>
                            <p className="text-white/60 text-xs">
                              ⏱️ {task.timeSlot}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-sm font-medium text-purple-400">
                              +{task.xpEarned} XP
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-sm text-white/60">
                    💬 {dailyPlans[selectedDay].moodNote}
                  </div>
                </div>
              </div>
            )}

            {/* Weekly Breakdown Preview */}
            <div className="mt-6">
              <h4 className="font-medium mb-3 flex items-center text-white">
                🗓️ Weekly Breakdown ({currentPlan.weeks?.length || 0} weeks)
              </h4>
              <div className="space-y-4">
                {currentPlan.weeks?.map((week, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-white">
                        Week {week.weekNumber}
                      </h5>
                      <div className="text-right">
                        <p className="text-sm font-medium text-purple-400">
                          🏆 {week.xpPotential} XP
                        </p>
                        <p className="text-xs text-white/60">
                          💪 {week.focusLevel}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-white/90 mb-2">
                      🎯 {week.milestoneGoal}
                    </p>
                    <div className="text-sm text-white/70 space-y-1">
                      <p>📚 Tasks: {week.tasks}</p>
                      <p>⏳ Time: {week.estimatedTime}</p>
                      {week.progressChecks && (
                        <p>✅ Checks: {week.progressChecks}</p>
                      )}
                    </div>
                  </div>
                )) || (
                  <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4">
                    <p className="text-sm text-yellow-300">
                      ⚠️ Weekly breakdown not available. This goal may have been
                      created in offline mode.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddGoalModal && (
          <AddGoalModal
            onClose={() => setShowAddGoalModal(false)}
            onSubmit={addGoal}
            loading={loading}
          />
        )}

        {/* Mood Modal */}
        {showMoodModal && (
          <MoodModal
            onClose={() => setShowMoodModal(false)}
            onSubmit={applyTasksForToday}
            loading={loading}
          />
        )}

        {/* Calendar Modal */}
        {showCalendarModal && currentPlan && (
          <CalendarModal
            plan={currentPlan}
            onClose={() => setShowCalendarModal(false)}
          />
        )}

        {/* Calendar Section */}
        {showCalendarView && selectedDay && (
          <div id="calendar-section" className="mt-8">
            <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-400/30 rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white font-heading flex items-center space-x-2">
                  <span>🗓️</span>
                  <span>
                    Daily Calendar -{" "}
                    {daysOfWeek.find((d) => d.key === selectedDay)?.label}
                  </span>
                </h2>
                <button
                  onClick={() => setShowCalendarView(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {dailyPlans[selectedDay] ? (
                <div className="space-y-6">
                  {/* Day Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="text-white/80 text-sm mb-2">
                        Mood & Energy
                      </h3>
                      <p className="text-white text-lg font-semibold">
                        {dailyPlans[selectedDay].mood}
                      </p>
                      <p className="text-white/60 text-sm mt-1">
                        Energy optimized
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="text-white/80 text-sm mb-2">
                        Available Time
                      </h3>
                      <p className="text-white text-lg font-semibold">
                        {dailyPlans[selectedDay].availableTime}
                      </p>
                      <p className="text-white/60 text-sm mt-1">Time blocked</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="text-white/80 text-sm mb-2">
                        Total Rewards
                      </h3>
                      <p className="text-emerald-400 text-lg font-semibold">
                        🏆 {dailyPlans[selectedDay].totalXP} XP
                      </p>
                      <p className="text-white/60 text-sm mt-1">
                        {dailyPlans[selectedDay].streakStatus} streak
                      </p>
                    </div>
                  </div>

                  {/* Task Timeline */}
                  <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                      <span>⏰</span>
                      <span>Today's Schedule</span>
                    </h3>
                    <div className="space-y-4">
                      {dailyPlans[selectedDay].tasks?.map((task, index) => (
                        <div
                          key={task.id}
                          className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-start space-x-4">
                            {/* Time */}
                            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg px-3 py-2 min-w-[120px] text-center">
                              <p className="text-emerald-300 text-sm font-medium">
                                {task.timeSlot}
                              </p>
                            </div>

                            {/* Task Details */}
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-2xl">{task.emoji}</span>
                                <h4 className="text-white font-semibold text-lg">
                                  {task.title}
                                </h4>
                                <span className="bg-purple-500/20 border border-purple-400/30 text-purple-300 px-2 py-1 rounded text-xs">
                                  {task.taskType}
                                </span>
                              </div>
                              <p className="text-white/80 mb-2">
                                {task.aiFeedback}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-white/60">
                                <span>⚙️ AI Adapted</span>
                                <span>🏆 +{task.xpEarned} XP</span>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
                              Start Task
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Notes */}
                  <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-emerald-400 text-xl">🤖</span>
                      <div>
                        <h4 className="text-emerald-300 font-medium mb-1">
                          AI Scheduling Notes
                        </h4>
                        <p className="text-emerald-200/80 text-sm">
                          {dailyPlans[selectedDay].moodNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    No Schedule for{" "}
                    {daysOfWeek.find((d) => d.key === selectedDay)?.label}
                  </h3>
                  <p className="text-white/60 mb-6">
                    Create a daily schedule by selecting your mood and available
                    time.
                  </p>
                  <button
                    onClick={() => setShowMoodModal(true)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    🕒 Create Schedule for{" "}
                    {daysOfWeek.find((d) => d.key === selectedDay)?.label}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Add Goal Modal Component - Simple Task Entry
function AddGoalModal({ onClose, onSubmit, loading }) {
  const [task, setTask] = useState("");
  const [durationEachDay, setDurationEachDay] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() && durationEachDay && dueDate) {
      onSubmit({
        title: task.trim(),
        duration: calculateDuration(dueDate),
        dailyTime: durationEachDay,
        dueDate: dueDate,
      });
    }
  };

  // Calculate duration based on due date
  const calculateDuration = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = Math.abs(due - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.ceil(diffDays / 7);

    if (weeks <= 1) return "1 week";
    if (weeks <= 2) return "2 weeks";
    if (weeks <= 3) return "3 weeks";
    if (weeks <= 4) return "4 weeks";
    if (weeks <= 6) return "6 weeks";
    if (weeks <= 8) return "8 weeks";
    return "12 weeks";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-white/20 rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4 text-white">
          ✨ Add New Task
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white/80 mb-2">
              What Task? *
            </label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., Learn Python, Complete project proposal..."
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Duration Each Day *
            </label>
            <select
              value={durationEachDay}
              onChange={(e) => setDurationEachDay(e.target.value)}
              className="w-full bg-gray-800 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              style={{ colorScheme: "dark" }}
              required
            >
              <option value="" className="bg-gray-800 text-white">
                Select daily duration...
              </option>
              <option value="30 minutes" className="bg-gray-800 text-white">
                30 minutes
              </option>
              <option value="1 hour" className="bg-gray-800 text-white">
                1 hour
              </option>
              <option value="1.5 hours" className="bg-gray-800 text-white">
                1.5 hours
              </option>
              <option value="2 hours" className="bg-gray-800 text-white">
                2 hours
              </option>
              <option value="3 hours" className="bg-gray-800 text-white">
                3 hours
              </option>
              <option value="4 hours" className="bg-gray-800 text-white">
                4 hours
              </option>
              <option value="5+ hours" className="bg-gray-800 text-white">
                5+ hours
              </option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Due Date *
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-gray-800 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              style={{ colorScheme: "dark" }}
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl py-2 px-4 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !task.trim() || !durationEachDay || !dueDate}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl py-2 px-4 font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "🤖 Creating Plan..." : "🤖 Generate AI Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Mood Modal Component
function MoodModal({ onClose, onSubmit, loading }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [availableTime, setAvailableTime] = useState("");

  const moods = [
    {
      emoji: "😴",
      label: "Slightly Tired",
      description: "Low energy, need easy tasks",
    },
    { emoji: "😐", label: "Neutral", description: "Focused and ready to work" },
    { emoji: "😊", label: "Happy", description: "Positive and motivated" },
    {
      emoji: "🔥",
      label: "Energized",
      description: "High energy, ready for challenges",
    },
    {
      emoji: "😰",
      label: "Stressed",
      description: "Overwhelmed, need structure",
    },
  ];

  const handleSubmit = () => {
    if (selectedMood && availableTime) {
      onSubmit(selectedMood, availableTime);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4">
        <h3 className="text-lg font-semibold mb-4">
          🕒 Create Today's Schedule
        </h3>
        <p className="text-gray-600 mb-6">
          Tell us your mood and available time to create a personalized daily
          schedule.
        </p>

        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">
            How are you feeling?
          </h4>
          <div className="space-y-2">
            {moods.map((mood) => (
              <label
                key={mood.emoji}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedMood === mood.emoji
                    ? "bg-indigo-50 border-2 border-indigo-200"
                    : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                }`}
              >
                <input
                  type="radio"
                  name="mood"
                  value={mood.emoji}
                  checked={selectedMood === mood.emoji}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="sr-only"
                />
                <span className="text-2xl mr-3">{mood.emoji}</span>
                <div>
                  <p className="font-medium text-gray-900">{mood.label}</p>
                  <p className="text-sm text-gray-600">{mood.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Time Today (Format: 3 PM - 6 PM) *
          </label>
          <input
            type="text"
            value={availableTime}
            onChange={(e) => setAvailableTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="3 PM - 6 PM"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Please use the format: Hour AM/PM - Hour AM/PM (e.g., 3 PM - 6 PM)
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl py-2 px-4 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !selectedMood || !availableTime}
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl py-2 px-4 font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "🕒 Creating Schedule..." : "🕒 Create Daily Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Calendar Modal Component - Shows Weekly Plan Breakdown
function CalendarModal({ plan, onClose }) {
  const getFocusLevelColor = (focusLevel) => {
    switch (focusLevel?.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">
            🗓️ Weekly Plan - {plan.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-indigo-50 rounded-lg p-3 text-center">
            <p className="text-indigo-600 font-medium">Duration</p>
            <p className="text-indigo-800 font-bold">{plan.duration}</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 text-center">
            <p className="text-indigo-600 font-medium">Daily Time</p>
            <p className="text-indigo-800 font-bold">{plan.dailyTime}</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 text-center">
            <p className="text-indigo-600 font-medium">Total XP</p>
            <p className="text-indigo-800 font-bold">{plan.totalXP} XP</p>
          </div>
        </div>

        <div className="space-y-4">
          {plan.weeks?.map((week) => (
            <div
              key={week.weekNumber}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Week {week.weekNumber}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    ⏳ {week.estimatedTime}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getFocusLevelColor(
                      week.focusLevel,
                    )}`}
                  >
                    💪 {week.focusLevel} Focus
                  </div>
                  <p className="text-sm font-bold text-indigo-600 mt-2">
                    🏆 {week.xpPotential} XP
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">
                    🎯 Milestone Goal:
                  </h5>
                  <p className="text-gray-900">{week.milestoneGoal}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-1">📚 Tasks:</h5>
                  <p className="text-gray-600">{week.tasks}</p>
                </div>

                {week.progressChecks && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">
                      ✅ Progress Checks:
                    </h5>
                    <p className="text-gray-600">{week.progressChecks}</p>
                  </div>
                )}
              </div>
            </div>
          )) || (
            <div className="text-center py-8 text-gray-500">
              <p>📦 No weekly breakdown available</p>
              <p className="text-sm mt-1">
                This goal may have been created in offline mode.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
            <span>Low Focus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
            <span>Medium Focus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
            <span>High Focus</span>
          </div>
        </div>
      </div>
    </div>
  );
}
