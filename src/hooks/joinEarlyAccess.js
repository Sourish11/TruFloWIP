import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export function joinEarlyAccess() {
  const notify = async (email) => {
    if (!email) return;
    await addDoc(collection(db, "earlyAccess"), {
      email,
      createdAt: new Date()
    });
  };
  return { notify };
}