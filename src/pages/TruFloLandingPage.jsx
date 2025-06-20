import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Accordion, AccordionItem } from '@/components/ui/accordion.tsx';
import NotifyForm from '@/components/ui/NotifyForm';
import landingVideo from '../assets/landing-video.mp4';
import AuthButtons from '../components/ui/AuthButtons';
export default function TruFloLandingPage() {
  return (
    <div className="space-y-16 w-full bg-neutral-950 text-white">
      <div className="absolute top-6 right-6 z-50">
        <AuthButtons />
      </div>
      {/* Hero Section */}
      <section className="w-full min-h-[90vh] bg-[url('./assets/background.png')] bg-cover bg-center relative overflow-hidden text-center flex items-center justify-center">
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Unlock Your <span className="text-indigo-500">Tru</span> Potential
          </h1>
          <p className="text-xl text-neutral-300">
            Escape distractions. Build habits. Achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-black px-6 py-3 rounded-md shadow" onClick={() => window.open('https://discord.gg/eZHfGJTRNh', '_blank', 'noopener,noreferrer')}>
              Join Beta / Join Discord
            </button>
            <button className="px-6 py-3 border border-neutral-300 text-black rounded-md hover:bg-white/10">
              Get Early Access
            </button>
          </div>
          <div className="inline-block text-center mt-8">
            <h2 className="text-xl font-semibold">Join Early Access: </h2>
            <NotifyForm />
          </div>

        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-neutral-950" />
      </section>

      <section className="space-y-16 py-24 px-6">
        {/* About: What TruFlo Does */}
        <section id="about" className="bg-black p-10 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <video
            src={landingVideo}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">What TruFlo Does</h2>
            <ul className="list-disc pl-5 space-y-2 text-lg text-neutral-300">
              <li>🧠 AI-Powered Task Suggestions</li>
              <li>🏆 Gamification: streaks, badges, rewards</li>
              <li>🤝 Community & Influencer Challenges</li>
            </ul>
          </div>
        </section>

        {/* Tagline */}
        <section id="tagline" className="bg-black p-10 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold">“The productivity app that listens before it leads.”</h3>
        </section>

        {/* Mission */}
        <section id="mission" className="bg-black p-10 rounded-2xl shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Our Mission</h4>
          <p>To help people reclaim their focus by syncing productivity with how they feel — not how much they hustle.</p>
        </section>

        {/* Story */}
        <section id="story" className="bg-black p-10 rounded-2xl shadow-lg">
          <h4 className="text-lg font-semibold mb-2">Our Story</h4>
          <p>TruFlo was born from a simple truth: most productivity apps don’t work because they ignore your <em>mood</em>. After seeing our friends and ourselves struggle with burnout, we set out to build something different — a tool that listens first, then guides.</p>
        </section>

        {/* Why We Exist */}
        <section id="why-we-exist" className="bg-black p-10 rounded-2xl shadow-lg space-y-2">
          <h4 className="text-lg font-semibold">Why We Exist</h4>
          <ul className="list-disc pl-5 text-neutral-300">
            <li>94% of people feel stuck in distractions.</li>
            <li>74% say existing solutions don’t help.</li>
            <li>84% said they’d try TruFlo.</li>
          </ul>
          <p>We exist to bridge that gap — between intention and action — using emotion-driven design, AI, and real community.</p>
        </section>

        {/* What Makes Us Different */}
        <section id="what-makes-us-different" className="bg-black p-10 rounded-2xl shadow-lg">
          <h4 className="text-lg font-semibold mb-2">What Makes Us Different</h4>
          <table className="w-full text-left text-sm border border-neutral-700 rounded overflow-hidden">
            <thead className="bg-neutral-700">
              <tr>
                <th className="p-3 border border-neutral-600">Feature</th>
                <th className="p-3 border border-neutral-600">TruFlo</th>
                <th className="p-3 border border-neutral-600">Others</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-600">
              <tr><td className="p-3">Mood Recognition</td><td className="p-3">✅ Voice-based emotion check-ins</td><td className="p-3">❌ Ignored</td></tr>
              <tr><td className="p-3">Personalized Challenges</td><td className="p-3">✅ Influencer-led + adaptive</td><td className="p-3">⚠ Static or solo tasks</td></tr>
              <tr><td className="p-3">AI-Powered Routines</td><td className="p-3">✅ Learns your behavior daily</td><td className="p-3">⚠ Limited personalization</td></tr>
              <tr><td className="p-3">Community Accountability</td><td className="p-3">✅ Leaderboards, XP, streaks</td><td className="p-3">⚠ Mostly solo-based</td></tr>
            </tbody>
          </table>
        </section>

        {/* How We Work */}
        <section id="how-we-work" className="bg-black p-10 rounded-2xl shadow-lg">
          <h4 className="text-lg font-semibold mb-2">How We Work</h4>
          <ul className="list-disc pl-5 text-neutral-300">
            <li><strong>AI-Personalized Task Flow:</strong> TruFlo learns your day-to-day patterns and reshapes your schedule dynamically.</li>
            <li><strong>Voice-Based Mood Check-ins:</strong> Your emotions influence what shows up on your task list.</li>
            <li><strong>Influencer Challenges:</strong> Daily and weekly missions led by creators you trust.</li>
            <li><strong>XP-Driven Progress:</strong> Gain points, keep streaks alive, and stay accountable with your team.</li>
          </ul>
        </section>

        {/* The Team */}
        <section id="team" className="bg-black p-10 rounded-2xl shadow-lg">
          <h4 className="text-lg font-semibold mb-2">The Team</h4>
          <p>Founded by students. Driven by creators.</p>
          <p>We’re a growing team passionate about behavior science, gamification, and building the future of meaningful work.</p>
        </section>

        {/* Closing Statement */}
        <section id="closing" className="bg-black p-10 rounded-2xl shadow-lg text-center">
          <p className="text-lg font-medium">Whether you're a student, a creator, or just someone trying to reclaim your time — <strong>TruFlo meets you where you are, and helps you flow forward.</strong></p>
        </section>
      </section>


      {/* Problem Section */}
      <section className="bg-neutral-900 p-10 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-3xl font-semibold">You’re not lazy. You’re overwhelmed.</h2>
        <ul className="list-disc pl-5 text-lg text-neutral-300">
          <li>📉 Task abandonment</li>
          <li>😞 Guilt from time-wasting</li>
          <li>🔄 Confusion around prioritization</li>
        </ul>
      </section>

      {/* Market Validation */}
      <section className="bg-neutral-900 p-10 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-3xl font-semibold">Market Validation & Impact</h2>
        <p>🎯 Total Addressable Market: Millions of productivity-seeking individuals</p>
        <p>📊 Backed by survey insights and productivity trends</p>
      </section>

      {/* Community Section */}
      <section className="bg-neutral-900 p-10 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-3xl font-semibold">Community</h2>
        <p>💬 Join our Discord to connect with early adopters!</p>
        <button className="text-black mt-2" onClick={() => window.open('https://discord.gg/eZHfGJTRNh', '_blank', 'noopener,noreferrer')}>Join Discord</button>
      </section>

      {/* Roadmap */}
      <section className="bg-neutral-900 p-10 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-3xl font-semibold">Roadmap</h2>
        <ul className="list-disc pl-5 text-neutral-300">
          <li>Q2: Beta launch</li>
          <li>Q3: Premium features rollout</li>
          <li>Q4: Mobile expansion + AI V2</li>
        </ul>
      </section>

      {/* Team */}
      <section className="bg-neutral-900 p-10 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-3xl font-semibold">Meet the Team</h2>
        <p>👥 Passionate developers, designers, and productivity nerds on a mission to help you thrive.</p>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-900 p-10 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-3xl font-semibold">FAQs</h2>
        <Accordion>
          <AccordionItem title="What is TruFlo?">
            TruFlo is a habit-building productivity app using AI and gamification to help you stay focused.
          </AccordionItem>
          <AccordionItem title="Is there a free version?">
            Yes! You can get started for free and upgrade later if you'd like.
          </AccordionItem>
        </Accordion>
      </section>

      {/* Email Signup */}
      <section className="bg-neutral-900 p-10 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-3xl font-semibold">Join the Waitlist</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 border border-neutral-700 bg-neutral-800 rounded-md w-full max-w-md text-white placeholder-neutral-500"
        />
        <button className="text-black mt-2">Notify Me</button>
      </section>
    </div>

  );
}
