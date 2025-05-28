import { useTheme } from "./themeprovider";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleChange = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isDark}
        onChange={handleChange}
      />
      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-indigo-600 rounded-full peer transition-colors duration-300"></div>
      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow peer-checked:translate-x-5 transition-transform duration-300" />
    </label>
  );
};
