// Llama API service for communicating with local model
export class LlamaService {
  constructor() {
    // Use Vite proxy endpoint instead of direct ngrok URL to avoid CORS
    this.endpoint = "/api/llama"; // Gets rewritten to /api/generate by Vite proxy
    this.isOnline = true;
    this.retryCount = 0;
    this.maxRetries = 2;

    // Debug logging
    console.log("LlamaService initialized with proxy endpoint:", this.endpoint);
    console.log(
      "Original ngrok endpoint from env:",
      import.meta.env.VITE_LLAMA_ENDPOINT,
    );
  }

  async testConnection() {
    try {
      console.log("Testing Llama API connection via proxy:", this.endpoint);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for test

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.1",
          prompt: "Test connection. Please respond with 'OK'.",
          stream: false,
          max_tokens: 10,
          temperature: 0.1,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        this.isOnline = true;
        console.log("✅ Llama API connection successful via proxy");
        return true;
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Llama API connection failed:", error.message);
      this.isOnline = false;
      return false;
    }
  }

  async generateResponse(prompt, model = "llama3.1") {
    // Check if we have an endpoint configured
    if (!this.endpoint) {
      console.warn("No LLAMA_ENDPOINT configured, using fallback");
      this.isOnline = false;
      return this.getFallbackResponse(prompt);
    }

    try {
      console.log("Attempting to call Llama API via proxy:", this.endpoint);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // Increased to 15 second timeout

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
          max_tokens: 1500, // Increased for better responses
          temperature: 0.7,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error(`API Error ${response.status}:`, errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`,
        );
      }

      const data = await response.json();
      console.log("Llama API response received via proxy:", data);

      this.isOnline = true;
      this.retryCount = 0;

      return data;
    } catch (error) {
      console.error("Llama API call failed:", error.message);

      // Immediately fall back to offline mode for fetch errors
      this.isOnline = false;
      console.warn("API unavailable, using fallback response");

      // Use fallback instead of throwing error
      return this.getFallbackResponse(prompt);
    }
  }

  getFallbackResponse(prompt) {
    console.log(
      "Using fallback response for prompt:",
      prompt.substring(0, 100) + "...",
    );

    // Return a structured response that matches expected format
    if (prompt.includes("🧩 PART 1: Weekly/Daily Plan Generator")) {
      // Extract goal title from prompt if possible
      const goalMatch = prompt.match(/Task Goal: (.+?)(?:\n|$)/);
      const durationMatch = prompt.match(/Duration: (.+?)(?:\n|$)/);
      const timeMatch = prompt.match(/Daily Time Available: (.+?)(?:\n|$)/);

      const goalTitle = goalMatch ? goalMatch[1].trim() : "Your Goal";
      const duration = durationMatch ? durationMatch[1].trim() : "4 weeks";
      const dailyTime = timeMatch ? timeMatch[1].trim() : "1 hour";
      const weeks = this.calculateWeeks(duration);

      return {
        response: JSON.stringify({
          plan: this.createFallbackWeeklyPlan(goalTitle, duration, dailyTime)
            .plan,
        }),
      };
    } else if (prompt.includes("🕒 PART 2: Daily Scheduler")) {
      return {
        response: JSON.stringify({
          schedule: {
            date: new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            mood: "Neutral 😐",
            availableTime: "3 PM - 6 PM",
            tasks: [
              {
                id: "task_1",
                timeSlot: "3:00 PM - 3:30 PM",
                taskType: "Focus Work",
                emoji: "📚",
                title: "Start with foundational work",
                aiFeedback:
                  "Good starting task for your current mood (offline mode)",
                xpEarned: 25,
              },
              {
                id: "task_2",
                timeSlot: "4:00 PM - 4:30 PM",
                taskType: "Practice",
                emoji: "🎯",
                title: "Practice and apply knowledge",
                aiFeedback: "Continue building momentum",
                xpEarned: 30,
              },
            ],
            streakStatus: "1 day",
            totalXP: 55,
            moodNote:
              "Schedule created in offline mode - basic task structure provided",
          },
        }),
      };
    }

    return {
      response:
        "I understand your request, but I'm currently in offline mode. Please check your connection and try again.",
    };
  }

  async createWeeklyPlan(goal, duration, dailyTime) {
    const prompt = `
🧩 PART 1: Weekly/Daily Plan Generator Prompt

You are an AI assistant in a behavior-focused productivity app called TruFlo.

Your task is to generate a structured **goal plan over a specific time duration** to help the user achieve a key objective, while accounting for their available daily time. The goal should be broken down week by week.

Use the following structure and logic:
- Analyze the end goal and total time available
- Break the goal into progressive weekly tasks or learning blocks
- Ensure each week includes a mix of:
    * High-focus work (learning, training, practicing)
    * Medium-focus tasks (review, light practice)
    * Recharge or light XP tasks (rest, reflection)
- Include progress metrics, XP suggestions, and milestone checks
- Include placeholder time slots per task (to be scheduled in Part 2)

---
User Inputs:
Task Goal: ${goal}
Duration: ${duration}
Daily Time Available: ${dailyTime}

Return the full breakdown as a JSON response with this exact structure:
{
  "plan": {
    "title": "${goal}",
    "duration": "${duration}",
    "dailyTime": "${dailyTime}",
    "totalXP": 300,
    "weeks": [
      {
        "weekNumber": 1,
        "milestoneGoal": "Establish foundation and basic understanding",
        "tasks": "Research fundamentals, set up workspace, create learning schedule",
        "estimatedTime": "3-4 hours total", 
        "focusLevel": "Medium",
        "xpPotential": 75,
        "progressChecks": "Complete initial research, workspace ready"
      }
    ]
  }
}

Make the plan realistic based on the duration and daily time. Create ${this.calculateWeeks(duration)} weeks of content.
`;

    const response = await this.generateResponse(prompt);

    try {
      console.log("Raw response from Llama:", response);

      let responseText = "";

      // Handle different response formats from Llama 3.1
      if (response.response) {
        responseText = response.response;
      } else if (
        response.choices &&
        response.choices[0] &&
        response.choices[0].text
      ) {
        responseText = response.choices[0].text;
      } else if (response.text) {
        responseText = response.text;
      } else if (typeof response === "string") {
        responseText = response;
      } else {
        console.log("Unknown response format:", response);
        throw new Error("Unknown response format from Llama");
      }

      console.log("Extracted response text:", responseText);

      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedJson = JSON.parse(jsonMatch[0]);
        console.log("Parsed JSON:", parsedJson);
        return parsedJson;
      }

      // If no JSON found, try to parse the text content into our structure
      const parsedPlan = this.parseTextToWeeklyPlan(
        responseText,
        goal,
        duration,
        dailyTime,
      );
      if (parsedPlan) {
        console.log("Parsed text to plan:", parsedPlan);
        return parsedPlan;
      }

      throw new Error("No valid JSON or parseable content found in response");
    } catch (parseError) {
      console.error("Failed to parse weekly plan response:", parseError);
      console.log("Falling back to offline plan");
      // Fallback plan structure
      return this.createFallbackWeeklyPlan(goal, duration, dailyTime);
    }
  }

  calculateWeeks(duration) {
    const weekMap = {
      "1 week": 1,
      "2 weeks": 2,
      "3 weeks": 3,
      "4 weeks": 4,
      "6 weeks": 6,
      "8 weeks": 8,
      "12 weeks": 12,
    };
    return weekMap[duration] || 4;
  }

  parseTextToWeeklyPlan(responseText, goal, duration, dailyTime) {
    try {
      const weeks = [];
      let totalXP = 0;

      // Look for week patterns in the text
      const weekPatterns = [
        /Week\s+(\d+)[:\s]*([^\n]+)/gi,
        /\*\*Week\s+(\d+)\*\*[:\s]*([^\n]+)/gi,
        /(\d+)\. Week\s+(\d+)[:\s]*([^\n]+)/gi,
      ];

      let weekMatches = [];
      for (const pattern of weekPatterns) {
        const matches = [...responseText.matchAll(pattern)];
        if (matches.length > 0) {
          weekMatches = matches;
          break;
        }
      }

      // If we found week patterns, parse them
      if (weekMatches.length > 0) {
        weekMatches.forEach((match, index) => {
          const weekNum = parseInt(match[1]) || index + 1;
          const content = match[2] || match[3] || "Focus on goal activities";

          // Extract XP if mentioned in the content
          const xpMatch = content.match(/(\d+)\s*XP/i);
          const weekXP = xpMatch ? parseInt(xpMatch[1]) : 50 + index * 10;
          totalXP += weekXP;

          // Extract tasks if mentioned
          const taskMatch = content.match(/Tasks?[:\s]*([^\n]+)/i);
          const tasks = taskMatch ? taskMatch[1] : content;

          // Extract focus level
          const focusMatch = content.match(/(low|medium|high)\s*focus/i);
          const focusLevel = focusMatch
            ? focusMatch[1].toLowerCase()
            : "medium";

          weeks.push({
            weekNumber: weekNum,
            milestoneGoal: `Week ${weekNum} milestone for ${goal}`,
            tasks: tasks.trim(),
            estimatedTime: dailyTime + " daily",
            focusLevel:
              focusLevel.charAt(0).toUpperCase() + focusLevel.slice(1),
            xpPotential: weekXP,
            progressChecks: `Complete week ${weekNum} objectives`,
          });
        });
      } else {
        // If no specific week patterns found, try to extract general task information
        const taskPatterns = [/[-•*]\s*([^\n]+)/g, /\d+\.\s*([^\n]+)/g];

        let tasks = [];
        for (const pattern of taskPatterns) {
          const matches = [...responseText.matchAll(pattern)];
          if (matches.length > 0) {
            tasks = matches.map((match) => match[1].trim());
            break;
          }
        }

        // Distribute tasks across weeks
        const numWeeks = this.calculateWeeks(duration);
        const tasksPerWeek = Math.ceil(tasks.length / numWeeks);

        for (let i = 0; i < numWeeks; i++) {
          const weekTasks = tasks.slice(
            i * tasksPerWeek,
            (i + 1) * tasksPerWeek,
          );
          const weekXP = 50 + i * 15;
          totalXP += weekXP;

          weeks.push({
            weekNumber: i + 1,
            milestoneGoal: `Week ${i + 1} milestone for ${goal}`,
            tasks: weekTasks.join(", ") || `Focus on ${goal} activities`,
            estimatedTime: dailyTime + " daily",
            focusLevel: i < 2 ? "Medium" : "High",
            xpPotential: weekXP,
            progressChecks: `Complete week ${i + 1} objectives`,
          });
        }
      }

      if (weeks.length === 0) {
        return null; // Let it fall back to the standard fallback
      }

      return {
        plan: {
          title: goal,
          duration,
          dailyTime,
          totalXP: totalXP || 200,
          weeks: weeks,
        },
      };
    } catch (error) {
      console.error("Error parsing text to weekly plan:", error);
      return null;
    }
  }

  createFallbackWeeklyPlan(goal, duration, dailyTime) {
    const weeks = this.calculateWeeks(duration);
    const xpPerWeek = Math.ceil(200 / weeks);

    // Create more diverse weekly content based on progression
    const weekTemplates = {
      1: {
        milestoneGoal: `Foundation building for ${goal}`,
        tasks: "Research, planning, setup workspace, gather resources",
        focusLevel: "Medium",
        progressChecks: "Complete research phase, tools ready",
      },
      2: {
        milestoneGoal: `Initial implementation of ${goal}`,
        tasks: "Start core work, practice basics, build momentum",
        focusLevel: "Medium",
        progressChecks: "First deliverable completed, workflow established",
      },
      3: {
        milestoneGoal: `Skill development for ${goal}`,
        tasks: "Advanced techniques, problem-solving, refinement",
        focusLevel: "High",
        progressChecks: "Demonstrable progress, obstacles overcome",
      },
      4: {
        milestoneGoal: `Mastery and completion of ${goal}`,
        tasks: "Polish work, testing, documentation, review",
        focusLevel: "High",
        progressChecks: "Goal achieved, quality standards met",
      },
    };

    return {
      plan: {
        title: goal,
        duration,
        dailyTime,
        totalXP: weeks * xpPerWeek,
        weeks: Array.from({ length: weeks }, (_, i) => {
          const weekNum = i + 1;
          const template =
            weekTemplates[Math.min(weekNum, 4)] || weekTemplates[4];

          return {
            weekNumber: weekNum,
            milestoneGoal: template.milestoneGoal,
            tasks: template.tasks,
            estimatedTime: dailyTime + " daily",
            focusLevel: template.focusLevel,
            xpPotential: xpPerWeek + i * 10, // Increasing XP each week
            progressChecks: template.progressChecks,
          };
        }),
      },
    };
  }

  async createDailySchedule(plan, mood, availableTime) {
    const moodMap = {
      "😴": "Slightly Tired",
      "😐": "Neutral",
      "😊": "Happy",
      "🔥": "Energized",
      "😰": "Stressed",
    };

    const moodDescription = moodMap[mood] || "Neutral";
    const currentWeek = this.getCurrentWeekFromPlan(plan);
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const prompt = `
🕒 PART 2: Daily Scheduler Prompt

You are an AI assistant in a behavior-focused productivity app called TruFlo.

Your task is to create a **personalized daily task schedule** based on the user's mood, available hours, and weekly goal plan.

Use the following logic:
- Analyze the user's **mood** and **time available today**
- Pull relevant tasks from this week's goal plan
- Prioritize **high-focus tasks** earlier if user feels focused; defer or reduce if tired/stressed
- Include **recharge or light tasks** when the user has low energy
- Reward completed tasks with XP
- Add reflective feedback, streaks, and progress toward larger goal
- Output in time blocks with task name, emoji, AI feedback, and XP value

---

**User Mood:** ${moodDescription} ${mood}
**Daily Available Time:** ${availableTime}
**Weekly Plan:** ${JSON.stringify(currentWeek, null, 2)}

Return format as JSON:
{
  "schedule": {
    "date": "${today}",
    "mood": "${moodDescription} ${mood}",
    "availableTime": "${availableTime}",
    "tasks": [
      {
        "id": "task_1",
        "timeSlot": "3:00 PM - 3:30 PM",
        "taskType": "Focus Work",
        "emoji": "📚",
        "title": "Research fundamentals",
        "aiFeedback": "Perfect starter task for your current energy level",
        "xpEarned": 25
      }
    ],
    "streakStatus": "3 days",
    "totalXP": 75,
    "moodNote": "Schedule adapted for your current mood and energy"
  }
}

Adapt the schedule based on mood:
- Slightly Tired: Start with easier tasks, shorter focus blocks
- Energized: Include challenging tasks, longer focus sessions
- Stressed: Structure with clear breaks, calming activities
- Happy: Include creative and engaging work
- Neutral: Balanced mix of different task types
`;

    const response = await this.generateResponse(prompt);

    try {
      console.log("Raw daily schedule response from Llama:", response);

      let responseText = "";

      // Handle different response formats from Llama 3.1
      if (response.response) {
        responseText = response.response;
      } else if (
        response.choices &&
        response.choices[0] &&
        response.choices[0].text
      ) {
        responseText = response.choices[0].text;
      } else if (response.text) {
        responseText = response.text;
      } else if (typeof response === "string") {
        responseText = response;
      } else {
        throw new Error("Unknown response format from Llama");
      }

      console.log("Extracted daily schedule text:", responseText);

      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedJson = JSON.parse(jsonMatch[0]);
        console.log("Parsed daily schedule JSON:", parsedJson);
        return parsedJson;
      }

      // If no JSON found, try to parse the text content into our structure
      const parsedSchedule = this.parseTextToDailySchedule(
        responseText,
        mood,
        availableTime,
        currentWeek,
        today,
      );
      if (parsedSchedule) {
        console.log("Parsed text to schedule:", parsedSchedule);
        return parsedSchedule;
      }

      throw new Error("No valid JSON or parseable content found in response");
    } catch (parseError) {
      console.error("Failed to parse daily schedule response:", parseError);
      console.log("Falling back to offline schedule");
      // Fallback response
      return this.createFallbackDailySchedule(
        mood,
        availableTime,
        currentWeek,
        today,
      );
    }
  }

  getCurrentWeekFromPlan(plan) {
    // Determine current week based on plan start date or default to week 1
    const currentWeek = plan.weeks?.[0] || {
      weekNumber: 1,
      milestoneGoal: "Begin working on the goal",
      tasks: "Start with foundational work",
      estimatedTime: "Daily practice",
      focusLevel: "Medium",
      xpPotential: 50,
    };
    return currentWeek;
  }

  createFallbackDailySchedule(mood, availableTime, currentWeek, today) {
    const timeSlots = this.parseTimeSlots(availableTime);
    const tasks = this.createTasksFromWeek(currentWeek, mood, timeSlots);

    return {
      schedule: {
        date: today,
        mood: mood,
        availableTime: availableTime,
        tasks: tasks,
        streakStatus: "1 day",
        totalXP: tasks.reduce((sum, task) => sum + task.xpEarned, 0),
        moodNote:
          "Schedule created in offline mode, adapted for your energy level",
      },
    };
  }

  parseTimeSlots(availableTime) {
    // Simple parser for time ranges like "3 PM - 8 PM"
    const match = availableTime.match(/(\d+)\s*(AM|PM)\s*-\s*(\d+)\s*(AM|PM)/i);
    if (match) {
      return {
        start: `${match[1]} ${match[2]}`,
        end: `${match[3]} ${match[4]}`,
      };
    }
    return { start: "3 PM", end: "6 PM" };
  }

  parseTextToDailySchedule(
    responseText,
    mood,
    availableTime,
    currentWeek,
    today,
  ) {
    try {
      const tasks = [];
      let totalXP = 0;

      // Look for time-based task patterns
      const timeTaskPatterns = [
        /(\d{1,2}:\d{2}\s*(?:AM|PM)?)\s*[-–—]\s*(\d{1,2}:\d{2}\s*(?:AM|PM)?)\s*[:\s]*([^\n]+)/gi,
        /(\d{1,2}\s*(?:AM|PM))\s*[-–—]\s*(\d{1,2}\s*(?:AM|PM))\s*[:\s]*([^\n]+)/gi,
      ];

      let timeMatches = [];
      for (const pattern of timeTaskPatterns) {
        const matches = [...responseText.matchAll(pattern)];
        if (matches.length > 0) {
          timeMatches = matches;
          break;
        }
      }

      // Parse time-based tasks
      if (timeMatches.length > 0) {
        timeMatches.forEach((match, index) => {
          const startTime = match[1];
          const endTime = match[2];
          const taskDesc = match[3];

          // Extract XP if mentioned
          const xpMatch = taskDesc.match(/(\d+)\s*XP/i);
          const taskXP = xpMatch ? parseInt(xpMatch[1]) : 25 + index * 5;
          totalXP += taskXP;

          // Extract emoji if present
          const emojiMatch = taskDesc.match(/([🎯📚📝⚙️💡🔥📊🎨🧠💪])/);
          const emoji = emojiMatch
            ? emojiMatch[1]
            : ["📚", "🎯", "📝", "⚙️", "��"][index % 5];

          tasks.push({
            id: `task_${index + 1}`,
            timeSlot: `${startTime} - ${endTime}`,
            taskType: index === 0 ? "Focus Work" : "Practice",
            emoji: emoji,
            title: taskDesc
              .replace(/\d+\s*XP/i, "")
              .replace(/[🎯📚📝⚙️💡🔥📊🎨🧠💪]/g, "")
              .trim(),
            aiFeedback: `Task adapted for your ${mood} mood`,
            xpEarned: taskXP,
          });
        });
      } else {
        // Look for general task patterns
        const taskPatterns = [/[-��*]\s*([^\n]+)/g, /\d+\.\s*([^\n]+)/g];

        let taskList = [];
        for (const pattern of taskPatterns) {
          const matches = [...responseText.matchAll(pattern)];
          if (matches.length > 0) {
            taskList = matches.map((match) => match[1].trim());
            break;
          }
        }

        // Create time slots for tasks
        const timeSlots = this.parseTimeSlots(availableTime);
        const startHour = parseInt(timeSlots.start.match(/\d+/)[0]);
        const startPeriod = timeSlots.start.includes("PM") ? "PM" : "AM";

        taskList.forEach((taskDesc, index) => {
          const taskHour = startHour + index;
          const endHour = taskHour + 1;

          const xpMatch = taskDesc.match(/(\d+)\s*XP/i);
          const taskXP = xpMatch ? parseInt(xpMatch[1]) : 25 + index * 5;
          totalXP += taskXP;

          tasks.push({
            id: `task_${index + 1}`,
            timeSlot: `${taskHour}:00 ${startPeriod} - ${endHour}:00 ${startPeriod}`,
            taskType: index === 0 ? "Focus Work" : "Practice",
            emoji: ["📚", "🎯", "📝", "⚙��", "💡"][index % 5],
            title: taskDesc.replace(/\d+\s*XP/i, "").trim(),
            aiFeedback: `Task adapted for your ${mood} mood`,
            xpEarned: taskXP,
          });
        });
      }

      if (tasks.length === 0) {
        return null;
      }

      return {
        schedule: {
          date: today,
          mood: mood,
          availableTime: availableTime,
          tasks: tasks,
          streakStatus: "1 day",
          totalXP: totalXP || 75,
          moodNote:
            "Schedule parsed from AI response and adapted for your mood",
        },
      };
    } catch (error) {
      console.error("Error parsing text to daily schedule:", error);
      return null;
    }
  }

  createTasksFromWeek(currentWeek, mood, timeSlots) {
    const baseTasks = [
      {
        id: "task_1",
        timeSlot: `${timeSlots.start} - ${timeSlots.start.replace(/\d+/, (n) => parseInt(n) + 1)}`,
        taskType: "Focus Work",
        emoji: "📚",
        title: currentWeek.tasks?.split(",")[0] || "Work on goal",
        aiFeedback: "Good starting task for your current mood",
        xpEarned: Math.ceil(currentWeek.xpPotential / 3),
      },
    ];

    // Adapt based on mood
    if (mood === "😴") {
      // Tired
      baseTasks[0].aiFeedback =
        "Starting with something manageable for your energy level";
      baseTasks[0].xpEarned = Math.ceil(baseTasks[0].xpEarned * 0.8);
    } else if (mood === "🔥") {
      // Energized
      baseTasks.push({
        id: "task_2",
        timeSlot: `${timeSlots.start.replace(/\d+/, (n) => parseInt(n) + 1)} - ${timeSlots.start.replace(/\d+/, (n) => parseInt(n) + 2)}`,
        taskType: "Challenge",
        emoji: "🔥",
        title: "Advanced work session",
        aiFeedback: "Perfect for your high energy!",
        xpEarned: Math.ceil(currentWeek.xpPotential / 2),
      });
    }

    return baseTasks;
  }
}

export const llamaService = new LlamaService();
