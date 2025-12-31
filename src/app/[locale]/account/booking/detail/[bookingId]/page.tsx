"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react";

export default function BookingDetailPage() {

    const { bookingId } = useParams();
    const router = useRouter();

    useEffect(() => {

        if(!bookingId) return router.back();

        console.log(bookingId);
        

    }, [bookingId]);

    return(
        <>
            <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px] flex flex-col gap-[35px]">

            </div>
        </>
    )
}