export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with TruFlo',
      features: [
        'Basic mood tracking',
        'Simple task management',
        'Community access',
        'Basic analytics',
        'Mobile app access'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$4.99',
      period: 'per month',
      description: 'Unlock the full potential of mood-based productivity',
      features: [
        'Advanced AI mood recognition',
        'Personalized task recommendations',
        'Cross-device synchronization',
        'Advanced analytics & insights',
        'Priority customer support',
        'Exclusive challenges & rewards',
        'Custom productivity themes'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Annual Pro',
      price: '$49.99',
      period: 'per year',
      description: 'Save 17% with annual billing',
      features: [
        'Everything in Pro',
        'Annual exclusive content',
        'Early access to new features',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced team features'
      ],
      cta: 'Save with Annual',
      popular: false
    }
  ];

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-section">
          <div className="glass-enhanced rounded-2xl p-8 text-center content-spacing-lg">
            <div className="visual-hierarchy">
              <h1 className="page-title text-white mb-8 drop-shadow-2xl">
                Choose Your Plan
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                TruFlo follows a freemium model. Start for free and upgrade to unlock advanced AI tools, 
                device sync, and exclusive rewards.
              </p>
            </div>
          </div>
        </div>

        <div className="page-section">
          <div className="content-grid content-grid-3 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`glass-card rounded-2xl p-8 relative ${
                  plan.popular ? 'ring-2 ring-purple-400/50 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/70 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-white/80 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <span className="text-green-400 flex-shrink-0">✓</span>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:-translate-y-0.5'
                      : 'glass-button hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="page-section">
          <div className="glass-enhanced rounded-2xl p-8 text-center">
            <h2 className="section-heading text-white mb-4">Additional Revenue Streams</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              We also generate revenue through personalized short ads that actually help users discover 
              relevant productivity tools and resources, ensuring our platform remains sustainable while 
              providing value to our community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}