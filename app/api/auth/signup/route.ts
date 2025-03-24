// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { generateOTP, sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password, linkedInUrl } = await req.json();
    console.log("Received data:", { name, email, phone, linkedInUrl });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Check if there's an existing pendingUser entry
    const existingPendingUser = await prisma.pendingUser.findUnique({
      where: {
        email,
      },
    });

    // Generate OTP for email verification
    const otp = generateOTP();
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 2); // 2 minutes expiry

    if (existingPendingUser) {
      // Update existing pending user record
      await prisma.pendingUser.update({
        where: {
          email,
        },
        data: {
          name,
          phone,
          linkedInUrl,
          password: hashedPassword,
          otp,
          otpExpiresAt: expiryTime,
        },
      });
    } else {
      // Create new pending user
      await prisma.pendingUser.create({
        data: {
          name,
          email,
          phone,
          linkedInUrl,
          password: hashedPassword,
          otp,
          otpExpiresAt: expiryTime,
        },
      });
    }
    console.log("Pending user stored with OTP:", otp);

    // Send verification email with OTP
    await sendVerificationEmail(email, name, otp);
    console.log("Verification email sent");

    return NextResponse.json({ 
      message: "Verification code sent. Please verify your email." 
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}