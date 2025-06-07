function Loading() {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-[#0A0D14] text-gray-700 dark:text-gray-300">
        {/* Spinner */}
        <svg
          className="animate-spin -ml-1 mr-3 h-20 w-20 text-indigo-600 dark:text-green-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
  
        {/* Loading Text */}
        <p className="text-2xl font-semibold mt-4">Loading...</p>
      </section>
    );
  }
  
  export default Loading;