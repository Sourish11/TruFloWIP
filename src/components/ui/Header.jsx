import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Button } from './Button';
import trufloLogo from '../../assets/truflo-logo.png';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [auth]);

  // Close menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  const handleTryForFree = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: '/', label: 'Home', onClick: handleHomeClick },
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="glass-nav rounded-full px-6 py-3 animate-fade-in">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img
                src={trufloLogo}
                alt="TruFlo Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-white font-heading">
                TruFlo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="text-white/90 hover:text-white transition-colors duration-300 font-medium text-sm relative group font-ui"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-white/90 hover:text-white transition-colors duration-300 font-medium text-sm relative group font-ui"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-white/80 font-medium font-body">
                    Welcome, {user.email.split('@')[0]}
                  </span>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => navigate('/app')}
                  >
                    Dashboard
                  </Button>
                </div>
              ) : (
                <Button
                  variant="glass"
                  size="sm"
                  onClick={handleTryForFree}
                >
                  Try for Free
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors mobile-menu-container"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-open mobile-menu-container">
          <div className="mobile-menu-content">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <img
                  src={trufloLogo}
                  alt="TruFlo Logo"
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-white font-heading">
                  TruFlo
                </span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-4 mb-8">
              {navItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="block w-full text-left text-white/90 hover:text-white transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/10 font-medium text-lg font-ui"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block text-white/90 hover:text-white transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/10 font-medium text-lg font-ui"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Auth Section */}
            <div className="space-y-4">
              {user ? (
                <>
                  <div className="text-center py-4">
                    <p className="text-white/80 font-medium font-body mb-4">
                      Welcome, {user.email.split('@')[0]}
                    </p>
                    <Button
                      variant="glass"
                      onClick={() => {
                        navigate('/app');
                        setIsMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  variant="glass"
                  onClick={handleTryForFree}
                  className="w-full"
                >
                  Try for Free
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}