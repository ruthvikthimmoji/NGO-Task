import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-black dark:via-zinc-900 dark:to-zinc-800 px-6 sm:px-12 py-16 font-[family-name:var(--font-geist-sans)]">

      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto flex flex-col gap-6 items-center">
        <Image
          src="next.svg" // replace with your NGO logo
          alt="NGO Logo"
          width={100}
          height={100}
          className="dark:invert"
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
          Empowering Change, One Step at a Time
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl">
          Join us in our mission to bring transparency and impact through collaboration.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/login?role=admin">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition">
              Admin Login
            </button>
          </Link>
          <Link href="/login?role=ngo">
            <button className="bg-white hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 border border-gray-300 dark:border-zinc-600 text-gray-800 dark:text-white px-6 py-3 rounded-full text-lg font-semibold transition">
              NGO Login
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-3 items-center">
        <div className="flex gap-6 justify-center">
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:underline">Next.js</a>
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Vercel</a>
          <a href="mailto:contact@yourngo.org" className="hover:underline">Contact Us</a>
        </div>
        <p>© {new Date().getFullYear()} Your NGO Name. All rights reserved.</p>
      </footer>
    </div>
  )
}
