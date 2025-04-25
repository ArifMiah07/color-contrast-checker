interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  }
  
  export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
    return (
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Advanced Nested Contrast Checker
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? "🌞" : "🌙"}
            </button>
          </div>
        </div>
      </header>
    );
  }
  