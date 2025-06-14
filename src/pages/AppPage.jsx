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
        <div className="flex h-screen w-screen bg-neutral-950 text-white">
            {/* Left Pane */}
            <div className="w-1/5 h-full bg-neutral-900 p-6 flex flex-col">
                <div className="font-bold text-lg mb-8">{user.email}</div>
                {/* Add navigation or menu items here */}
                <button
                    className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded"
                    onClick={() => {
                        signOut(getAuth());
                        navigate("/login");
                    }}
                >
                    Log Out
                </button>
            </div>
            
            {/* Right Pane */}
            <div className="flex-1 h-full p-10">
                {/* Main app content goes here */}
                <h1 className="text-3xl font-bold mb-4">Welcome to TruFlo!</h1>
                <p>This is your dashboard.</p>
            </div>
        </div>
    );
}