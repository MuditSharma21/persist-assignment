// app/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "next-auth/react";
import { ArrowLeft } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] h-screen">
      <div className="container mx-auto py-12 px-4 ">
        <Card className="max-w-4xl mx-auto bg-transparent text-white">
          <CardHeader>
            <CardTitle className="text-2xl">
              <div className="flex items-center gap-x-2">
                <Button 
                className="gap-2 bg-transparent mt-0.5 cursor-pointer hover:text-purple-500"
                onClick={() => router.push("/")}
                >
                  <ArrowLeft className="size-8"/>
                </Button>
                Welcome to Your Dashboard
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Account Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-300">Name</p>
                    <p className="font-medium">{session?.user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Email</p>
                    <p className="font-medium">{session?.user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold">Your Career Progress</h2>
                <p className="mt-2 text-gray-400">
                  Welcome to your personalized dashboard! Here you can track your career acceleration progress
                  and access resources to help you reach your goals.
                </p>
                <div className="mt-4 bg-transparent p-6 rounded-lg shadow-[inset_0px_0px_20px_-3px_rgba(_255,_255,_255,.5)]">
                  <p className="font-medium">Getting Started</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Complete your profile to unlock personalized recommendations</li>
                    <li>Explore job opportunities matched to your skills</li>
                    <li>Access premium resources to accelerate your career growth</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end text-black ">
                <Button 
                  variant="outline" 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="hover:bg-black hover:text-white"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}