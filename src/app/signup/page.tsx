"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto p-6 bg-[var(--background)] text-[var(--foreground)]">
      
      <div className="flex-1 flex flex-col justify-center gap-6 mt-12 mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-4">
          Create a free profile to discover your learning plan
        </h1>

        <div className="space-y-4">
          <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold border-2 bg-transparent hover:bg-[var(--surface-strong)]">
            {/* Simple Google G SVG */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </Button>
          
          <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold border-2 bg-transparent hover:bg-[var(--surface-strong)]">
            {/* Simple Apple SVG */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 13.921c-.015-2.38 1.95-3.526 2.042-3.585-1.11-1.61-2.834-1.83-3.414-1.854-1.442-.143-2.81.841-3.541.841-.715 0-1.848-.824-3.033-.801-1.536.02-2.955.882-3.743 2.235-1.597 2.748-.408 6.81 1.144 9.027.765 1.09 1.66 2.302 2.857 2.257 1.157-.043 1.602-.733 2.992-.733 1.39 0 1.796.733 3.011.71 1.23-.021 2.015-1.11 2.766-2.186.87-1.258 1.23-2.477 1.248-2.54-.027-.01-2.313-.878-2.329-3.371zM15.111 7.55c.636-.763 1.066-1.823.948-2.884-1.05.042-2.314.692-2.969 1.455-.519.601-1.033 1.684-.897 2.716 1.173.088 2.28-.624 2.918-1.287z"/>
            </svg>
          </Button>
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-[var(--border)]"></div>
          <span className="flex-shrink-0 mx-4 text-[var(--muted)] text-sm font-bold tracking-widest">OR</span>
          <div className="flex-grow border-t border-[var(--border)]"></div>
        </div>

        <div className="space-y-4 relative">
          <Input 
            type="email" 
            placeholder="Email" 
            className="w-full h-14 rounded-2xl border-2 text-lg px-4 focus-visible:ring-0 focus-visible:border-black dark:focus-visible:border-white"
          />
          <div className="absolute right-[-40px] top-1">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
          
          <Button className="w-full rounded-2xl h-14 text-lg font-bold bg-[#333333] hover:bg-[#222222] text-white dark:bg-[#e5e5e5] dark:text-black dark:hover:bg-[#cccccc]">
            Sign up
          </Button>
        </div>

        <p className="text-center text-sm text-[var(--muted)] px-4 mt-2">
          By clicking Sign up, I agree to Brilliant's{" "}
          <Link href="#" className="underline">Terms</Link> and{" "}
          <Link href="#" className="underline">Privacy Policy</Link>.
        </p>
      </div>

      <div className="pb-8 text-center">
        <p className="text-lg">
          Existing user? <Link href="/login" className="font-bold underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}