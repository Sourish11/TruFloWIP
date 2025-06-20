import { useTheme } from "../context/ThemeContext";

export default function SettingsSection() {
  const { theme, setTheme } = useTheme();
  console.log("Current theme:", theme);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Theme:</label>
        <button
          className={`px-4 py-2 rounded ${theme === "dark" ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
      {/* Add more settings here */}
    </div>
  );
}