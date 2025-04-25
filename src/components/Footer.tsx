// src/components/Footer.jsx
export default function Footer() {
    return (
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Advanced Nested Contrast Checker | WCAG 2.1 Compliance Tool</p>
          <p className="mt-2">Built with Next.js and Tailwind CSS</p>
          <p className="mt-4">
            <a 
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
              WCAG 2.1 Accessibility Guidelines
            </a>
          </p>
        </div>
      </footer>
    );
  }