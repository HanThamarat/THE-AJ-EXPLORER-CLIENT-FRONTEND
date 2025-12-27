import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "My Trip | The AJ Explorer",
  description: "My Trip | The AJ Explorer",
};

interface BookingLayoutProps {
    children: React.ReactNode;
}

export default function BookingLayout({
    children
}: BookingLayoutProps) {
    return(
        <>
            {children}
        </>
    )
}