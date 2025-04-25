import ContrastCheckerApp from "@/components/ContrastCheckerApp";

export const metadata = {
  title: "Advanced Nested Contrast Checker | WCAG Accessibility Tool",
  description:
    "Free web tool to test color contrast in deeply nested UI layers. WCAG 2.1 compliant. Supports accessibility grading (AA/AAA), nested layers, and live preview.",
  keywords:
    "nested contrast checker, color contrast tool, WCAG 2.1, accessibility, UI contrast, accessibility tool, design contrast, recursive contrast checker, tailwind contrast checker, accessibility testing, AA AAA contrast, web accessibility tool",
};

export default function Home() {
  return (
    <main className="min-h-screen inter bg-gradient-to-b from-gray-50 to-gray-100">
      <ContrastCheckerApp />
    </main>
  );
}
