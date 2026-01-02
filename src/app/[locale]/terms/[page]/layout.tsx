import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The AJ Explorer",
    description: "The AJ Explorer",
  };

interface TermLayoutProps {
    children: React.ReactNode;
}

export default function TermLayout({
    children
}: TermLayoutProps) {
    return(
        <>
            {children}
        </>
    );
}