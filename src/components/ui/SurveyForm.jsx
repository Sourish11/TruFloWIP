import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SurveyForm({ onClose, onComplete }) {
  const handleTakeSurvey = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      await setDoc(
        doc(db, "users", user.uid),
        { surveyCompleted: true },
        { merge: true }
      );
    }
    window.open("https://yoursurvey.com", "_blank", "noopener,noreferrer");
    onComplete();
  };

  return (
    <div className="fixed top-10 right-10 z-50">
      <div className="bg-white rounded-lg p-8 max-w-xs w-full text-center shadow-lg border border-gray-200 text-black">
        <h3 className="text-xl font-bold mb-4 text-black">Help us to get to know you better!</h3>
        <p className="mb-4 text-black">Would you like to take a quick survey?</p>
        <div className="flex gap-2 justify-center mt-2">
          <button
            className="bg-purple-600 text-white px-6 py-2 rounded"
            onClick={handleTakeSurvey}
          >
            Take Survey
          </button>
          <button
            className="bg-gray-300 text-white px-6 py-2 rounded"
            onClick={onClose}
          >
            Do this later
          </button>
        </div>
      </div>
    </div>
  );
}