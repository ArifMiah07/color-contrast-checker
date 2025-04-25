import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 text-center max-w-md mb-6">
        Oops! The page you`&apos;re looking for doesn`&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
}
