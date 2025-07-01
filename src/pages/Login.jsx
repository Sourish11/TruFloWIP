import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import MoodPickerModal from "../components/ui/MoodPickerModal";

export default function Login() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const navigate = useNavigate();

  // Wait for page to fully load before showing modal
  useEffect(() => {
    const handleLoad = () => {
      setPageLoaded(true);
      // Show mood picker modal after a short delay when page loads
      setTimeout(() => {
        setShowMoodPicker(true);
      }, 500);
    };

    if (document.readyState === 'complete') {
      setPageLoaded(true);
      setTimeout(() => {
        setShowMoodPicker(true);
      }, 500);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      if (!error) {
        navigate('/app');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoodSelect = (mood) => {
    // Change page background based on mood
    const body = document.body;
    body.className = body.className.replace(/mood-\w+/g, '');
    body.classList.add(`mood-${mood.label.toLowerCase()}`);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold text-white font-heading">
              Welcome Back
            </h1>
            <p className="text-white/70 font-body">
              Sign in to your TruFlo account
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              {error && (
                <Card className="p-3 bg-red-500/20 border-red-400/30">
                  <p className="text-red-300 text-sm font-body">{error}</p>
                </Card>
              )}
              
              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-white/70 font-body">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-white hover:text-white/80 font-medium transition-colors font-ui"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experience TruFlo Modal - Shows when page loads */}
      {pageLoaded && (
        <MoodPickerModal
          isOpen={showMoodPicker}
          onClose={() => setShowMoodPicker(false)}
          onMoodSelect={handleMoodSelect}
        />
      )}
    </>
  );
}