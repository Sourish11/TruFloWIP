import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem } from '@/components/ui/accordion';

export default function TruFloLandingPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-7xl mx-auto">

      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold">Unlock Your Tru Potential</h1>
        <p className="text-xl">Escape distractions. Build habits. Achieve your goals.</p>
        <div className="flex justify-center gap-4">
          <Button>Join Beta / Join Discord</Button>
          <Button variant="outline">Get Early Access</Button>
        </div>
      </section>

      {/* App Preview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <img src="/mockup-phone.png" alt="App on phone" className="rounded-xl shadow-lg" />
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">What TruFlo Does</h2>
          <ul className="list-disc pl-5 space-y-2 text-lg">
            <li>🧠 AI-Powered Task Suggestions</li>
            <li>🏆 Gamification: streaks, badges, rewards</li>
            <li>🤝 Community & Influencer Challenges</li>
          </ul>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card><CardContent>🧠 AI Personalization – Adaptive challenges/tasks</CardContent></Card>
          <Card><CardContent>🤝 Community & Influencer Challenges – Group accountability</CardContent></Card>
          <Card><CardContent>🎮 Gamified Experience – Streaks, XP, badges</CardContent></Card>
          <Card><CardContent>💻 Cross-Platform – Windows, Linux, iOS, Android</CardContent></Card>
          <Card><CardContent>📈 Consistency Builder – Habit tracking & focus mode</CardContent></Card>
        </div>
      </section>

      {/* Free vs Premium Comparison */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Free vs Premium</h2>
        <table className="w-full table-auto border text-left">
          <thead>
            <tr>
              <th className="p-2 border">Feature</th>
              <th className="p-2 border">Free</th>
              <th className="p-2 border">Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border">AI Optimization</td><td className="p-2 border">Weekly</td><td className="p-2 border">Monthly</td></tr>
            <tr><td className="p-2 border">Reward Tiers</td><td className="p-2 border">Basic</td><td className="p-2 border">Advanced</td></tr>
            <tr><td className="p-2 border">Device Sync</td><td className="p-2 border">-</td><td className="p-2 border">✔️</td></tr>
            <tr><td className="p-2 border font-bold">Price</td><td className="p-2 border">Free</td><td className="p-2 border">$4.99/mo or $49.99/yr</td></tr>
          </tbody>
        </table>
      </section>

      {/* Problem Section */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">You’re not lazy. You’re overwhelmed.</h2>
        <ul className="list-disc pl-5 text-lg">
          <li>📉 Task abandonment</li>
          <li>😞 Guilt from time-wasting</li>
          <li>🔄 Confusion around prioritization</li>
        </ul>
      </section>

      {/* Market Validation */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Market Validation & Impact</h2>
        <p>🎯 Total Addressable Market: Millions of productivity-seeking individuals</p>
        <p>📊 Backed by survey insights and productivity trends</p>
      </section>

      {/* Community Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Community</h2>
        <p>💬 Join our Discord to connect with early adopters!</p>
        <Button className="mt-2">Join Discord</Button>
      </section>

      {/* Roadmap */}
      <section>
        <h2 className="text-3xl font-semibold">Roadmap</h2>
        <ul className="list-disc pl-5">
          <li>Q2: Beta launch</li>
          <li>Q3: Premium features rollout</li>
          <li>Q4: Mobile expansion + AI V2</li>
        </ul>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-3xl font-semibold">Meet the Team</h2>
        <p>👥 Passionate developers, designers, and productivity nerds on a mission to help you thrive.</p>
      </section>

      {/* FAQ */}
      <section>
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
      <section>
        <h2 className="text-3xl font-semibold">Join the Waitlist</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border rounded-md w-full max-w-md"
        />
        <Button className="mt-2">Notify Me</Button>
      </section>

      {/* Privacy */}
      <footer className="text-sm text-center mt-10">
        <a href="/privacy" className="underline">Privacy Policy</a> · <a href="/terms" className="underline">Terms & Conditions</a>
      </footer>
    </div>
  );
}
