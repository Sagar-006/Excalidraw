import { Button } from "@repo/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 via-purple-100 to-pink-200 flex flex-col">
      {/* Glassy Navbar */}
      <nav className="flex justify-between items-center bg-white/60 backdrop-blur-lg shadow-md px-8 py-4 rounded-b-2xl border-b border-gray-200 mx-4 mt-4">
        <div className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 bg-clip-text">
          Excalidraw <span className="font-light text-gray-700">Clone</span>
        </div>
        <div className="flex gap-x-3">
          <Link href={"/signup"}>
            <Button
              className="font-semibold shadow-md transition duration-200 hover:scale-105"
              size="lg"
              variant="outline"
              type="button"
            >
              Sign Up
            </Button>
          </Link>
          <Link href={'/signin'}>
            <Button
              size="sm"
              variant="outline"
              className="font-semibold shadow-md transition duration-200 hover:scale-105"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Centered Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl px-8 py-12 flex flex-col items-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 drop-shadow">
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text">
              Draw. Collaborate. Create.
            </span>
          </h1>
          <p className="mb-7 text-xl text-gray-700 max-w-xl">
            The best free collaborative whiteboard tool inspired by Excalidraw.
            <br />
            Real-time, beautiful, and simple—made for teams and creatives.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="font-bold px-10 py-4 text-xl shadow-lg hover:-translate-y-1 hover:shadow-2xl transition"
          >
            Start Drawing Instantly
          </Button>
        </div>
      </main>

      {/* Decorative Shapes */}
      <span className="absolute top-0 left-0 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></span>
      <span className="absolute bottom-10 right-0 w-60 h-60 bg-pink-100 rounded-full blur-3xl opacity-40 -z-10"></span>
    </div>
  );
}
