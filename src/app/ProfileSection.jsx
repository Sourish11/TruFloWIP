import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc, getDoc, query, collection, where, getDocs } from "firebase/firestore";

export default function ProfileSection() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load current username
  useEffect(() => {
    if (!user) return;
    const fetchUsername = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username || "");
      }
    };
    fetchUsername();
  }, [user]);

  // Handle username set/update
  const handleSetUsername = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!input) {
      setError("Username cannot be empty.");
      return;
    }
    // Check for duplicate
    const q = query(collection(db, "users"), where("username", "==", input));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setError("Username already taken. Please choose another.");
      return;
    }
    // Save username
    await setDoc(doc(db, "users", user.uid), { username: input }, { merge: true });
    setUsername(input);
    setSuccess("Username set successfully!");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <div className="font-semibold">Email: {user.email}</div>
        <div className="font-semibold mt-2">
          Username: <span>{username ? username : <span className="text-red-500">Not set</span>}</span>
        </div>
      </div>
      <form onSubmit={handleSetUsername} className="flex gap-2 items-center mb-2">
        <input
          type="text"
          placeholder="Update username..."
          className="border-2 border-black-400 bg-white text-black p-2 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white rounded px-4 py-2"
          type="submit"
        >
          Update Username
        </button>
      </form>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
    </div>
  );
}