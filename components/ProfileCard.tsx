"use client";
import React from "react";
import Image from 'next/image';
import { cn } from "@/lib/utils";

// User Profile Card Component
const UserProfileCard = ({
  name = "Hiring",
  imageSrc = "/favicon.ico",
  className,
}: {
  name?: string;
  imageSrc?: string;
  className?: string;
}) => {
  return (
    <div className={cn(
      "border-3 border-black rounded-lg p-2 flex items-center gap-3 shadow-md w-full max-w-xs",
      className
    )}>
      {/* Avatar Image */}
      <div className="h-10 w-10 relative">
        <Image
          src={imageSrc}
          alt={`${name}'s profile`}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>
      
      {/* Name/Title */}
      <div className="flex-1">
        <div className="h-2 bg-zinc-700 rounded w-3/4 mb-2"></div>
        <div className="h-2 bg-zinc-700 rounded w-1/2 mb-2"></div>
        <p className="text-gray-400 text-sm">{name}</p>
      </div>
    </div>
  );
};

export { UserProfileCard };