import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-neutral-900 shadow">
      <div className="font-bold text-xl">TruFlo</div>
      <nav style={{ padding: '10px' }} className="flex">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/discover" className="hover:underline">Discover</Link>
        <Link to="/pricing" className="hover:underline">Pricing</Link>
        <Link to="/privacy" className="hover:underline">Privacy</Link>
        <Link to="/support" className="hover:underline">Support</Link>
      </nav>
    </header>
  );
}