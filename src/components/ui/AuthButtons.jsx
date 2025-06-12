import { useNavigate } from 'react-router-dom';
// This component provides buttons for user authentication actions like login and signup.
export default function AuthButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        onClick={() => navigate('/login')}
      >
        Log In
      </button>
      <button
        className="px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50"
        onClick={() => navigate('/signup')}
      >
        Sign Up
      </button>
    </div>
  );
}