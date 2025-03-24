// app/api/auth/resend-otp/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOTP, sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    // Find pending user
    const pendingUser = await prisma.pendingUser.findUnique({
      where: {
        email,
      },
    });
    
    if (!pendingUser) {
      return NextResponse.json(
        { message: "No pending verification found" },
        { status: 404 }
      );
    }
    
    // Generate new OTP
    const otp = generateOTP();
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 2); // 2 minutes expiry
    
    // Update pending user record with new OTP
    await prisma.pendingUser.update({
      where: {
        id: pendingUser.id,
      },
      data: {
        otp,
        otpExpiresAt: expiryTime,
      },
    });
    
    // Send verification email with new OTP
    await sendVerificationEmail(email, pendingUser.name, otp);
    
    return NextResponse.json({
      message: "New verification code sent",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}