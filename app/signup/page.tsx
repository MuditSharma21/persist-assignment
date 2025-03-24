// app/signup/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Import signIn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Form schema
const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const router = useRouter();
  const linkedInUrl = typeof window !== "undefined" ? sessionStorage.getItem("linkedInUrl") || "" : "";

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const startTimer = () => {
    setTimeLeft(120);
    setTimerActive(true);
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setTimerActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return timer;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          password: data.password, // Send password to backend
          linkedInUrl,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to sign up");
      }
      
      // Start OTP verification process
      setShowOtpInput(true);
      const timerInterval = startTimer();
      
      toast.success("Verification code sent. Please check your email.");

      // Cleanup timer on unmount
      return () => clearInterval(timerInterval);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.getValues("email"),
          otp,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to verify OTP");
      }
      
      toast.success("Email verified successfully! Logging you in...");
      
      // Sign in the user after verification
      const signInResult = await signIn("credentials", {
        email: form.getValues("email"),
        password: form.getValues("password"),
        redirect: false,
      });
      
      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }
      
      // Redirect to dashboard after successful verification and login
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (timerActive) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.getValues("email"),
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to resend OTP");
      }
      
      // Restart timer
      startTimer();
      
      toast.success("A new verification code has been sent to your email.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] h-screen">
      <div className="container max-w-md mx-auto py-12 ">
        <Card className="bg-transparent text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {showOtpInput ? "Verify Your Email" : "Create Your Account"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showOtpInput ? (
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="placeholder:text-gray-400"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" type="email" {...field} className="placeholder:text-gray-400"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91-9897804250" {...field} className="placeholder:text-gray-400"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a password" {...field} className="placeholder:text-gray-400"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your password" {...field} className="placeholder:text-gray-400"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-white text-black hover:bg-black hover:text-white" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </FormProvider>
            ) : (
              <div className="space-y-4">
                <div className="text-center text-sm text-gray-300 mb-4">
                  We&apos;ve sent a verification code to {form.getValues("email")}
                </div>
                <div className="space-y-2">
                  <label>Enter Verification Code</label>
                  <Input
                    placeholder="6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="placeholder:text-gray-300 mt-2"
                  />
                </div>
                <Button 
                  onClick={verifyOtp} 
                  className="w-full bg-white text-black hover:bg-black hover:text-white" 
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </Button>
                <div className="text-center space-y-2 mt-4">
                  <div className="text-sm">
                    {timeLeft > 0 ? (
                      <>Code expires in {formatTime(timeLeft)}</>
                    ) : (
                      <>Code expired</>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resendOtp}
                    disabled={isLoading || timerActive}
                    className="text-sm"
                  >
                    Resend verification code
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}