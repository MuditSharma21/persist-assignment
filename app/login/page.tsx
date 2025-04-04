// app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner'
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        if (result.error === "Email not verified") {
          toast.error("Please verify your email before logging in.");
        } else {
          toast.error("Invalid email or password.");
        }
      } else {
        // Redirect to dashboard on successful login
        toast.success("Login successful! Redirecting...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] h-screen">
      <div className="container max-w-md mx-auto py-12">
      <Card className="bg-transparent text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <div className="text-red-300 text-sm mx-4">Note* : At this moment only my personal email address can be used to signin as Resend only allows that limited functionality without an official domain. Below are the login and password you can use to login -</div>
        <div>
            <div className="text-red-300 text-sm mx-4">Email - muditsharma8791@gmail.com</div>
            <div className="text-red-300 text-sm mx-4">Password - careermudit</div>
          </div>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full hover:bg-white hover:text-black" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/" className="text-blue-500 hover:underline">
                Start here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}