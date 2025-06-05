import { Link } from 'react-router-dom';
import trufloLogo from '../../assets/truflo-logo.png';

export default function Header() {
  return (
<header className="mt-21 sticky top-4 z-50 w-[70%] mx-auto bg-black/30 backdrop-blur-md rounded-full px-8 py-4 flex justify-between items-center shadow-lg">
      
      {/* Logo */}
      <Link to="/">
        <img
          src={trufloLogo}
          alt="TruFlo Logo"
          className="h-10 w-auto"
        />
      </Link>

      {/* Navigation */}
      <nav className="flex gap-4 text-sm md:text-base text-gray-300">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <Link to="/about" className="hover:text-white transition-colors">About</Link>
        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        <Link to="/discover" className="hover:text-white transition-colors">Discover</Link>
        <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
        <Link to="/support" className="hover:text-white transition-colors">Support</Link>
      </nav>
    </header>
  );
}
