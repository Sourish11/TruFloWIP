import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import AccessCodeModal, {
  isAccessGranted,
} from "../components/ui/AccessCodeModal";

export default function Signup() {
  const { signup, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  // Check access on component mount
  useEffect(() => {
    const accessGranted = isAccessGranted();
    setHasAccess(accessGranted);

    if (!accessGranted) {
      setShowAccessCodeModal(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Double-check access before allowing signup
    if (!hasAccess || !isAccessGranted()) {
      setShowAccessCodeModal(true);
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      await signup(email, password);
      if (!error) {
        navigate("/app");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccessGranted = () => {
    setHasAccess(true);
    setShowAccessCodeModal(false);
  };

  return (
    <>
      {/* Access Code Modal */}
      <AccessCodeModal
        isOpen={showAccessCodeModal}
        onAccessGranted={handleAccessGranted}
        onClose={() => setShowAccessCodeModal(false)}
      />

      {/* Only show signup form if access is granted */}
      {hasAccess && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <Card className="w-full max-w-md animate-fade-in">
            <CardHeader className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">
                Create Account
              </h1>
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText="Must be at least 6 characters"
                  required
                />

                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                {(localError || error) && (
                  <Card className="p-3 bg-red-500/20 border-red-400/30">
                    <p className="text-red-300 text-sm">
                      {localError || error}
                    </p>
                  </Card>
                )}

                <Button
                  type="submit"
                  loading={isLoading}
                  className="w-full"
                  size="lg"
                >
                  Create Account
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/70">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-white hover:text-white/80 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Subtitle below the card */}
          <p className="text-white/80 text-center mt-6 max-w-md">
            Join TruFlo and start your productivity journey
          </p>
        </div>
      )}
    </>
  );
}
