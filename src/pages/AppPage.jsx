import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";

const sections = [
    { key: "home", label: "Home" },
    { key: "challenges", label: "Challenges" },
    { key: "leaderboard", label: "Leaderboard" },
    { key: "profile", label: "Profile" },
    { key: "settings", label: "Settings" },
];

export default function AppPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((u) => {
            if (u) setUser(u);
            else navigate("/login");
        });
        return unsubscribe;
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="flex h-screen w-screen bg-neutral-950 text-white">
            {/* Left Pane */}
            <div className="w-1/5 h-full bg-neutral-900 p-6 flex flex-col">
                <div className="font-bold text-lg mb-8">{user.email}</div>
                <nav className="flex flex-col gap-4">
                    {sections.map((section) => (
                        <NavLink
                            key={section.key}
                            to={`/app/${section.key}`}
                            className={({ isActive }) =>
                                `text-left px-2 py-1 rounded ${isActive ? "bg-indigo-700 font-bold" : "hover:bg-neutral-800"
                                }`
                            }
                            end
                        >
                            {section.label}
                        </NavLink>
                    ))}
                </nav>
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
            <div className="flex-1 h-full p-10 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}