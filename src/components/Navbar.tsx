import { CodeIcon, Video } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Dashboard from "./Dashboard";

export default function Navbar(){
    return(
        <nav className=" border-b" >
            <div className=" flex h-16 items-center px-4 container mx-auto" >
                {/* LOGO */}
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
                >
                  <Video className="size-8 text-gray-500" />
                  <span className="bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent">
                    Face2Face
                  </span>
                </Link>
                {/* Right side and protected routes */}

                <SignedOut>
                    <SignInButton />
                </SignedOut>

                <SignedIn>
                    <div className=" flex iteams-center space-x-4 ml-auto " >
                        <Dashboard />
                        <ModeToggle />
                        <UserButton />
                    </div>
                </SignedIn>

            </div>

        </nav>
    )
}