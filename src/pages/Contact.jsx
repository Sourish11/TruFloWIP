export default function Contact() {
  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-section">
          <div className="glass-enhanced rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="visual-hierarchy mb-8">
              <h1 className="page-title text-white drop-shadow-2xl">
                Get in Touch
              </h1>
            </div>
            
            <div className="content-grid content-grid-2">
              <div className="content-wrapper">
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
                  <div className="space-y-4 text-white/80">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📧</span>
                      <span>hello@truflo.app</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">💬</span>
                      <a 
                        href="https://discord.gg/eZHfGJTRNh" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        Join our Discord
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🌐</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-lg font-semibold text-white mb-4">Office Hours</h2>
                  <div className="space-y-2 text-white/80">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-lg font-semibold text-white mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 glass-button rounded-lg text-white placeholder-white/60"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 glass-button rounded-lg text-white placeholder-white/60"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 glass-button rounded-lg text-white placeholder-white/60"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Message</label>
                    <textarea 
                      rows="4" 
                      className="w-full px-4 py-3 glass-button rounded-lg text-white placeholder-white/60 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}