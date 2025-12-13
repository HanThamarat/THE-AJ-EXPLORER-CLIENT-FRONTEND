import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | The AJ Explorer",
  description: "Checkout | The AJ Explorer",
};

interface CheckoutLayoutProps {
    children: React.ReactNode;
}

export default function CheckoutLayout({
    children
}: CheckoutLayoutProps) {
    return(
        <>
            {children}
        </>
    )
}