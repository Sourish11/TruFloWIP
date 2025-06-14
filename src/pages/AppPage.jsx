import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        navigate("/login");
      }
    });
    return unsubscribe;
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}!</h1>
        <p className="mb-8">This is your app dashboard.</p>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            onClick={() => {
                signOut(getAuth());
                navigate("/login");
            }}
        >
        Log Out
        </button>
    </div>
  );
}