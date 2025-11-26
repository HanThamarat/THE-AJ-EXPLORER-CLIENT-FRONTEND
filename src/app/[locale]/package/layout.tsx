import React from "react";
import SearchComponent from './components/search';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The AJ Explorer | packages",
  description: "The AJ Explorer | packages",
};

export default async function PackageLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return(
        <div className="w-full bg-gray-100">
            <SearchComponent />
            {children}
            <div className="h-[50px]"></div>
        </div>
    );
};