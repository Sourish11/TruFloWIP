export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 text-center py-6 mt-10">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} TruFlo. All rights reserved.
      </div>
      <div className="mt-2">
        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> · 
        <a href="/terms" className="text-blue-600 hover:underline ml-2">Terms & Conditions</a>
      </div>
    </footer>
  );
}