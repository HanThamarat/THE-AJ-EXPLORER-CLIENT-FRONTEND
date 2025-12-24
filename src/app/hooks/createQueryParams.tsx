"use client"

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCreateQueryString = () => {

    const searchParams = useSearchParams();

    return useCallback(
        (values: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(values).forEach(([key, value]) => {
            params.set(key, value);
            });

            return params.toString();
        },
        [searchParams]
    );
}