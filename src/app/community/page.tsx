'use client'
import React from 'react'
import { useUser } from "@clerk/nextjs";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

function Page() {

    const { isSignedIn, user } = useUser();

    if (isSignedIn) {
        return (
            <>
                <main className="flex min-h-screen flex-col items-left gap-y-5 px-10 py-20 md:p-24 text-white max-w-2xl">
                    <h1 className="text-2xl font-bold">Hey there, {user.fullName}</h1>
                    <p>
                        Welcome to the community.
                    </p>
                    <UserButton />
                </main>
            </>
        ) 
    }


    return (
        <main className="flex min-h-screen flex-col items-left gap-y-5 px-10 py-20 md:p-24 text-white max-w-2xl">
            Please sign in..
            <div>
                <SignInButton mode="modal" fallbackRedirectUrl="/community">

                    <button className="px-4 py-1 border border-white hover:bg-blue-600">
                        <span>Sign in</span>
                    </button>
                </SignInButton>
            </div>
            
                

        </main>
    )
}

export default Page
