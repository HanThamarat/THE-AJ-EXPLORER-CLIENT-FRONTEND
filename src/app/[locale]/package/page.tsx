"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AllPackagePage() {

    const searchParams = useSearchParams();
    const provinceId = searchParams.get("provinceId");
    const packageName = searchParams.get("packageName");

    useEffect(() => {
        console.log(provinceId, packageName);
    }, []);

    return(
        <>
        </>
    )
}