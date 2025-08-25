import { Button } from "@repo/ui/button";
import { ArrowRight, Code, Lock, Pen, Users } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Glassy Navbar */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Auth buttons */}
        <div className="absolute top-6 right-6 z-20 flex items-center space-x-3">
          <Button className="gradient-hero" variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="default" size="sm">
            Sign Up
          </Button>
        </div>

        <div className="container px-6 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Pen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Excalidraw</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Virtual whiteboard for{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                sketching
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create beautiful hand-drawn like diagrams, wireframes, and
              collaborate in real-time. Free, open source, and private by
              default.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="group shadow-glow">
                Start Drawing Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View Examples
              </Button>
            </div>

            {/* Hero Image */}
            <div className="pt-12">
              <div className="relative rounded-2xl overflow-hidden shadow-card bg-card max-w-4xl mx-auto">
                <img
                  src="https://id-preview--53a9b201-905a-4c01-8d7a-bfde845e318f.lovable.app/assets/excalidraw-hero-D86sI-Ki.jpg"
                  alt="Excalidraw interface showing hand-drawn diagrams"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-foreground">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Real-time Collaboration</h3>
              <p className="text-muted-foreground text-sm">
                Share a link and start drawing together instantly
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent">
                <Lock className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Privacy First</h3>
              <p className="text-muted-foreground text-sm">
                End-to-end encrypted and stored locally in your browser
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent">
                <Code className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Open Source</h3>
              <p className="text-muted-foreground text-sm">
                Built in the open, use it for free forever
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-foreground py-8">
        <div className="container px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Pen className="h-5 w-5 text-primary" />
              <span className="font-semibold">Excalidraw</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ by the Sagar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
