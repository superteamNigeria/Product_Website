function Loading() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-[#0A0D14] text-gray-700 dark:text-gray-300">
      {/* Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#E6F3ED] dark:border-[#20232D] rounded-full"></div>
        <div className="w-16 h-16 border-4 border-[#2D986C] dark:border-[#2D986C] border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>

      {/* Loading Text */}
      <p className="text-lg font-regular mt-4 text-[#2D986C] dark:text-[#2D986C]">Loading...</p>
    </section>
  );
}

export default Loading;