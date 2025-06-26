import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Modal, ModalHeader, ModalContent } from '../components/ui/Modal';
import { joinEarlyAccess } from '../hooks/joinEarlyAccess';
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

  const workflowSteps = [
    {
      step: 'Feel',
      title: 'Check-in',
      icon: '😊',
      description: 'Tap an emoji or let the mic read vocal energy.',
      color: 'from-blue-500/20 to-blue-600/20 border-blue-400/30'
    },
    {
      step: 'Think',
      title: 'Flow Plan',
      icon: '🧠',
      description: 'AI slots tasks into optimal focus blocks (work + rest).',
      color: 'from-purple-500/20 to-purple-600/20 border-purple-400/30'
    },
    {
      step: 'Do',
      title: 'Focus Mode',
      icon: '🎯',
      description: 'Enter a timer thread. Distractions silenced; XP ticking.',
      color: 'from-green-500/20 to-green-600/20 border-green-400/30'
    },
    {
      step: 'Reflect',
      title: 'Mood & Stats',
      icon: '📊',
      description: 'End-of-day recap shows streaks, mood trends, and time-on-task.',
      color: 'from-orange-500/20 to-orange-600/20 border-orange-400/30'
    },
    {
      step: 'Grow',
      title: 'Challenges & Rewards',
      icon: '🏆',
      description: 'Join creator missions, climb leaderboards, and unlock badges.',
      color: 'from-red-500/20 to-red-600/20 border-red-400/30'
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
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="visual-hierarchy max-w-4xl mx-auto">
            <h1 className="hero-heading text-white mb-6 animate-fade-in drop-shadow-2xl">
              Unlock Your{' '}
              <span className="gradient-text-white animate-glow">
                Tru
              </span>{' '}
              Potential
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-slide-up drop-shadow-lg max-w-3xl">
              The first productivity app that understands your mood to help you break free from distractions and build lasting habits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
              <Button
                size="lg"
                onClick={() => window.open('https://discord.gg/eZHfGJTRNh', '_blank', 'noopener,noreferrer')}
                className="text-lg px-8 py-4 shadow-2xl"
              >
                Join Beta Community
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={handleGetEarlyAccess}
                className="text-lg px-8 py-4 shadow-2xl"
              >
                Get Early Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      <Modal isOpen={showWaitlistModal} onClose={handleCloseModal}>
        <Card className="glass-enhanced shadow-2xl border-white/30">
          <ModalHeader onClose={handleCloseModal}>
            <h3 className="text-xl font-semibold text-white drop-shadow-md">
              Join the Waitlist
            </h3>
          </ModalHeader>
          
          <ModalContent>
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-green-400 mb-4 text-4xl drop-shadow-md">✓</div>
                <h4 className="text-lg font-semibold text-white mb-2">You're on the list!</h4>
                <p className="text-white/80 mb-6">
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
                <p className="text-white/80 mb-6 text-center">
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
                
                <p className="text-xs text-white/60 text-center mt-4">
                  We respect your privacy. No spam, just updates about TruFlo.
                </p>
              </div>
            )}
          </ModalContent>
        </Card>
      </Modal>

      {/* What is TruFlo Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-4">
          <div className="glass-enhanced rounded-2xl p-12 max-w-5xl mx-auto">
            <div className="visual-hierarchy">
              <h2 className="page-title text-white mb-8 drop-shadow-2xl">
                What is TruFlo?
              </h2>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-lg max-w-4xl">
                TruFlo is a next-gen productivity platform that blends emotion AI, gamified XP, and creator-led challenges to keep 16- to 35-year-olds locked into deep work—without resorting to will-power alone. Where traditional apps nag, TruFlo adapts: detecting how you feel and serving the task you're most likely to crush right now!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How TruFlo Works (In 90 Seconds) Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-4">
          <div className="visual-hierarchy mb-16">
            <h2 className="page-title text-white mb-6 drop-shadow-2xl">
              How TruFlo Works (In 90 Seconds)
            </h2>
            <p className="text-lg text-white/90 drop-shadow-lg">
              Five simple steps to transform your productivity workflow.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {workflowSteps.map((step, index) => (
                <Card key={index} className="glass-enhanced shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 border shadow-lg`}>
                      <span className="text-2xl drop-shadow-md">{step.icon}</span>
                    </div>
                    <div className="ui-number text-sm font-bold text-white/60 mb-2 drop-shadow-sm">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 drop-shadow-md">
                      {step.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed drop-shadow-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="about" className="section-spacing">
        <div className="container mx-auto px-4">
          <div className="visual-hierarchy mb-16">
            <h2 className="page-title text-white mb-6 drop-shadow-2xl">
              You're not lazy. You're overwhelmed.
            </h2>
            <p className="text-lg text-white/90 drop-shadow-lg">
              Traditional productivity apps ignore the most important factor: how you feel.
            </p>
          </div>

          <div className="content-grid content-grid-2 items-center">
            <div className="content-wrapper">
              <Card className="p-6 hover glass-enhanced shadow-xl">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-lg flex items-center justify-center border border-red-400/40 shadow-lg">
                    <span className="text-2xl drop-shadow-md">📉</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">
                      Task Abandonment
                    </h3>
                    <p className="text-white/80 drop-shadow-sm">
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
                    <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">
                      Guilt from Time-Wasting
                    </h3>
                    <p className="text-white/80 drop-shadow-sm">
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
                    <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">
                      Confusion Around Priorities
                    </h3>
                    <p className="text-white/80 drop-shadow-sm">
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

      {/* Stats Section */}
      <section className="section-spacing-sm">
        <div className="container mx-auto px-4">
          <div className="content-grid content-grid-3 text-center">
            {stats.map((stat, index) => (
              <Card key={index} className="p-8 animate-fade-in glass-enhanced shadow-xl">
                <div className="stats-number text-3xl font-bold gradient-text-white mb-2 drop-shadow-lg">
                  {stat.number}
                </div>
                <p className="text-white/90 drop-shadow-md">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-4">
          <div className="visual-hierarchy mb-16">
            <h2 className="page-title text-white mb-6 drop-shadow-2xl">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-white/90 drop-shadow-lg">
              See what thought leaders and innovators are saying about TruFlo's revolutionary approach to productivity.
            </p>
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
                      <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-md">
                        {testimonial.name}
                      </h3>
                      <p className="ui-text text-white/80 text-sm mb-2 drop-shadow-sm">
                        {testimonial.position}
                      </p>
                      <p className="ui-text text-white/70 text-sm drop-shadow-sm">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  
                  <blockquote className="text-white/90 text-lg italic mb-6 drop-shadow-sm leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h4 className="ui-text text-sm font-semibold text-white/90 mb-2 drop-shadow-sm">
                        Credentials & Achievements
                      </h4>
                      <p className="text-white/70 text-sm drop-shadow-sm">
                        {testimonial.credentials}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h4 className="ui-text text-sm font-semibold text-white/90 mb-2 drop-shadow-sm">
                        How They Use TruFlo
                      </h4>
                      <p className="text-white/70 text-sm drop-shadow-sm leading-relaxed">
                        {testimonial.demo}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Edge Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-4">
          <div className="visual-hierarchy mb-16">
            <h2 className="page-title text-white mb-6 drop-shadow-2xl">
              Competitive Edge
            </h2>
            <p className="text-lg text-white/90 drop-shadow-lg mb-8">
              TruFlo is the first platform that starts a productivity session based on how you feel at that moment—no one else does that.
            </p>
          </div>

          <Card className="max-w-5xl mx-auto overflow-hidden glass-enhanced shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white drop-shadow-md">
                      TruFlo vs. Others
                    </th>
                    <th className="ui-text px-6 py-4 text-center text-sm font-semibold gradient-text-white drop-shadow-md">
                      TruFlo
                    </th>
                    <th className="ui-text px-6 py-4 text-center text-sm font-semibold text-white/60 drop-shadow-md">
                      Typical Productivity App
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {comparisonData.map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-white drop-shadow-sm font-medium">
                        {row.feature}
                      </td>
                      <td className={`ui-text px-6 py-4 text-center text-sm ${row.trufloColor} drop-shadow-sm font-medium`}>
                        {row.trufloIcon} {row.truflo}
                      </td>
                      <td className={`ui-text px-6 py-4 text-center text-sm ${row.othersColor} drop-shadow-sm font-medium`}>
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

      {/* CTA Section - No Box */}
      <section className="section-spacing">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="visual-hierarchy">
              <h2 className="page-title text-white mb-6 drop-shadow-2xl">
                Ready to Transform Your Productivity?
              </h2>
              <p className="text-lg text-white/90 mb-8 drop-shadow-lg">
                Join thousands of others who are already building better habits with TruFlo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="text-lg px-8 py-4 shadow-2xl"
                >
                  Start Your Journey
                </Button>
                <Button
                  size="lg"
                  variant="glass"
                  onClick={() => window.open('https://discord.gg/eZHfGJTRNh', '_blank', 'noopener,noreferrer')}
                  className="text-lg px-8 py-4 shadow-2xl"
                >
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}