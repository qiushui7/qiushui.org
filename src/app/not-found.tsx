import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen text-white py-20 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="border border-white text-white px-6 py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
