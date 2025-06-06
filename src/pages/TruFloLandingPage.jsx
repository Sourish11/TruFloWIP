import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Accordion, AccordionItem } from '@/components/ui/accordion.tsx';
import NotifyForm from '@/components/ui/NotifyForm';
import landingVideo from '../assets/landing-video.mp4';
export default function TruFloLandingPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-7xl mx-auto">

      {/* Hero Section */}
      <section className="text-center space-y-6 bg-[url('./assets/background.png')]">
        <h1 className="text-5xl font-bold">Unlock Your Tru Potential</h1>
        <p className="text-xl">Escape distractions. Build habits. Achieve your goals.</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => window.open('https://discord.gg/eZHfGJTRNh', '_blank', 'noopener,noreferrer')}>Join Beta / Join Discord</Button>
        </div>
        <div className="inline-block text-center mt-4">
          <h2 className="text-xl font-semibold mt-8">Join Early Access: </h2>
          <NotifyForm />
          <br></br>
        </div>
      </section>



    <div className="space-y-16 py-24 px-6">
  {/* App Preview */}
  <section className="bg-black p-10 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    
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



      {/* Features */}
      <section className="bg-neutral-900 p-10 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            '🧠 AI Personalization – Adaptive challenges/tasks',
            '🤝 Community Challenges – Group accountability',
            '🎮 Gamified Experience – Streaks, XP, badges',
            '💻 Cross-Platform – Windows, Linux, iOS, Android',
            '📈 Consistency Builder – Habit tracking & focus mode'
          ].map((text, i) => (
            <Card key={i} className="bg-neutral-800 text-black shadow hover:shadow-md transition-shadow">
              <CardContent>{text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Free vs Premium Comparison */}
      <section className="bg-neutral-900 p-10 rounded-2xl shadow-lg space-y-4 ">
        <h2 className="text-3xl font-semibold">Free vs Premium</h2>
        <table className="w-full table-auto  border-collapse border  border-white text-left text-sm rounded overflow-hidden">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3 border border-neutral-700 font-semibold">Feature</th>
              <th className="p-3 border border-neutral-700">Free</th>
              <th className="p-3 border border-neutral-700">Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            <tr><td className="p-3">AI Optimization</td><td className="p-3">Weekly</td><td className="p-3">Monthly</td></tr>
            <tr><td className="p-3">Reward Tiers</td><td className="p-3">Basic</td><td className="p-3">Advanced</td></tr>
            <tr><td className="p-3">Device Sync</td><td className="p-3">-</td><td className="p-3">✔️</td></tr>
            <tr className="font-bold"><td className="p-3">Price</td><td className="p-3">Free</td><td className="p-3">$4.99/mo or $49.99/yr</td></tr>
          </tbody>
        </table>
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

    </div>
  );
}
