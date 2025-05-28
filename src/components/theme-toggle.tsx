import { Moon, Sun } from "lucide-react";
import { useTheme } from "./themeprovider";
import Switch from "./ui/Swtich";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleChange = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="relative flex items-center gap-2">
      {isDark ? (
        <Sun className="w-5 h-5 text-[#6CB798]" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
      <Switch
        checked={isDark}
        onChange={handleChange}
        className={`${
          isDarkMode ? "bg-green-base" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-base focus:ring-offset-2`}
      >
        <span
          className={`${
            isDark ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
};
