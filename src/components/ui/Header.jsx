import { Link } from 'react-router-dom';
import trufloLogo from '../../assets/truflo-logo.png';

export default function Header() {
  return (
    <header className="-mt-21 sticky top-4 z-50 w-[70%] mx-auto bg-black/30 backdrop-blur-md rounded-full px-8 py-4 flex justify-between items-center shadow-lg">
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
        <a href="#home" className="hover:text-white transition-colors">Home</a>
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        <a href="#discover" className="hover:text-white transition-colors">Discover</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
        <a href="#support" className="hover:text-white transition-colors">Support</a>
      </nav>
    </header>
  );
}
