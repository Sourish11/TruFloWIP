import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Modal, ModalHeader, ModalContent } from '../components/ui/Modal';
import { joinEarlyAccess } from '../hooks/joinEarlyAccess';
import MoodMap from '../components/ui/MoodMap';
import LivePoll from '../components/ui/LivePoll';
import BrainDrop from '../components/ui/BrainDrop';
import landingVideo from '../assets/landing-video.mp4';
import candaceWade from '../assets/testimonials/candace-wade.png';
import jasonHeikenfeld from '../assets/testimonials/jason-heikenfeld.png';
import samuelBaker from '../assets/testimonials/samuel-baker.png';
import williamHawkins from '../assets/testimonials/william-hawkins.png';

export default function TruFloLandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(false);
  const { notify } = joinEarlyAccess();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await notify(email);
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowWaitlistModal(false);
    setSubmitted(false);
    setEmail('');
  };

  const handleTryForFree = () => {
    navigate('/login');
  };

  const handleRevealContent = () => {
    setContentRevealed(true);
    // Smooth scroll to the revealed content
    setTimeout(() => {
      const revealedSection = document.getElementById('revealed-content');
      if (revealedSection) {
        revealedSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const workflowSteps = [
    {
      step: '01',
      title: 'Mood Detection',
      subtitle: 'AI-Powered Emotional Intelligence',
      description: 'Advanced algorithms analyze your emotional state through voice patterns, behavioral cues, and self-reported mood indicators to understand your current mental state.',
      features: ['Voice emotion analysis', 'Behavioral pattern recognition', 'Self-assessment integration', 'Real-time mood tracking'],
      icon: '🧠',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-400/30'
    },
    {
      step: '02',
      title: 'Smart Adaptation',
      subtitle: 'Dynamic Task Reshuffling',
      description: 'Tasks are intelligently reorganized based on your current energy levels, focus capacity, and emotional readiness for optimal productivity.',
      features: ['Intelligent task prioritization', 'Energy-based scheduling', 'Focus capacity assessment', 'Adaptive workflow management'],
      icon: '⚡',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-400/30'
    },
    {
      step: '03',
      title: 'Gamification',
      subtitle: 'Reward-Based Motivation',
      description: 'Earn XP, unlock achievements, and compete with friends through a comprehensive gamification system that makes productivity engaging.',
      features: ['XP and achievement system', 'Social leaderboards', 'Challenge participation', 'Progress celebrations'],
      icon: '🏆',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10',
      borderColor: 'border-yellow-400/30'
    },
    {
      step: '04',
      title: 'Community',
      subtitle: 'Social Accountability',
      description: 'Connect with like-minded individuals, join challenges, and build accountability partnerships that keep you motivated and engaged.',
      features: ['Accountability partnerships', 'Group challenges', 'Community support', 'Shared goal tracking'],
      icon: '👥',
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-500/10 to-teal-500/10',
      borderColor: 'border-green-400/30'
    },
    {
      step: '05',
      title: 'Analytics',
      subtitle: 'Intelligent Insights',
      description: 'Comprehensive analytics reveal patterns between your mood, productivity, and optimal working conditions for continuous improvement.',
      features: ['Mood-productivity correlations', 'Performance analytics', 'Optimization suggestions', 'Progress tracking'],
      icon: '📊',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-500/10 to-purple-500/10',
      borderColor: 'border-indigo-400/30'
    }
  ];

  const stats = [
    { number: '94%', label: 'Feel stuck in distractions' },
    { number: '74%', label: 'Say existing solutions don\'t help' },
    { number: '84%', label: 'Would try TruFlo' },
    { number: '67%', label: 'Report improved focus with mood-based scheduling' },
    { number: '89%', label: 'Complete more tasks when emotionally aligned' }
  ];

  const testimonials = [
    {
      name: 'Candace Wade',
      position: 'Program Manager, Center for Entrepreneurship',
      company: 'University of Cincinnati (1819 Innovation Hub / CEAS Venture Lab & Center for Entrepreneurship)',
      image: candaceWade,
      quote: 'TruFlo’s mood-based gamification aligns with how real behavior change happens. It makes staying productive feel intuitive and genuinely rewarding.',
      credentials: 'Manages and designs entrepreneurial programs, events, and student initiatives; supports STEM commercialization',
    },
    {
      name: 'Jason Heikenfeld',
      position: 'Professor of Engineering',
      company: 'University of Cincinnati',
      image: jasonHeikenfeld,
      quote: 'TruFlo’s emphasis on aligning work with emotional state is both novel and grounded in science. Its approach to time and energy management could be highly valuable in demanding professional environments.',
      credentials: 'A Serial Entreprenur, Fellow of the National Academy of Inventors; over 50 patents and recognized leadership in wearable biosensors, flexible electronics, electrowetting and optoelectronics research',
    },
    {
      name: 'Samuel Baker',
      position: 'Program Director',
      company: ' Flywheel Social Enterprise Hub',
      image: samuelBaker,
      quote: 'I’ve battled with distractions too, and TruFlo feels like the key. I’m genuinely excited to see it become real.',
      credentials: 'Award-winning creative director, Founded 3 successful startups, TEDx speaker',
    },
    {
      name: 'William Hawkins',
      position: 'Assistant Professor, Department of CS',
      company: 'University of Cincinnati, CEAS',
      image: williamHawkins,
      quote: 'TruFlo is approaching productivity in a way I haven’t seen before. The emotional intelligence built into its design sets it apart from anything else out there.',
      credentials: ' PhD in Computer Science, focused on static binary rewriting for software security; multiple peer‑reviewed publications in software security and binary transformation techniquesPhD in Materials Science, 100+ peer-reviewed publications, Industry innovation award winner',
    }
  ];

  const comparisonData = [
    {
      category: 'Core Technology',
      feature: 'Mood-based task reshuffle',
      truflo: 'Advanced AI Detection',
      others: 'Not Available',
      trufloColor: 'text-green-400',
      othersColor: 'text-red-400',
    },
    {
      category: 'Engagement',
      feature: 'Creator-led challenges',
      truflo: 'Weekly Challenges',
      others: 'Limited Options',
      trufloColor: 'text-green-400',
      othersColor: 'text-yellow-400',
    },
    {
      category: 'Gamification',
      feature: 'Built-in community XP',
      truflo: 'Comprehensive System',
      others: 'Basic Points',
      trufloColor: 'text-green-400',
      othersColor: 'text-yellow-400',
    },
    {
      category: 'Pricing',
      feature: 'Affordable access',
      truflo: 'Freemium + $4.99 Pro',
      others: '$7–15/mo subscriptions',
      trufloColor: 'text-green-400',
      othersColor: 'text-yellow-400',
    },
    {
      category: 'Technology',
      feature: 'Cross-device sync',
      truflo: 'Real-time Sync',
      others: 'Basic Sync',
      trufloColor: 'text-green-400',
      othersColor: 'text-yellow-400',
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
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
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 animate-fade-in drop-shadow-2xl font-heading leading-tight">
                  Unlock Your{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Tru
                  </span>{' '}
                  Potential
                </h1>
                
                <div className="mb-12 animate-slide-up">
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed drop-shadow-lg font-heading max-w-5xl mx-auto">
                    <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                      TruFlo is the first productivity platform that understands your emotional state and reshapes your day around it
                    </span>
                    <span className="text-white"> — helping you take that first step, stay in flow, and finally finish what matters.</span>
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
                  <Button
                    size="md"
                    onClick={() => window.open('https://discord.gg/eZHfGJTRNh', '_blank', 'noopener,noreferrer')}
                    className="text-base px-6 py-3 shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Join Discord
                  </Button>
                  <Button
                    variant="glass"
                    size="md"
                    onClick={handleTryForFree}
                    className="text-base px-6 py-3 shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Try for Free
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Reveal Overlay - Redesigned */}
      {!contentRevealed && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/90 backdrop-blur-sm z-20 pointer-events-none" />
          
          <div className="relative z-30 flex justify-center py-20">
            <div className="max-w-2xl mx-auto px-4">
              <button
                onClick={handleRevealContent}
                className="group discover-power-section w-full"
              >
                <div className="discover-icon-container">
                  <div className="discover-pulse-ring"></div>
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    ⚡
                  </div>
                </div>
                
                <div className="text-center space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-heading">
                    Discover TruFlo's Power
                  </h2>
                  
                  <p className="text-lg md:text-xl text-white/80 font-body leading-relaxed max-w-lg mx-auto">
                    Experience the revolutionary technology that's transforming how people approach productivity and personal growth.
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4 pt-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent flex-1 max-w-20"></div>
                    <div className="discover-arrow">
                      <svg 
                        className="w-8 h-8 text-white/90 group-hover:text-white transition-all duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={3} 
                          d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                        />
                      </svg>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent flex-1 max-w-20"></div>
                  </div>
                  
                  <div className="text-sm text-white/60 font-ui">
                    Click to explore the future of productivity
                  </div>
                </div>
              </button>

              {/* Join Waitlist Section - No Border Box */}
              <div className="join-waitlist-section">
                <form onSubmit={handleEmailSubmit} className="join-waitlist-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="join-waitlist-input font-body"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="join-waitlist-button font-ui"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>

                {submitted && (
                  <div className="mt-4 p-3 bg-green-500/20 border border-green-400/30 rounded-lg text-center">
                    <p className="text-green-300 font-medium font-body text-sm">
                      🎉 You're on the list! We'll notify you as soon as TruFlo is available.
                    </p>
                  </div>
                )}

                <div className="mt-3 text-center">
                  <p className="text-white/60 text-xs font-body">
                    Join 10,000+ people already on the waitlist. No spam, just updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revealed Content */}
      {contentRevealed && (
        <div id="revealed-content" className="animate-fade-in">
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
                        Do you ever get that feeling—where you <em className="italic font-bold text-purple-300">want</em> to do something meaningful, productive, or even simple…
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
                        <p className="font-body">Maybe you're telling yourself, "I'll start in five minutes," and suddenly an hour's gone.</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6 text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed">
                      <p className="font-body">It's not laziness.</p>
                      <p className="font-body">It's not a lack of ambition.</p>
                      <p className="font-body">It's the <em className="italic font-bold text-purple-300">disconnect</em> between how you feel and what you want to do.</p>
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
                    
                    <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-purple-200 drop-shadow-lg font-body">
                      That's exactly what TruFlo is here to solve.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What is TruFlo Section */}
          <section className="section-spacing relative">
            <div className="container mx-auto px-4 relative z-10">
              <div className="glass-enhanced rounded-3xl p-12 max-w-6xl mx-auto border-2 border-white/20 relative">
                <div className="text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full border-2 border-white/30 mb-8 shadow-xl">
                    <span className="text-5xl">🎯</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-2xl font-heading">
                    What is TruFlo?
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-lg max-w-5xl mx-auto font-body">
                    TruFlo is a <span className="font-bold text-purple-300">next-gen productivity platform</span> that blends emotion AI, gamified XP, and creator-led challenges to keep 16- to 35-year-olds locked into deep work—without resorting to will-power alone. Where traditional apps nag, <span className="font-bold text-blue-300">TruFlo adapts</span>: detecting how you feel and serving the task you're most likely to crush right now!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How TruFlo Works - Completely Redesigned */}
          <section className="section-spacing bg-gradient-to-b from-transparent via-black/10 to-transparent relative">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-20">
                <div className="relative">
                  <div className="relative z-10 py-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-2xl font-heading">
                      How TruFlo Works
                    </h2>
                    <p className="text-xl text-white/90 drop-shadow-lg max-w-4xl mx-auto font-body">
                      Experience the revolutionary 5-step process that transforms your productivity through intelligent mood recognition and adaptive task management.
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto space-y-16">
                {workflowSteps.map((step, index) => (
                  <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Content Side */}
                    <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/20`}>
                          <span className="text-3xl">{step.icon}</span>
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
                          <div key={featureIndex} className="flex items-center space-x-3 p-3 glass-card rounded-lg">
                            <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full`}></div>
                            <span className="text-white/90 text-sm font-medium font-body">{feature}</span>
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
                                  : 'bg-white/20'
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
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className={`relative p-8 glass-enhanced rounded-3xl border-2 ${step.borderColor} bg-gradient-to-br ${step.bgColor} shadow-2xl`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                        
                        {/* Large icon display */}
                        <div className="relative z-10 text-center">
                          <div className={`w-32 h-32 mx-auto bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 mb-6`}>
                            <span className="text-6xl">{step.icon}</span>
                          </div>
                          
                          {/* Animated elements */}
                          <div className="space-y-4">
                            <div className={`h-2 bg-gradient-to-r ${step.color} rounded-full opacity-60`}></div>
                            <div className={`h-2 bg-gradient-to-r ${step.color} rounded-full opacity-40 w-3/4 mx-auto`}></div>
                            <div className={`h-2 bg-gradient-to-r ${step.color} rounded-full opacity-20 w-1/2 mx-auto`}></div>
                          </div>
                          
                          {/* Step number overlay */}
                          <div className="absolute -top-4 -right-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-xl border-2 border-white/30`}>
                              <span className="text-white font-bold text-lg font-ui">{step.step}</span>
                            </div>
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
                      From initial mood detection to continuous learning, TruFlo creates a{' '}
                      <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">personalized productivity ecosystem</span>{' '}
                      that evolves with you, maximizing your potential while respecting your emotional well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="section-spacing relative">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="relative">
                  <div className="relative z-10 py-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-full border-2 border-white/30 mb-8 shadow-xl">
                      <span className="text-5xl">🌟</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl font-heading">
                      Trusted by Industry Leaders
                    </h2>
                    <p className="text-xl text-white/90 drop-shadow-lg font-body">
                      See what thought leaders and innovators are saying about TruFlo's revolutionary approach to productivity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="glass-enhanced shadow-xl hover:scale-[1.02] transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6 mb-6">
                        <div className="flex-shrink-0">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-white/20 shadow-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-md font-heading">
                            {testimonial.name}
                          </h3>
                          <p className="text-white/80 text-sm mb-2 drop-shadow-sm font-ui">
                            {testimonial.position}
                          </p>
                          <p className="text-white/70 text-sm drop-shadow-sm font-ui">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      
                      <blockquote className="text-white/90 text-lg italic mb-6 drop-shadow-sm leading-relaxed font-body">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <h4 className="text-sm font-semibold text-white/90 mb-2 drop-shadow-sm font-ui">
                            Credentials & Achievements
                          </h4>
                          <p className="text-white/70 text-sm drop-shadow-sm font-body">
                            {testimonial.credentials}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                        Traditional productivity apps ignore the most important factor: 
                        <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> how you feel</span>.
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
                              You start with good intentions but lose motivation halfway through.
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
                              You know you're procrastinating but can't seem to stop.
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
                              Everything feels urgent, but nothing feels important.
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
                            <span className="text-3xl animate-brain-pulse">💡</span>
                          </div>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent flex-1" />
                      </div>
                      
                      <p className="text-2xl md:text-3xl font-bold leading-relaxed drop-shadow-lg font-heading">
                        <span className="text-white">That's why </span>
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          TruFlo adapts to your emotions
                        </span>
                        <span className="text-white">, not the other way around.</span>
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
                  <Card key={index} className="p-6 animate-fade-in glass-enhanced shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 drop-shadow-lg font-ui">
                      {stat.number}
                    </div>
                    <p className="text-white/90 drop-shadow-md font-body text-sm leading-relaxed">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Competitive Edge Section - Professional Table */}
          <section className="section-spacing relative">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="relative">
                  <div className="relative z-10 py-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500/30 to-teal-500/30 rounded-full border-2 border-white/30 mb-8 shadow-xl">
                      <span className="text-5xl">🚀</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl font-heading">
                      Competitive Edge
                    </h2>
                    <p className="text-xl text-white/90 drop-shadow-lg mb-8 font-body">
                      TruFlo is the first platform that starts a productivity session based on how you feel at that moment—no one else does that.
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
                          See how TruFlo stacks up against traditional productivity apps
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 px-4 py-2 rounded-full border border-white/20">
                          <span className="text-2xl">🚀</span>
                          <span className="font-bold text-white font-ui">TruFlo</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                          <span className="text-2xl">📱</span>
                          <span className="font-medium text-white/70 font-ui">Others</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-white/10">
                    {comparisonData.map((row, index) => (
                      <div key={index} className="p-6 hover:bg-white/5 transition-all duration-300 group">
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
                            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 ${row.trufloColor}`}>
                              <span className="text-lg">{row.trufloIcon}</span>
                              <span className="font-semibold font-ui">{row.truflo}</span>
                            </div>
                          </div>

                          {/* Others Column */}
                          <div className="text-center">
                            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/20 ${row.othersColor}`}>
                              <span className="text-lg">{row.othersIcon}</span>
                              <span className="font-semibold font-ui">{row.others}</span>
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
                        <span className="text-green-400 font-bold">✅ TruFlo leads</span> in every category that matters for modern productivity
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
                      Join thousands of others who are already building better habits with TruFlo.
                    </p>
                    <p className="text-lg text-white/70 font-body">
                      The future of productivity is here. Are you ready to unlock your true potential?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Waitlist Modal */}
      <Modal isOpen={showWaitlistModal} onClose={handleCloseModal}>
        <Card className="glass-enhanced shadow-2xl border-white/30">
          <ModalHeader onClose={handleCloseModal}>
            <h3 className="text-xl font-semibold text-white drop-shadow-md font-heading">
              Join the Waitlist
            </h3>
          </ModalHeader>
          
          <ModalContent>
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-green-400 mb-4 text-4xl drop-shadow-md">✓</div>
                <h4 className="text-lg font-semibold text-white mb-2 font-heading">You're on the list!</h4>
                <p className="text-white/80 mb-6 font-body">
                  Thank you for joining our waitlist. You'll be among the first to know when TruFlo launches.
                </p>
                <Button
                  onClick={handleCloseModal}
                  variant="glass"
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-white/80 mb-6 text-center font-body">
                  Be the first to experience mood-aware productivity. We'll notify you as soon as TruFlo is available.
                </p>
                
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
                      className="flex-1"
                    >
                      Join Waitlist
                    </Button>
                  </div>
                </form>
                
                <p className="text-xs text-white/60 text-center mt-4 font-body">
                  We respect your privacy. No spam, just updates about TruFlo.
                </p>
              </div>
            )}
          </ModalContent>
        </Card>
      </Modal>
    </div>
  );
}