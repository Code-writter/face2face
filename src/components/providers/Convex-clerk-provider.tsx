'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk} from 'convex/react-clerk'
import { useAuth } from '@clerk/nextjs'
import React from 'react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
 
export default function ConvexClerkProvider({children} : {children : React.ReactNode}){
    return (
        <ClerkProvider publishableKey={"pk_test_aW1tdW5lLWNoYW1vaXMtOTcuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {children}
        </ConvexProviderWithClerk>
      </ClerkProvider>
    )
}