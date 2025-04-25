interface InfoPanelProps {
    isDarkMode: boolean;
  }
  
  export default function InfoPanel({ isDarkMode }: InfoPanelProps) {
    console.log(isDarkMode)
    return (
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200">
        <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">WCAG 2.1 Guidelines</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">AA - Normal text</p>
            <p className="text-gray-600 dark:text-gray-400">≥ 4.5:1</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">AA - Large text</p>
            <p className="text-gray-600 dark:text-gray-400">≥ 3:1</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">AAA - Normal text</p>
            <p className="text-gray-600 dark:text-gray-400">≥ 7:1</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">AAA - Large text</p>
            <p className="text-gray-600 dark:text-gray-400">≥ 4.5:1</p>
          </div>
        </div>
  
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm text-blue-800 dark:text-blue-300">
          <p>Large text is defined as:</p>
          <ul className="list-disc ml-5 mt-1">
            <li>Bold text at least 14 point</li>
            <li>Regular text at least 18 point (24px)</li>
          </ul>
        </div>
      </div>
    );
  }
  