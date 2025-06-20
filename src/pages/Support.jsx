import { useState } from 'react';
import { Accordion, AccordionItem } from '../components/ui/accordion';

export default function Support() {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: 'What is TruFlo?',
      answer: 'We are trying to be the first productivity app that understands your mood to help you break free from distractions and unproductive habits.'
    },
    {
      question: 'Who is TruFlo for?',
      answer: 'Anyone who is trying to build productive habits, but mainly for 16-35 year olds who want to optimize their productivity based on their emotional state.'
    },
    {
      question: 'How does TruFlo work?',
      answer: 'The tasks and goals given to you will adapt to your unique day-to-day patterns with AI Personalization. Our mood recognition technology analyzes your emotional state and adjusts your workflow accordingly.'
    },
    {
      question: 'Is TruFlo free to use?',
      answer: 'Yes! TruFlo offers a free tier with basic features. You can upgrade to Pro for $4.99/month or save with our annual plan at $49.99/year for advanced AI features and cross-device sync.'
    },
    {
      question: 'How does mood recognition work?',
      answer: 'TruFlo uses voice-based emotion check-ins and behavioral pattern analysis to understand your current emotional state and energy levels, then adapts your task recommendations accordingly.'
    },
    {
      question: 'Can I sync across multiple devices?',
      answer: 'Yes! Pro subscribers can sync their data across all devices, ensuring your productivity insights and progress are always up to date.'
    },
    {
      question: 'How do I join the community?',
      answer: 'You can join our Discord community where you can share suggestions, participate in challenges, and connect with like-minded productivity enthusiasts.'
    },
    {
      question: 'What makes TruFlo different from other productivity apps?',
      answer: 'TruFlo is the first productivity app that puts your emotional state at the center of the experience, using AI to adapt your workflow to how you feel rather than forcing you into rigid systems.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-section">
          <div className="glass-enhanced rounded-2xl p-8 text-center content-spacing-lg">
            <div className="visual-hierarchy">
              <h1 className="page-title text-white mb-8 drop-shadow-2xl">
                Support Center
              </h1>
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                Find answers to common questions or get in touch with our support team.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 glass-button rounded-lg text-white placeholder-white/60"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="page-section">
          <div className="content-grid content-grid-3 mb-12">
            <div className="glass-card p-6 rounded-xl text-center hover">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
              <p className="text-white/70 text-sm mb-4">
                Get instant help from our support team
              </p>
              <button className="glass-button px-4 py-2 rounded-lg text-sm font-medium">
                Start Chat
              </button>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center hover">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
              <p className="text-white/70 text-sm mb-4">
                Send us a detailed message
              </p>
              <button className="glass-button px-4 py-2 rounded-lg text-sm font-medium">
                Send Email
              </button>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center hover">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
              <p className="text-white/70 text-sm mb-4">
                Join our Discord community
              </p>
              <a 
                href="https://discord.gg/eZHfGJTRNh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-button px-4 py-2 rounded-lg text-sm font-medium inline-block"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>

        <div className="page-section">
          <div className="glass-enhanced rounded-2xl p-8">
            <div className="visual-hierarchy mb-8">
              <h2 className="section-heading text-white drop-shadow-lg">
                Frequently Asked Questions
              </h2>
            </div>
            
            {filteredFaqs.length > 0 ? (
              <Accordion className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    title={faq.question}
                    className="glass-card rounded-lg overflow-hidden"
                  >
                    <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/70">No FAQs found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        <div className="page-section">
          <div className="glass-enhanced rounded-2xl p-8 text-center">
            <h2 className="section-heading text-white mb-4">Still Need Help?</h2>
            <p className="text-white/80 mb-6">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}