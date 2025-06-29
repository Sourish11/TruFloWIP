import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Modal, ModalHeader, ModalContent } from '../components/ui/Modal';
import { joinEarlyAccess } from '../hooks/joinEarlyAccess';
import UnlockButton from '../components/ui/UnlockButton';
import MoodMap from '../components/ui/MoodMap';
import LiveXPCounter from '../components/ui/LiveXPCounter';
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
  const [showExtraTestimonials, setShowExtraTestimonials] = useState(false);
  const [showExtraStats, setShowExtraStats] = useState(false);
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

  const handleGetEarlyAccess = () => {
    setShowWaitlistModal(true);
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
      step: 'Smart Planning',
      title: 'Mood-Based Scheduling',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Tasks are intelligently scheduled based on your current emotional energy levels.',
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      step: 'Achievement System',
      title: 'Rewards & Recognition',
      image: 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Earn XP, unlock achievements, and celebrate your productivity milestones.',
      color: 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30',
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      step: 'Community',
      title: 'Social Connection',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Connect with like-minded individuals and participate in group challenges.',
      color: 'from-pink-500/20 to-purple-500/20 border-pink-400/30',
      gradient: 'from-pink-600 to-purple-600'
    },
    {
      step: 'Analytics',
      title: 'Progress Tracking',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Detailed insights into your productivity patterns and mood correlations.',
      color: 'from-green-500/20 to-teal-500/20 border-green-400/30',
      gradient: 'from-green-600 to-teal-600'
    },
    {
      step: 'Continuous Learning',
      title: 'Adaptive Intelligence',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'The system learns from your patterns to provide increasingly personalized experiences.',
      color: 'from-indigo-500/20 to-purple-500/20 border-indigo-400/30',
      gradient: 'from-indigo-600 to-purple-600'
    }
  ];

  const stats = [
    { number: '94%', label: 'Feel stuck in distractions' },
    { number: '74%', label: 'Say existing solutions don\'t help' },
    { number: '84%', label: 'Would try TruFlo' }
  ];

  const testimonials = [
    {
      name: 'Dr. Candace Wade',
      position: 'Senior Research Scientist',
      company: 'Innovation Labs',
      image: candaceWade,
      quote: 'TruFlo\'s mood-aware approach revolutionized how I manage my research workflow. The AI perfectly adapts to my energy levels throughout the day.',
      credentials: 'PhD in Cognitive Psychology, 15+ years in behavioral research',
      demo: 'Dr. Wade used TruFlo during her intensive research periods, finding that the mood recognition helped her tackle complex analytical work during peak focus times. The app\'s adaptive scheduling increased her research output by 40%.'
    },
    {
      name: 'Prof. Jason Heikenfeld',
      position: 'Professor of Engineering',
      company: 'University of Cincinnati',
      image: jasonHeikenfeld,
      quote: 'As someone who juggles teaching, research, and innovation, TruFlo\'s personalized task management has been a game-changer for my productivity.',
      credentials: 'Professor of Electrical Engineering, 50+ patents, NSF CAREER Award recipient',
      demo: 'Professor Heikenfeld integrated TruFlo into his academic routine, using it to balance lecture preparation, research projects, and student mentoring. The mood-based scheduling helped him optimize his most creative hours for breakthrough innovations.'
    },
    {
      name: 'Samuel Baker',
      position: 'Creative Director & Entrepreneur',
      company: 'Digital Innovation Studio',
      image: samuelBaker,
      quote: 'TruFlo understands that creativity can\'t be forced. It helps me channel my natural rhythms into productive creative sessions that actually produce results.',
      credentials: 'Award-winning creative director, Founded 3 successful startups, TEDx speaker',
      demo: 'Samuel uses TruFlo to manage his creative agency\'s projects and his entrepreneurial ventures. The app\'s mood recognition helps him schedule brainstorming sessions when he\'s most inspired and administrative tasks when his energy is lower.'
    },
    {
      name: 'Dr. William Hawkins',
      position: 'Research Director',
      company: 'Advanced Materials Institute',
      image: williamHawkins,
      quote: 'The emotional intelligence built into TruFlo is remarkable. It\'s like having a productivity coach that truly understands human psychology.',
      credentials: 'PhD in Materials Science, 100+ peer-reviewed publications, Industry innovation award winner',
      demo: 'Dr. Hawkins implemented TruFlo across his research team, finding that the mood-aware task distribution improved team collaboration and individual performance. The app helped reduce burnout while maintaining high research standards.'
    }
  ];

  const extraTestimonials = [
    {
      name: 'Sarah Chen',
      position: 'Product Manager',
      company: 'Tech Startup',
      quote: 'TruFlo helped me balance feature development with team management by understanding when I\'m in analytical vs. people-focused moods.',
      credentials: 'MBA, 8+ years in product management'
    },
    {
      name: 'Marcus Rodriguez',
      position: 'Freelance Designer',
      company: 'Independent',
      quote: 'The mood-based task scheduling is genius. I no longer force creative work when I\'m feeling analytical, and vice versa.',
      credentials: 'Award-winning UX designer, 50+ client projects'
    }
  ];

  const comparisonData = [
    {
      feature: 'Mood-based task reshuffle',
      truflo: 'Yes',
      others: 'No',
      trufloColor: 'text-green-400',
      othersColor: 'text-red-400',
      trufloIcon: '✅',
      othersIcon: '❌'
    },
    {
      feature: 'Creator-led challenges',
      truflo: 'Yes',
      others: 'Rare',
      trufloColor: 'text-green-400',
      othersColor: 'text-yellow-400',
      trufloIcon: '✅',
      othersIcon: '⚠'
    },
    {
      feature: 'Built-in community XP',
      truflo: 'Yes',
      others: 'Some, but siloed',
      trufloColor: 'text-green-400',
      othersColor: 'text-yellow-400',
      trufloIcon: '✅',
      othersIcon: '⚠'
    },
    {
      feature: 'Freemium + $4.99 Pro',
      truflo: 'Affordable',
      others: '$7–15/mo subs or one-time fees',
      trufloColor: 'text-green-400',
      othersColor: 'text-yellow-400',
      trufloIcon: '✅',
      othersIcon: '⚠'
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section - Redesigned */}
      <section className="relative overflow-hidden pt-24 pb-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Dark overlay specifically for hero content area */}
        <div className="absolute inset-0 bg-black/40 z-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Hero Content */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center mb-8">
                <div className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-white/20 backdrop-blur-sm">
                  <span className="text-white/90 text-sm font-medium font-ui">
                    🚀 The Future of Productivity is Here
                  </span>
                </div>
              </div>

              {/* Hero content with additional dark background */}
              <div className="relative">
                {/* Additional dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/30 rounded-3xl blur-xl"></div>
                
                <div className="relative z-10 py-12">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 animate-fade-in drop-shadow-2xl font-heading leading-tight">
                    Unlock Your{' '}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                      Tru
                    </span>{' '}
                    Potential
                  </h1>
                  
                  {/* Value proposition text - no box, positioned between heading and buttons */}
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
        </div>
      </section>

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

      {/* Content Reveal Overlay - Enhanced */}
      {!contentRevealed && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black/90 backdrop-blur-sm z-20 pointer-events-none" />
          
          <div className="relative z-30 flex justify-center py-20">
            <button
              onClick={handleRevealContent}
              className="group flex flex-col items-center space-y-6 glass-enhanced px-12 py-8 rounded-3xl border-2 border-white/30 hover:border-white/50 transition-all duration-500 hover:scale-105 shadow-2xl"
            >
              <div className="text-white/90 text-2xl font-bold font-heading">
                Experience TruFlo Live
              </div>
              <div className="text-white/70 text-lg font-body text-center max-w-md">
                See how we're revolutionizing productivity through mood-aware technology
              </div>
              
              {/* Enhanced animated arrow */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300">
                  <svg 
                    className="w-8 h-8 text-white/80 group-hover:text-white transition-all duration-300 animate-bounce" 
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
                
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping"></div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Revealed Content - Enhanced */}
      {contentRevealed && (
        <div id="revealed-content" className="animate-fade-in">
          {/* Interactive Widgets Row - Enhanced Layout */}
          <section className="section-spacing-sm relative">
            {/* Dark overlay for widgets section */}
            <div className="absolute inset-0 bg-black/30 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <MoodMap />
                <LivePoll />
                <BrainDrop />
              </div>
            </div>
          </section>

          {/* Emotional Introduction Section - Simplified */}
          <section className="relative py-24 overflow-hidden">
            {/* Dark overlay for emotional section */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent pointer-events-none z-5" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="glass-enhanced rounded-3xl p-12 md:p-16 lg:p-20 text-center shadow-2xl border-2 border-white/20 relative">
                  {/* Additional dark background for text content */}
                  <div className="absolute inset-0 bg-black/20 rounded-3xl blur-xl"></div>
                  
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
                    
                    {/* Enhanced transition with animated brain */}
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

          {/* What is TruFlo Section - Enhanced */}
          <section className="section-spacing relative">
            {/* Dark overlay for what is truflo section */}
            <div className="absolute inset-0 bg-black/35 z-0"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="glass-enhanced rounded-3xl p-12 max-w-6xl mx-auto border-2 border-white/20 relative">
                {/* Additional dark background for content */}
                <div className="absolute inset-0 bg-black/25 rounded-3xl blur-xl"></div>
                
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

          {/* Live XP Counter - Enhanced */}
          <section className="section-spacing-sm relative">
            {/* Dark overlay for XP counter section */}
            <div className="absolute inset-0 bg-black/30 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <LiveXPCounter />
            </div>
          </section>

          {/* How TruFlo Works - Enhanced */}
          <section className="section-spacing bg-gradient-to-b from-transparent via-black/10 to-transparent relative">
            {/* Dark overlay for workflow section */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-20">
                {/* Additional dark background for header */}
                <div className="relative">
                  <div className="absolute inset-0 bg-black/30 rounded-3xl blur-xl"></div>
                  <div className="relative z-10 py-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full border-2 border-white/30 mb-8 shadow-xl">
                      <span className="text-5xl">⚡</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-2xl font-heading">
                      How TruFlo Works
                    </h2>
                    <p className="text-xl text-white/90 drop-shadow-lg max-w-4xl mx-auto font-body">
                      Experience the revolutionary 5-step process that transforms your productivity through intelligent mood recognition and adaptive task management.
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {workflowSteps.map((step, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -top-4 -left-4 z-10">
                        <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center shadow-xl border-2 border-white/20`}>
                          <span className="text-white font-bold text-xl drop-shadow-md font-ui">
                            {index + 1}
                          </span>
                        </div>
                      </div>

                      <Card className="glass-enhanced shadow-2xl hover:scale-[1.02] transition-all duration-500 h-full border-2 border-white/10 group-hover:border-white/20">
                        <CardContent className="p-8">
                          <div className="relative mb-8">
                            <div className={`w-28 h-28 mx-auto rounded-3xl overflow-hidden bg-gradient-to-r ${step.color} border-2 border-white/20 shadow-xl flex items-center justify-center`}>
                              <img
                                src={step.image}
                                alt={step.title}
                                className="w-24 h-24 object-contain filter drop-shadow-lg"
                              />
                            </div>
                            
                            {index < workflowSteps.length - 1 && (
                              <div className="hidden xl:block absolute top-14 -right-12 z-0">
                                <svg width="48" height="24" viewBox="0 0 48 24" className="text-white/30">
                                  <path
                                    d="M0 12h40m-8-8l8 8-8 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>

                          <div className="text-center space-y-4">
                            <div className="text-sm font-semibold text-white/70 uppercase tracking-wider drop-shadow-sm font-ui">
                              {step.step}
                            </div>
                            
                            <h3 className="text-xl font-bold text-white drop-shadow-md leading-tight font-heading">
                              {step.title}
                            </h3>
                            
                            <p className="text-white/80 leading-relaxed drop-shadow-sm font-body">
                              {step.description}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-white/10">
                            <div className="flex items-center justify-center space-x-2">
                              {workflowSteps.map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    i <= index 
                                      ? `bg-gradient-to-r ${step.gradient}` 
                                      : 'bg-white/20'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                <div className="mt-20 text-center max-w-6xl mx-auto">
                  {/* Additional dark background for conclusion text */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-black/30 rounded-3xl blur-xl"></div>
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
            </div>
          </section>

          {/* Testimonials Section with Unlock */}
          <section className="section-spacing relative">
            {/* Dark overlay for testimonials section */}
            <div className="absolute inset-0 bg-black/35 z-0"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                {/* Additional dark background for header */}
                <div className="relative">
                  <div className="absolute inset-0 bg-black/30 rounded-3xl blur-xl"></div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
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
                        
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <h4 className="text-sm font-semibold text-white/90 mb-2 drop-shadow-sm font-ui">
                            How They Use TruFlo
                          </h4>
                          <p className="text-white/70 text-sm drop-shadow-sm leading-relaxed font-body">
                            {testimonial.demo}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <UnlockButton
                  unlockThreshold={75}
                  onUnlock={() => setShowExtraTestimonials(true)}
                  storageKey="extraTestimonialsUnlock"
                >
                  {showExtraTestimonials && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
                      {extraTestimonials.map((testimonial, index) => (
                        <Card key={index} className="glass-enhanced shadow-xl">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-2 font-heading">{testimonial.name}</h3>
                            <p className="text-white/80 text-sm mb-4 font-ui">{testimonial.position} • {testimonial.company}</p>
                            <blockquote className="text-white/90 italic mb-4 font-body">"{testimonial.quote}"</blockquote>
                            <p className="text-white/70 text-xs font-body">{testimonial.credentials}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </UnlockButton>
              </div>
            </div>
          </section>

          {/* Problem Section - Enhanced */}
          <section id="about" className="section-spacing relative">
            {/* Dark overlay for problem section */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                {/* Additional dark background for header */}
                <div className="relative">
                  <div className="absolute inset-0 bg-black/30 rounded-3xl blur-xl"></div>
                  <div className="relative z-10 py-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-full border-2 border-white/30 mb-8 shadow-xl">
                      <span className="text-5xl">😤</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl font-heading">
                      You're not lazy. You're overwhelmed.
                    </h2>
                    <p className="text-xl text-white/90 drop-shadow-lg font-body">
                      Traditional productivity apps ignore the most important factor: how you feel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Card className="p-6 hover glass-enhanced shadow-xl">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-lg flex items-center justify-center border border-red-400/40 shadow-lg">
                        <span className="text-2xl drop-shadow-md">📉</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md font-heading">
                          Task Abandonment
                        </h3>
                        <p className="text-white/80 drop-shadow-sm font-body">
                          You start with good intentions but lose motivation halfway through.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover glass-enhanced shadow-xl">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500/30 to-orange-600/30 rounded-lg flex items-center justify-center border border-orange-400/40 shadow-lg">
                        <span className="text-2xl drop-shadow-md">😞</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md font-heading">
                          Guilt from Time-Wasting
                        </h3>
                        <p className="text-white/80 drop-shadow-sm font-body">
                          You know you're procrastinating but can't seem to stop.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover glass-enhanced shadow-xl">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 rounded-lg flex items-center justify-center border border-yellow-400/40 shadow-lg">
                        <span className="text-2xl drop-shadow-md">🔄</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md font-heading">
                          Confusion Around Priorities
                        </h3>
                        <p className="text-white/80 drop-shadow-sm font-body">
                          Everything feels urgent, but nothing feels important.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="relative">
                  <Card className="p-4 glass-enhanced shadow-2xl">
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
          </section>

          {/* Stats Section with Unlock - Enhanced */}
          <section className="section-spacing-sm relative">
            {/* Dark overlay for stats section */}
            <div className="absolute inset-0 bg-black/35 z-0"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-12">
                {/* Additional dark background for header */}
                <div className="relative">
                  <div className="absolute inset-0 bg-black/30 rounded-3xl blur-xl"></div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-8 animate-fade-in glass-enhanced shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 drop-shadow-lg font-ui">
                      {stat.number}
                    </div>
                    <p className="text-white/90 drop-shadow-md font-body text-lg">{stat.label}</p>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <UnlockButton
                  unlockThreshold={50}
                  onUnlock={() => setShowExtraStats(true)}
                  storageKey="extraStatsUnlock"
                >
                  {showExtraStats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-fade-in">
                      <Card className="p-6 glass-enhanced shadow-xl">
                        <div className="text-3xl font-bold text-blue-400 mb-2 font-ui">67%</div>
                        <p className="text-white/90 font-body">Report improved focus with mood-based scheduling</p>
                      </Card>
                      <Card className="p-6 glass-enhanced shadow-xl">
                        <div className="text-3xl font-bold text-green-400 mb-2 font-ui">89%</div>
                        <p className="text-white/90 font-body">Complete more tasks when emotionally aligned</p>
                      </Card>
                    </div>
                  )}
                </UnlockButton>
              </div>
            </div>
          </section>

          {/* Competitive Edge Section - Enhanced */}
          <section className="section-spacing relative">
            {/* Dark overlay for competitive edge section */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                {/* Additional dark background for header */}
                <div className="relative">
                  <div className="absolute inset-0 bg-black/30 rounded-3xl blur-xl"></div>
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

              <Card className="max-w-5xl mx-auto overflow-hidden glass-enhanced shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white drop-shadow-md font-heading">
                          TruFlo vs. Others
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-md font-ui">
                          TruFlo
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-white/60 drop-shadow-md font-ui">
                          Typical Productivity App
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {comparisonData.map((row, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm text-white drop-shadow-sm font-medium font-body">
                            {row.feature}
                          </td>
                          <td className={`px-6 py-4 text-center text-sm ${row.trufloColor} drop-shadow-sm font-medium font-ui`}>
                            {row.trufloIcon} {row.truflo}
                          </td>
                          <td className={`px-6 py-4 text-center text-sm ${row.othersColor} drop-shadow-sm font-medium font-ui`}>
                            {row.othersIcon} {row.others}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </section>

          {/* Final CTA Section - Enhanced */}
          <section className="section-spacing relative">
            {/* Dark overlay for final CTA section */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="max-w-5xl mx-auto">
                <div className="glass-enhanced rounded-3xl p-12 md:p-16 border-2 border-white/20 relative">
                  {/* Additional dark background for content */}
                  <div className="absolute inset-0 bg-black/25 rounded-3xl blur-xl"></div>
                  
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
    </div>
  );
}