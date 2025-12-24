"use client"

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CheckoutLayoutProps {
    children: React.ReactNode;
}

export default function CheckoutLayout({
    children
}: CheckoutLayoutProps) {

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return null;
    }

    if (!session) {
        router.back(); 
        return null;
    }

    return(
        <>
            {children}
        </>
    )
}