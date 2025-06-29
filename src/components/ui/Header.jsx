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

  const handleHomeClick = (e) => {
    e.preventDefault();
    // Scroll to the top of the page smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleTryForFree = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  const navItems = [
    { href: '#', label: 'Home', onClick: handleHomeClick },
    { href: '/#about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/support', label: 'Support' },
  ];

  return (
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
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors duration-300 font-medium text-sm relative group font-ui"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
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
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      item.onClick(e);
                      setIsMenuOpen(false);
                    }}
                    className="text-white/90 hover:text-white transition-colors duration-300 py-2 font-medium text-left font-ui"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-white/90 hover:text-white transition-colors duration-300 py-2 font-medium font-ui"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <div className="pt-3 border-t border-white/20">
                {user ? (
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => {
                      navigate('/app');
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => {
                      handleTryForFree();
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Try for Free
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}