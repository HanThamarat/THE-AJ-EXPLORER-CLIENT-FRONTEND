import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "The AJ Explorer | Blog",
  description: "The AJ Explorer",
};


export default async function BlogLayout({
    children
}: {
    children: React.ReactNode,
}) {
    return(
        <>
        {children}
        </>
    );
};