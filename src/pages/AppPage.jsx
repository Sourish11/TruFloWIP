import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import SurveyForm from "../components/ui/SurveyForm.jsx";

const sections = [
    { key: "home", label: "Home" },
    { key: "challenges", label: "Challenges" },
    { key: "leaderboard", label: "Leaderboard" },
    { key: "profile", label: "Profile" },
    { key: "settings", label: "Settings" },
];

function getGreeting() {// Function to get greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

export default function AppPage() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [showSurveyPrompt, setShowSurveyPrompt] = useState(false);

    useEffect(() => {
        const checkSurvey = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (!userDoc.exists() || !userDoc.data().surveyCompleted) {
                    setShowSurveyPrompt(true);
                }
            }
        };
        checkSurvey();
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (u) => {
            if (u) {
                setUser(u);
                // Fetch username from Firestore
                const userDoc = await getDoc(doc(db, "users", u.uid));
                setUsername(userDoc.exists() ? userDoc.data().username || "" : "");
            } else {
                navigate("/login");
            }
        });
        return unsubscribe;
    }, [navigate, location.key]); // refetch username on navigation

    if (!user) return null;
    const handleSurveyClose = () => setShowSurveyPrompt(false);
    const handleSurveyComplete = () => setShowSurveyPrompt(false);
    return (
        <div className="flex h-screen w-screen bg-white text-black dark:bg-neutral-950 dark:text-white">
            {/* Survey Form Floating on Right */}
            {showSurveyPrompt && (
                <SurveyForm onClose={handleSurveyClose} onComplete={handleSurveyComplete} />
            )}
            {/* Left Pane */}
            <div className="w-1/5 h-full bg-gray-100 text-black dark:bg-neutral-900 dark:text-white p-6 flex flex-col">
                <div className="text-2xl font-semibold mb-6">
                    {getGreeting()}
                    {username ? `, ${username}` : user.email ? `, ${user.email}` : ""}!
                </div>
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
            <div className="flex-1 h-full p-10 bg-white text-black dark:bg-neutral-950 dark:text-white overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}