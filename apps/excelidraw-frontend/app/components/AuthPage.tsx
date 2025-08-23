"use client";

import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";

interface Credentials {
  name: string;
  email: string;
  password: string;
}

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // To prevent hydration error: only render form after mounting on client
  useEffect(() => {
    
    setIsClient(true);

    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const signUpAndSignin = async ({ name, email, password }: Credentials) => {
    if(isSignin === false) {
      
      if (!email || !password) {
        alert("Email and password are required");
        return;
      }
      try {
        const res = await axios.post(`${BACKEND_URL}/signup`, {
          name,
          email,
          password,
        });
        console.log("Response:", res.data);
        return res.data;
      } catch (e) {
        console.error("Error signing in:", e);
      }
    }

    if(isSignin === true){
      if (!email || !password) {
        alert("Email and password are required");
        return;
      }
      try {
        const res = await axios.post(`${BACKEND_URL}/signin`, {
          email,
          password,
        });
        const token = res.data.token
        localStorage.setItem('token',token);
        if(token){
          router.replace('/dashboard')
        }
        return res.data;
      } catch (e) {
        console.error("Error signing in:", e);
      }
    }
    
  };

  if (!isClient) {
    return null; // Avoid rendering on SSR to fix hydration mismatch
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-gray-900 via-gray-900 to-gray-800">
      <div className="m-2 bg-white rounded-2xl shadow-2xl flex flex-col gap-y-7 px-12 py-10 min-w-[320px] max-w-sm w-full items-center">
        <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 bg-clip-text mb-3">
          {isSignin ? "Sign In" : "Sign Up"}
        </h2>
        {!isSignin && (
          <div className="w-full">
            <Input
              type="text"
              placeholder="Name"
              className=""
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="w-full">
          <Input
            type="email"
            placeholder="Email"
            className=""
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Input
            type="password"
            placeholder="Password"
            className="text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          size="lg"
          variant="primary"
          className="w-full font-bold tracking-wide mt-2 p-1 rounded-sm"
          onClick={() => signUpAndSignin({ name, email, password })}
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </Button>
        <div className="text-sm text-gray-600 mt-2">
          {isSignin ? (
            <>
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/signin" className="text-blue-500 hover:underline">
                Sign In
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
