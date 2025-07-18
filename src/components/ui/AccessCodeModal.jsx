import { useState } from "react";
import { Card, CardContent, CardHeader } from "./Card";
import { Button } from "./Button";
import { Input } from "./Input";

// The universal access code for the application
const TRUFLO_ACCESS_CODE = "TRUFLO2024";

export default function AccessCodeModal({ isOpen, onAccessGranted, onClose }) {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      if (accessCode.trim().toUpperCase() === TRUFLO_ACCESS_CODE) {
        // Store access granted in localStorage to persist across sessions
        localStorage.setItem("truflo_access_granted", "true");
        localStorage.setItem("truflo_access_timestamp", Date.now().toString());
        onAccessGranted();
        setAccessCode("");
      } else {
        setError("Invalid access code. Please try again.");
      }
      setIsLoading(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4">
        <Card className="glass-enhanced shadow-2xl border-2 border-purple-400/50 animate-fade-in">
          <CardHeader className="text-center relative">
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 flex items-center justify-center text-white/70 hover:text-white"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            )}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-2 border-purple-400/30 rounded-full flex items-center justify-center">
                <span className="text-3xl">🔐</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white font-heading mb-2">
              Access Required
            </h2>
            <p className="text-white/70 font-body">
              Enter the access code to continue to TruFlo
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                label="Access Code"
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  setError(""); // Clear error when user starts typing
                }}
                error={error}
                className="text-center text-lg tracking-wider font-mono"
                required
                autoFocus
              />

              {error && (
                <Card className="p-3 bg-red-500/20 border-red-400/30">
                  <p className="text-red-300 text-sm font-body text-center">
                    {error}
                  </p>
                </Card>
              )}

              <Button
                type="submit"
                loading={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                size="lg"
              >
                🚀 Grant Access
              </Button>
            </form>

            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-white font-semibold mb-2 text-sm">
                💡 Access Code Info
              </h3>
              <ul className="text-white/70 text-xs space-y-1 font-body">
                <li>• This code is required for all TruFlo access</li>
                <li>• Contact your administrator if you need the code</li>
                <li>• Access is granted for this browser session</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Utility function to check if access is currently granted
export const isAccessGranted = () => {
  const granted = localStorage.getItem("truflo_access_granted");
  const timestamp = localStorage.getItem("truflo_access_timestamp");

  if (!granted || granted !== "true") return false;

  // Optional: Add expiration logic (e.g., access expires after 24 hours)
  if (timestamp) {
    const grantedTime = parseInt(timestamp);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (now - grantedTime > twentyFourHours) {
      // Access expired, clear it
      localStorage.removeItem("truflo_access_granted");
      localStorage.removeItem("truflo_access_timestamp");
      return false;
    }
  }

  return true;
};
