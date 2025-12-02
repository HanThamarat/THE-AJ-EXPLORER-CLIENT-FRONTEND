"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PackageDetail() {

    const params = useParams<{ id: string }>();
    const packageId = params.id;

    useEffect(() => {
        console.log(packageId);
    }, []);

    return(
        <>

        </>
    );
}