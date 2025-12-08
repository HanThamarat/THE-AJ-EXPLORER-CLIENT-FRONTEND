"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CheckOutPage() {

    const searchParams = useSearchParams();
    const packageId = searchParams.get("packageId");
    const tripDate = searchParams.get("tripDate");
    const amountPrice = searchParams.get("amountPrice");
    const adultQty = searchParams.get("adultQty");
    const childQty = searchParams.get("childQty");
    const groupQty = searchParams.get("groupQty");

    useEffect(() => {
        console.log(packageId, tripDate, amountPrice, adultQty, childQty, groupQty);
    }, []);

    return(
        <>

        </>
    );
}