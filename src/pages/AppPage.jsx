import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "../components/ui/Button";

const sections = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "challenges", label: "Challenges", icon: "🎯" },
    { key: "leaderboard", label: "Leaderboard", icon: "🏆" },
    { key: "profile", label: "Profile", icon: "👤" },
    { key: "settings", label: "Settings", icon: "⚙️" },
];

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

export default function AppPage() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (u) => {
            if (u) {
                setUser(u);
                const userDoc = await getDoc(doc(db, "users", u.uid));
                setUsername(userDoc.exists() ? userDoc.data().username || "" : "");
            } else {
                navigate("/login");
            }
        });
        return unsubscribe;
    }, [navigate, location.key]);

    const handleLogout = async () => {
        await signOut(getAuth());
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 glass-nav transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                {getGreeting()}
                            </h2>
                            <p className="text-sm text-white/70">
                                {username || user.email}
                            </p>
                        </div>
                        <button
                            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {sections.map((section) => (
                            <NavLink
                                key={section.key}
                                to={`/app/${section.key}`}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                        isActive 
                                            ? "bg-white/20 text-white font-medium shadow-lg" 
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                    }`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="text-lg">{section.icon}</span>
                                <span>{section.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-white/10">
                        <Button
                            variant="glass"
                            onClick={handleLogout}
                            className="w-full"
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <div className="lg:hidden glass-nav p-4">
                    <div className="flex items-center justify-between">
                        <button
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-lg font-semibold text-white">
                            TruFlo
                        </h1>
                        <div className="w-10" />
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}