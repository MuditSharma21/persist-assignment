"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { CA } from "../CALogo/CA"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useSession } from "next-auth/react"

export const Navbar = () => {
    const { data: session, status } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-between items-center mx-4 md:mx-10 lg:mx-30 my-4 p-4 md:p-6 rounded-2xl gap-x-2 bg-[rgba(255,255,255,0.2)] backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
                <div className="text-2xl md:text-3xl font-semibold flex items-center">
                    <CA />
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-x-6 lg:gap-x-10 items-center text-white">
                    <Link href={'/'} className="hover:text-black">Home</Link>
                    <Link href={'/search-for-jobs'} className="hover:text-black">Search for Jobs</Link>
                    <Link href={'/start-hiring'} className="hover:text-black">Start Hiring</Link>
                </div>
                
                {/* Conditional Login / Dashboard Button */}
                <div className="hidden md:block">
                    {status === "authenticated" ? (
                        <Link href={'/dashboard'}>
                            <Button className="text-sm py-4 px-6 lg:py-6 lg:px-9 bg-[rgb(149,126,234)] rounded-xl text-white hover:text-black flex gap-x-2 border shadow-[inset_0px_5px_20px_-3px_rgba(_255,_255,_255,1)]">
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <Link href={'/login'}>
                            <Button className="text-sm py-4 px-6 lg:py-6 lg:px-9 bg-[rgb(149,126,234)] rounded-xl text-white hover:text-black flex gap-x-2 border shadow-[inset_0px_5px_20px_-3px_rgba(_255,_255,_255,1)]">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
                
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-white"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            
            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-[rgba(30,30,30,0.95)] backdrop-blur-sm text-white p-4 flex flex-col space-y-4 rounded-b-xl mx-4">
                    <Link 
                        href={'/'}
                        className="py-2 px-4 hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        href={'/search-for-jobs'}
                        className="py-2 px-4 hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Search for Jobs
                    </Link>
                    <Link 
                        href={'/start-hiring'}
                        className="py-2 px-4 hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Start Hiring
                    </Link>

                    {/* Mobile version of Login / Dashboard button */}
                    {status === "authenticated" ? (
                        <Link href={'/dashboard'} onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full py-3 bg-[rgb(149,126,234)] rounded-xl text-white hover:text-black border shadow-[inset_0px_5px_20px_-3px_rgba(_255,_255,_255,1)]">
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <Link href={'/login'} onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full py-3 bg-[rgb(149,126,234)] rounded-xl text-white hover:text-black border shadow-[inset_0px_5px_20px_-3px_rgba(_255,_255,_255,1)]">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}
