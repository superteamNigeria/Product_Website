import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-[#0A0D14] text-gray-700 dark:text-gray-300">
      <div className="text-7xl mb-4">🚫</div>
      <h1 className="text-3xl md:text-4xl font-semibold mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-sm md:text-base mb-6 text-gray-500 dark:text-gray-400">
        Sorry, we couldn’t find the page you were looking for.
      </p>
      <Link
        to="/"
        className="inline-block bg-gradient-to-r from-[#223FD3] to-[#DC97EF] text-white font-medium px-6 py-3 rounded-full text-sm md:text-base hover:shadow-md transition-all duration-300"
      >
        Return Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
