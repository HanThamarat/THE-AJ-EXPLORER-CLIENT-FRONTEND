"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { bookingtSelector } from "@/app/store/slice/bookingSlice";
import { useSession } from "next-auth/react";
import { getBookingDetail } from "@/app/store/slice/bookingSlice";

export default function BookingDetailPage() {

    const { bookingId } = useParams();
    const dispatch = useAppDispatch();
    const { booking_detail } = useSelector(bookingtSelector);
    const router = useRouter();
    const isFetching = useRef(false);
    const { data: session } = useSession();

    useEffect(() => {

        if(!bookingId) return router.back();

        if (!session) return;

        const fetchData = async () => {
            if (isFetching.current) return;
            const data = {
                bookingId: bookingId as string,
                accessToken: session?.authToken as string,
            }
            isFetching.current = true;
            await dispatch(getBookingDetail(data));
            isFetching.current = false;
        }

        fetchData();

    }, [bookingId, session]);

    useEffect(() => {
        console.log(booking_detail);
    }, [booking_detail]);

    return(
        <>
            <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px] flex flex-col gap-[35px]">

            </div>
        </>
    )
}