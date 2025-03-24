// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    
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
    
    // Check if OTP is valid
    if (pendingUser.otp !== otp) {
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }
    
    // Check if OTP is expired
    if (new Date() > pendingUser.otpExpiresAt) {
      return NextResponse.json(
        { message: "Verification code has expired" },
        { status: 400 }
      );
    }
    
    // Create verified user in the actual users table
    const user = await prisma.user.create({
      data: {
        name: pendingUser.name,
        email: pendingUser.email,
        phone: pendingUser.phone,
        password: pendingUser.password,
        linkedInUrl: pendingUser.linkedInUrl,
        emailVerified: new Date(),
      },
    });
    
    // Delete pending user record
    await prisma.pendingUser.delete({
      where: {
        id: pendingUser.id,
      },
    });
    
    return NextResponse.json({
      message: "Email verified successfully",
      verified: true
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
