import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Modal, ModalHeader, ModalContent } from "../components/ui/Modal";
import { joinEarlyAccess } from "../hooks/joinEarlyAccess";
import MoodMap from "../components/ui/MoodMap";
import LivePoll from "../components/ui/LivePoll";
import BrainDrop from "../components/ui/BrainDrop";
// import DiscoverButton from "../components/ui/DiscoverButton"; // Removed - showing content directly
import landingVideo from "../assets/landing-video.mp4";
import candaceWade from "../assets/testimonials/candace-wade.png";
import jasonHeikenfeld from "../assets/testimonials/jason-heikenfeld.png";
import samuelBaker from "../assets/testimonials/samuel-baker.png";
import williamHawkins from "../assets/testimonials/william-hawkins.png";

export default function TruFloLandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(true);
  const { notify } = joinEarlyAccess();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await notify(email);
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowWaitlistModal(false);
    setSubmitted(false);
    setEmail("");
  };

  const handleTryForFree = () => {
    navigate("/login");
  };

  // Removed handleRevealContent - content is now always visible

  const workflowSteps = [
    {
      step: "01",
      title: "Mood Detection",
      subtitle: "AI-Powered Emotional Intelligence",
      description:
        "Advanced algorithms analyze your emotional state through voice patterns, behavioral cues, and self-reported mood indicators to understand your current mental state.",
      features: [
        "Voice emotion analysis",
        "Behavioral pattern recognition",
        "Self-assessment integration",
        "Real-time mood tracking",
      ],
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
          <circle
            cx="12"
            cy="8"
            r="3"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            opacity="0.5"
          />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-400/30",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fbf75373d79e74250a299246f9eb8fd59%2F7014556a910a4df190cd775eb71f00ac?format=webp&width=800",
    },
    {
      step: "02",
      title: "Smart Adaptation",
      subtitle: "Dynamic Task Reshuffling",
      description:
        "Tasks are intelligently reorganized based on your current energy levels, focus capacity, and emotional readiness for optimal productivity.",
      features: [
        "Intelligent task prioritization",
        "Energy-based scheduling",
        "Focus capacity assessment",
        "Adaptive workflow management",
      ],
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12l2 2 4-4"
            opacity="0.6"
          />
        </svg>
      ),
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-400/30",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fbf75373d79e74250a299246f9eb8fd59%2F5ae257ebc40a4671b22c898bdb7730d6?format=webp&width=800",
    },
    {
      step: "03",
      title: "Gamification",
      subtitle: "Reward-Based Motivation",
      description:
        "Earn XP, unlock achievements, and compete with friends through a comprehensive gamification system that makes productivity engaging.",
      features: [
        "XP and achievement system",
        "Social leaderboards",
        "Challenge participation",
        "Progress celebrations",
      ],
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 6v6l4 2"
            opacity="0.5"
          />
        </svg>
      ),
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-400/30",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fbf75373d79e74250a299246f9eb8fd59%2Fec741848c89041d285f26f4859b22c2e?format=webp&width=800",
    },
    {
      step: "04",
      title: "Community",
      subtitle: "Social Accountability",
      description:
        "Connect with like-minded individuals, join challenges, and build accountability partnerships that keep you motivated and engaged.",
      features: [
        "Accountability partnerships",
        "Group challenges",
        "Community support",
        "Shared goal tracking",
      ],
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
        </svg>
      ),
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-500/10 to-teal-500/10",
      borderColor: "border-green-400/30",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fbf75373d79e74250a299246f9eb8fd59%2F0058a9902b30483e8f2c986e838efe9c",
    },
    {
      step: "05",
      title: "Analytics",
      subtitle: "Intelligent Insights",
      description:
        "Comprehensive analytics reveal patterns between your mood, productivity, and optimal working conditions for continuous improvement.",
      features: [
        "Mood-productivity correlations",
        "Performance analytics",
        "Optimization suggestions",
        "Progress tracking",
      ],
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 14l3-3 2 2 3-3"
            opacity="0.6"
          />
        </svg>
      ),
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-500/10 to-purple-500/10",
      borderColor: "border-indigo-400/30",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fbf75373d79e74250a299246f9eb8fd59%2Fd5f9149471a64433b57f0bce2f8b26bd?format=webp&width=800",
    },
  ];

  const stats = [
    { number: "94%", label: "Feel stuck in distractions" },
    { number: "74%", label: "Say existing solutions don't help" },
    { number: "84%", label: "Would try TruFlo" },
    {
      number: "67%",
      label: "Report improved focus with mood-based scheduling",
    },
    { number: "89%", label: "Complete more tasks when emotionally aligned" },
  ];

  const testimonials = [
    {
      name: "Candace Wade",
      position: "Program Manager, Center for Entrepreneurship",
      company: "University of Cincinnati",
      image: candaceWade,
      quote:
        "TruFlo’s mood-based gamification aligns with how real behavior change happens. It makes staying productive feel intuitive and genuinely rewarding.",
      linkedinUrl: "https://www.linkedin.com/in/candace-wade-44924a139/",
    },
    {
      name: "Jason Heikenfeld",
      position: "Professor of Engineering",
      company: "University of Cincinnati",
      image: jasonHeikenfeld,
      quote:
        "TruFlo’s emphasis on aligning work with emotional state is both novel and grounded in science. Its approach to time and energy management could be highly valuable in demanding professional environments.",
      linkedinUrl: "https://www.linkedin.com/in/jason-heikenfeld-2617551/",
    },
    {
      name: "Samuel Baker",
      position: "Program Director",
      company: "Flywheel Social Enterprise Hub",
      image: samuelBaker,
      quote:
        "I’ve battled with distractions too, and TruFlo feels like the key. I’m genuinely excited to see it become real.",
      linkedinUrl: "https://www.linkedin.com/in/samuelbaker091/",
    },
    {
      name: "William Hawkins",
      position: "Assistant Professor, Department of CS",
      company: "University of Cincinnati, CEAS",
      image: williamHawkins,
      quote:
        "TruFlo is approaching productivity in a way I haven’t seen before. The emotional intelligence built into its design sets it apart from anything else out there.",
      linkedinUrl: "https://www.linkedin.com/in/whh3/",
    },
  ];

  const comparisonData = [
    {
      category: "Core Technology",
      feature: "Mood-based task reshuffle",
      truflo: "Advanced AI Detection",
      others: "Not Available",
      trufloColor: "text-green-400",
      othersColor: "text-red-400",
    },
    {
      category: "Engagement",
      feature: "Creator-led challenges",
      truflo: "Weekly Challenges",
      others: "Limited Options",
      trufloColor: "text-green-400",
      othersColor: "text-yellow-400",
    },
    {
      category: "Gamification",
      feature: "Built-in community XP",
      truflo: "Comprehensive System",
      others: "Basic Points",
      trufloColor: "text-green-400",
      othersColor: "text-yellow-400",
    },
    {
      category: "Pricing",
      feature: "Affordable access",
      truflo: "Freemium + $4.99 Pro",
      others: "$7–15/mo subscriptions",
      trufloColor: "text-green-400",
      othersColor: "text-yellow-400",
    },
    {
      category: "Technology",
      feature: "Cross-device sync",
      truflo: "Real-time Sync",
      others: "Basic Sync",
      trufloColor: "text-green-400",
      othersColor: "text-yellow-400",
    },
  ];
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center mb-8">
                <div className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-white/20 backdrop-blur-sm">
                  <span className="text-white/90 text-sm font-medium font-ui">
                    The Future of Productivity is Here
                  </span>
                </div>
              </div>

              <div className="relative py-12">
                <h1 className="text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[15rem] font-black text-white mb-8 animate-fade-in drop-shadow-2xl font-heading leading-tight">
                  <span style={{ fontSize: "50px" }}>Unlock Your</span>{" "}
                  <span
                    className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                    style={{ fontSize: "50px" }}
                  >
                    Tru
                  </span>{" "}
                  <span style={{ fontSize: "50px" }}>Potential</span>
                </h1>

                <div className="mb-12 animate-slide-up">
                  <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-relaxed drop-shadow-lg font-heading max-w-7xl mx-auto">
                    <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                      TruFlo is the first productivity platform that understands
                      your emotional state and reshapes your day around it
                    </span>
                    <span className="text-white">
                      {" "}
                      — helping you take that first step, stay in flow, and
                      finally finish what matters.
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
                  <Button
                    variant="glass"
                    size="md"
                    onClick={() => setShowWaitlistModal(true)}
                    className="text-base px-6 py-3 shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Join Waitlist
                  </Button>
                  <Button
                    size="md"
                    onClick={handleTryForFree}
                    className="text-base px-6 py-3 shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Try for Free
                  </Button>
                  <Button
                    variant="glass"
                    size="md"
                    onClick={() =>
                      window.open(
                        "https://discord.gg/eZHfGJTRNh",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    className="text-base px-6 py-3 shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Join Discord
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Join Waitlist now moved to hero section */}
      {/* Main Content - Always visible */}
      <div id="main-content" className="animate-fade-in">
        {/* Interactive Widgets Row */}
        <section className="section-spacing-sm relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <MoodMap />
              <LivePoll />
              <BrainDrop />
            </div>
          </div>
        </section>

        {/* Emotional Introduction Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="glass-enhanced rounded-3xl p-12 md:p-16 lg:p-20 text-center shadow-2xl border-2 border-white/20 relative">
                <div className="space-y-10 text-white relative z-10">
                  <div className="space-y-8">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed drop-shadow-lg font-body">
                      Do you ever get that feeling—where you{" "}
                      <em className="italic font-bold text-purple-300">want</em>{" "}
                      to do something meaningful, productive, or even simple…
                    </p>

                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed drop-shadow-lg font-body">
                      but somehow, you just can't begin?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xl md:text-2xl font-light leading-relaxed text-white/90">
                    <div className="glass-card p-6 rounded-xl">
                      <div className="text-4xl mb-4">😴</div>
                      <p className="font-body">Maybe you're tired.</p>
                    </div>
                    <div className="glass-card p-6 rounded-xl">
                      <div className="text-4xl mb-4">📱</div>
                      <p className="font-body">Maybe you're distracted.</p>
                    </div>
                    <div className="glass-card p-6 rounded-xl">
                      <div className="text-4xl mb-4">⏰</div>
                      <p className="font-body">
                        Maybe you're telling yourself, "I'll start in five
                        minutes," and suddenly an hour's gone.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed">
                    <p className="font-body">It's not laziness.</p>
                    <p className="font-body">It's not a lack of ambition.</p>
                    <p className="font-body">
                      It's the{" "}
                      <em className="italic font-bold text-purple-300">
                        disconnect
                      </em>{" "}
                      between how you feel and what you want to do.
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-4 py-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent flex-1" />
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full flex items-center justify-center border-2 border-white/20 backdrop-blur-sm">
                        <span className="text-4xl animate-brain-pulse">🧠</span>
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent flex-1" />
                  </div>

                  <p
                    className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-purple-200 drop-shadow-lg font-body"
                    style={{ fontSize: "25px" }}
                  >
                    That's exactly what TruFlo is here to solve.
                  </p>

                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-lg max-w-5xl mx-auto font-body mt-12">
                    TruFlo is a{" "}
                    <span className="font-bold text-purple-300">
                      next-gen productivity platform
                    </span>{" "}
                    that blends emotion AI, gamified XP, and creator-led
                    challenges to keep 16- to 35-year-olds locked into deep
                    work—without resorting to will-power alone. Where
                    traditional apps nag,{" "}
                    <span className="font-bold text-blue-300">
                      TruFlo adapts
                    </span>
                    : detecting how you feel and serving the task you're most
                    likely to crush right now!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How TruFlo Works - Completely Redesigned */}
        <section className="bg-gradient-to-b from-transparent via-black/10 to-transparent relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="relative">
                <div className="relative z-10 py-8">
                  <p
                    className="text-xl text-white/90 drop-shadow-lg max-w-5xl mx-auto font-body text-center"
                    style={{ maxWidth: "1138px" }}
                  >
                    Experience the revolutionary&nbsp;
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
                      5-step process
                    </span>{" "}
                    that transforms your productivity through{" "}
                    <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                      intelligent mood recognition
                    </span>{" "}
                    and adaptive task management.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-16">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  {/* Content Side */}
                  <div
                    className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/10 backdrop-blur-sm relative overflow-hidden`}
                      >
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>

                        {/* Icon container with better styling */}
                        <div className="relative z-10 text-white drop-shadow-lg">
                          {step.icon}
                        </div>

                        {/* Floating particles effect */}
                        <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                        <div
                          className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse"
                          style={{ animationDelay: "1s" }}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white/60 uppercase tracking-wider mb-1 font-ui">
                          Step {step.step}
                        </div>
                        <h3 className="text-3xl font-bold text-white font-heading">
                          {step.title}
                        </h3>
                        <p className="text-lg text-white/80 font-body">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-lg text-white/90 leading-relaxed font-body">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {step.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3 p-3 glass-card rounded-lg"
                        >
                          <div
                            className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full`}
                          ></div>
                          <span className="text-white/90 text-sm font-medium font-body">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        {workflowSteps.map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              i <= index
                                ? `bg-gradient-to-r ${step.color}`
                                : "bg-white/20"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white/60 text-sm font-ui">
                        {index + 1} of {workflowSteps.length}
                      </span>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div
                      className={`relative glass-enhanced rounded-3xl border-2 ${step.borderColor} bg-gradient-to-br ${step.bgColor} shadow-2xl overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

                      {/* Step Image */}
                      <div className="relative z-10">
                        <div className="aspect-video w-full">
                          <img
                            src={step.image}
                            alt={`${step.title} - ${step.subtitle}`}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center max-w-6xl mx-auto">
              <div className="relative">
                <div className="relative z-10 py-8">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed drop-shadow-2xl font-heading">
                    From initial mood detection to continuous learning, TruFlo
                    creates a{" "}
                    <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                      personalized productivity ecosystem
                    </span>{" "}
                    that evolves with you, maximizing your potential while
                    respecting your emotional well-being.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Redesigned */}
        <section
          className="relative overflow-hidden"
          style={{ paddingBottom: "128px" }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0" style={{ top: "90px" }}>
            <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
            <div
              className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="relative">
                <div className="relative z-10 py-8">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 drop-shadow-2xl font-heading leading-tight">
                    Trusted by{" "}
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                      Industry Leaders
                    </span>
                  </h2>

                  <p
                    className="text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-4xl mx-auto font-body leading-relaxed"
                    style={{ maxWidth: "1121px" }}
                  >
                    See what{" "}
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-bold">
                      thought leaders and innovators
                    </span>{" "}
                    are saying about TruFlo's revolutionary approach to
                    productivity.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="group h-full">
                    <div className="relative h-full bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 rounded-3xl border border-yellow-400/20 shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 overflow-hidden">
                      {/* Decorative corner elements */}
                      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-br-full"></div>
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-yellow-400/10 to-transparent rounded-tl-full"></div>

                      {/* Golden accent line */}
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>

                      <div className="relative z-10 p-8 h-full flex flex-col">
                        {/* Elegant Quote Section - Now Primary */}
                        <div className="flex-1 flex flex-col justify-center relative mb-6">
                          {/* Stylized Quote Marks */}
                          <div className="absolute -top-4 -left-2 text-6xl text-yellow-400/30 font-serif leading-none select-none">
                            “
                          </div>
                          <div className="absolute -bottom-4 -right-2 text-6xl text-yellow-400/30 font-serif leading-none select-none">
                            ”
                          </div>

                          {/* Quote Text */}
                          <blockquote className="text-white/95 text-lg md:text-xl leading-relaxed font-body italic text-center px-6 py-8 relative z-10">
                            {testimonial.quote}
                          </blockquote>
                        </div>

                        {/* Attribution Section */}
                        <div className="border-t border-yellow-400/20 pt-6 mt-auto">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400/40 shadow-lg"
                                />
                                {/* Subtle glow effect */}
                                <div className="absolute inset-0 rounded-full ring-2 ring-yellow-400/20 ring-offset-2 ring-offset-transparent"></div>
                              </div>
                              <div className="text-left">
                                <h3 className="text-white font-bold text-lg font-heading flex items-center">
                                  {testimonial.name}
                                  {testimonial.linkedinUrl && (
                                    <a
                                      href={testimonial.linkedinUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                      title={`View ${testimonial.name}'s LinkedIn profile`}
                                    >
                                      <sup className="text-sm">↗</sup>
                                    </a>
                                  )}
                                </h3>
                                <p className="text-yellow-400/90 text-sm font-medium font-ui">
                                  {testimonial.position}
                                </p>
                                <p className="text-white/60 text-xs font-ui">
                                  {testimonial.company}
                                </p>
                              </div>
                            </div>

                            {/* Elegant accent */}
                            <div className="flex flex-col items-center opacity-30">
                              <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-transparent rounded-full"></div>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-20">
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-white/80 font-body mb-6">
                  Join these industry leaders in revolutionizing productivity
                </p>
                <div className="flex justify-center">
                  <div className="px-6 py-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-full border border-yellow-400/30 backdrop-blur-sm">
                    <span className="text-yellow-300 text-sm font-medium font-ui">
                      ✨ Be part of the productivity revolution
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* You're Not Lazy Section - Redesigned with Colorful Text */}
        <section id="about" className="section-spacing relative">
          {/* Dark overlay for problem section */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="glass-enhanced rounded-3xl p-12 md:p-16 lg:p-20 text-center shadow-2xl border-2 border-white/20 relative">
                {/* Additional dark background for text content */}
                <div className="absolute inset-0 bg-black/25 rounded-3xl blur-xl"></div>

                <div className="space-y-12 relative z-10">
                  {/* Main Heading with Colorful Text */}
                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl font-heading">
                      <span className="text-white">You're not </span>
                      <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                        lazy
                      </span>
                      <span className="text-white">.</span>
                      <br />
                      <span className="text-white">You're </span>
                      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                        overwhelmed
                      </span>
                      <span className="text-white">.</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-4xl mx-auto font-body">
                      Traditional productivity apps ignore the most important
                      factor:
                      <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {" "}
                        how you feel
                      </span>
                      .
                    </p>
                  </div>

                  {/* Problem Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="group">
                      <Card className="p-8 hover glass-enhanced shadow-xl h-full border-2 border-red-400/20 hover:border-red-400/40 transition-all duration-300">
                        <div className="text-center space-y-6">
                          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center border-2 border-red-400/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-4xl drop-shadow-md">📉</span>
                          </div>
                          <h3 className="text-xl font-bold drop-shadow-md font-heading">
                            <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                              Task Abandonment
                            </span>
                          </h3>
                          <p className="text-white/80 drop-shadow-sm font-body leading-relaxed">
                            You start with good intentions but lose motivation
                            halfway through.
                          </p>
                        </div>
                      </Card>
                    </div>

                    <div className="group">
                      <Card className="p-8 hover glass-enhanced shadow-xl h-full border-2 border-orange-400/20 hover:border-orange-400/40 transition-all duration-300">
                        <div className="text-center space-y-6">
                          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full flex items-center justify-center border-2 border-orange-400/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-4xl drop-shadow-md">😞</span>
                          </div>
                          <h3 className="text-xl font-bold drop-shadow-md font-heading">
                            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                              Guilt from Time-Wasting
                            </span>
                          </h3>
                          <p className="text-white/80 drop-shadow-sm font-body leading-relaxed">
                            You know you're procrastinating but can't seem to
                            stop.
                          </p>
                        </div>
                      </Card>
                    </div>

                    <div className="group">
                      <Card className="p-8 hover glass-enhanced shadow-xl h-full border-2 border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                        <div className="text-center space-y-6">
                          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-full flex items-center justify-center border-2 border-yellow-400/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-4xl drop-shadow-md">🔄</span>
                          </div>
                          <h3 className="text-xl font-bold drop-shadow-md font-heading">
                            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                              Confusion Around Priorities
                            </span>
                          </h3>
                          <p className="text-white/80 drop-shadow-sm font-body leading-relaxed">
                            Everything feels urgent, but nothing feels
                            important.
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Solution Statement */}
                  <div className="mt-16 space-y-6">
                    <div className="flex items-center justify-center space-x-4 py-8">
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent flex-1" />
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full flex items-center justify-center border-2 border-white/20 backdrop-blur-sm">
                          <span className="text-3xl animate-brain-pulse">
                            💡
                          </span>
                        </div>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent flex-1" />
                    </div>

                    <p className="text-2xl md:text-3xl font-bold leading-relaxed drop-shadow-lg font-heading">
                      <span className="text-white">That's why </span>
                      <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        TruFlo adapts to your emotions
                      </span>
                      <span className="text-white">
                        , not the other way around.
                      </span>
                    </p>
                  </div>

                  {/* Video Demo */}
                  <div className="mt-12">
                    <Card className="p-4 glass-enhanced shadow-2xl max-w-2xl mx-auto">
                      <video
                        src={landingVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="rounded-lg w-full shadow-lg"
                      />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-spacing-sm relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="relative">
                <div className="relative z-10 py-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
                    The Numbers Don't Lie
                  </h2>
                  <p className="text-lg text-white/80 font-body">
                    Research shows the productivity crisis is real
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 animate-fade-in glass-enhanced shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 drop-shadow-lg font-ui">
                    {stat.number}
                  </div>
                  <p className="text-white/90 drop-shadow-md font-body text-sm leading-relaxed">
                    {stat.label}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Competitive Edge Section - Professional Table */}
        <section className="relative" style={{ paddingBottom: "128px" }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="relative">
                <div className="relative z-10 py-8">
                  <h2
                    className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl font-heading"
                    style={{ fontSize: "34px" }}
                  >
                    Competitive Edge
                  </h2>
                  <p
                    className="text-xl text-white/90 drop-shadow-lg mb-8 font-body"
                    style={{ paddingTop: "17px" }}
                  >
                    TruFlo is the first platform that starts a productivity
                    session based on how you feel at that moment—no one else
                    does that.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="glass-enhanced rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-b border-white/20 p-8">
                  <div className="grid grid-cols-4 gap-6 items-center">
                    <div className="col-span-2">
                      <h3 className="text-xl font-bold text-white font-heading">
                        Feature Comparison
                      </h3>
                      <p className="text-white/70 text-sm mt-1 font-body">
                        See how TruFlo stacks up against traditional
                        productivity apps
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 px-4 py-2 rounded-full border border-white/20">
                        <span className="text-2xl">🚀</span>
                        <span className="font-bold text-white font-ui">
                          TruFlo
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                        <span className="text-2xl">📱</span>
                        <span className="font-medium text-white/70 font-ui">
                          Others
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-white/10">
                  {comparisonData.map((row, index) => (
                    <div
                      key={index}
                      className="p-6 hover:bg-white/5 transition-all duration-300 group"
                    >
                      <div className="grid grid-cols-4 gap-6 items-center">
                        {/* Category & Feature */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-white/10 to-white/5 rounded-lg flex items-center justify-center border border-white/20 group-hover:border-white/30 transition-colors">
                              <span className="text-lg font-bold text-white/70 font-ui">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1 font-ui">
                                {row.category}
                              </div>
                              <div className="text-white font-semibold font-body">
                                {row.feature}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* TruFlo Column */}
                        <div className="text-center">
                          <div
                            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 ${row.trufloColor}`}
                          >
                            <span className="font-semibold font-ui">
                              {row.truflo}
                            </span>
                          </div>
                        </div>

                        {/* Others Column */}
                        <div className="text-center">
                          <div
                            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/20 ${row.othersColor}`}
                          >
                            <span className="font-semibold font-ui">
                              {row.others}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table Footer */}
                <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border-t border-white/20 p-6">
                  <div className="text-center">
                    <p className="text-white/90 font-medium font-body">
                      <span className="text-green-400 font-bold">
                        TruFlo leads!
                      </span>{" "}
                      in every category that matters for modern productivity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section-spacing relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="glass-enhanced rounded-3xl p-12 md:p-16 border-2 border-white/20 relative">
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full border-2 border-white/30 mb-8 shadow-xl">
                    <span className="text-5xl">✨</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl font-heading">
                    Ready to Transform Your Productivity?
                  </h2>
                  <p className="text-xl text-white/90 mb-8 drop-shadow-lg font-body">
                    Join thousands of others who are already building better
                    habits with TruFlo.
                  </p>
                  <p className="text-lg text-white/70 mb-8 font-body">
                    The future of productivity is here. Are you ready to unlock
                    your true potential?
                  </p>

                  {/* Join Waitlist Form */}
                  <div className="max-w-md mx-auto">
                    <form
                      onSubmit={handleEmailSubmit}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 backdrop-blur-sm font-body"
                        required
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transform hover:scale-105 transition-all duration-300 shadow-xl font-ui"
                      >
                        {isSubmitting ? "Joining..." : "Join Waitlist"}
                      </button>
                    </form>

                    {submitted && (
                      <div className="mt-4 p-3 bg-green-500/20 border border-green-400/30 rounded-lg text-center">
                        <p className="text-green-300 font-medium font-body text-sm">
                          🎉 You're on the list! We'll notify you as soon as
                          TruFlo is available.
                        </p>
                      </div>
                    )}

                    <div className="mt-3 text-center">
                      <p className="text-white/60 text-xs font-body">
                        Join others who are already on the waitlist. No spam,
                        just updates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Waitlist Modal */}
      <Modal isOpen={showWaitlistModal} onClose={handleCloseModal}>
        <Card className="glass-enhanced shadow-2xl border-emerald-400/30">
          <ModalHeader onClose={handleCloseModal}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full flex items-center justify-center border-2 border-emerald-400/30">
                <span className="text-xl">📧</span>
              </div>
              <h3 className="text-xl font-semibold text-white drop-shadow-md font-heading">
                Join the Waitlist
              </h3>
            </div>
          </ModalHeader>

          <ModalContent>
            {submitted ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center border-2 border-emerald-400/30 mb-4">
                  <span className="text-4xl">🎉</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 font-heading">
                  You're on the list!
                </h4>
                <p className="text-white/80 mb-6 font-body">
                  Thank you for joining our waitlist. You'll be among the first
                  to know when TruFlo launches.
                </p>
                <Button
                  onClick={handleCloseModal}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  Close
                </Button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center border-2 border-emerald-400/30 mb-4">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <p className="text-white/80 font-body">
                    Be the first to experience mood-aware productivity. We'll
                    notify you as soon as TruFlo is available.
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleCloseModal}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    >
                      Join Waitlist
                    </Button>
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-white/60 font-body">
                    Join others who are already on the waitlist
                  </p>
                  <p className="text-xs text-white/60 font-body">
                    No spam, just updates about TruFlo
                  </p>
                </div>
              </div>
            )}
          </ModalContent>
        </Card>
      </Modal>
    </div>
  );
}
