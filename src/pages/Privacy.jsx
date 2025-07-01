export default function Privacy() {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.'
    },
    {
      title: 'Information Sharing',
      content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.'
    },
    {
      title: 'Data Security',
      content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.'
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us at privacy@truflo.app.'
    }
  ];

  return (
    <div className="page-layout">
      <div className="page-content">
        <div className="page-section">
          <div className="glass-enhanced rounded-2xl p-8 content-spacing-lg">
            <div className="visual-hierarchy">
              <h1 className="page-title text-white mb-8 drop-shadow-2xl">
                Privacy Policy
              </h1>
              <div className="text-white/80 space-y-2">
                <p>Last updated: January 2025</p>
                <p className="text-lg">
                  At TruFlo, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, and protect your information when you use our services.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="page-section">
          <div className="content-wrapper">
            {sections.map((section, index) => (
              <div key={index} className="glass-card rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 drop-shadow-md">
                  {section.title}
                </h2>
                <p className="text-white/80 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="page-section">
          <div className="glass-enhanced rounded-2xl p-8 text-center">
            <h2 className="section-heading text-white mb-4">Questions?</h2>
            <p className="text-white/80 mb-6">
              If you have any questions about our Privacy Policy or how we handle your data, 
              we're here to help.
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