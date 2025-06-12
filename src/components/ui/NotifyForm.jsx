import { useState } from 'react';
import { joinEarlyAccess } from '../../hooks/joinEarlyAccess';

export default function NotifyForm() {
  const { notify } = joinEarlyAccess();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Dummy submit handler using async notify
  const handleSubmit = async (e) => {
    e.preventDefault();
    await notify(email); // Simulate API call
    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-4 max-w-md">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Notify Me
        </button>
      </form>
      {submitted && (
        <div className="text-green-600 mt-2">
          Thank you! You will receive an email shortly!
        </div>
      )}
    </div>
  );
}