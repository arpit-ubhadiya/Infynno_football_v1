import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center justify-self-center h-full  text-center p-6 rounded-lg shadow-lg max-w-md w-screen">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl text-gray-600 mt-4">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <p className="text-lg text-gray-500 mt-2">It might have been moved, deleted, or never existed in the first place.</p>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 rounded-full transition duration-300">
        Go to Home
      </Link>
    </div>
  )
}