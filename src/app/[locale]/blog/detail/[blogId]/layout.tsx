import React from "react"

interface BlogDetailLayoutProps {
    children: React.ReactNode;
}

export default function BlogDetailLayout({
    children
}: BlogDetailLayoutProps) {
    return(
        <>
        {children}
        </>
    );
}