'use client'

import Link from "next/link"
import { Button } from "./ui/button"
import { LayoutDashboard } from "lucide-react"
import { useUserRole } from "@/hooks/useUserRole"

export default function Dashboard(){

    const { isCandidate, isLoading } = useUserRole()

    if(isCandidate || isLoading) return null


    if(isCandidate) return null

    return(
        <Link href={"/dashboard"} >
            <Button>
                <LayoutDashboard />
                Dashboard    
            </Button>        
        </Link>
    )
}