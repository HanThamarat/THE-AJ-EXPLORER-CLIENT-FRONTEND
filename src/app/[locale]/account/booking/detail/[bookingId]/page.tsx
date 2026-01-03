"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { bookingtSelector } from "@/app/store/slice/bookingSlice";
import { useSession } from "next-auth/react";
import { getBookingDetail } from "@/app/store/slice/bookingSlice";
import { IoIosArrowBack } from "react-icons/io";
import { useTranslations } from "next-intl";
import HeaderBookingContent from "./contents/header-content";
import PackageInfo from "./contents/pkg-content";
import BookingInfoContent from "./contents/booking-content";
import PaymentInfoContent from "./contents/payinfo-content";

export default function BookingDetailPage() {

    const { bookingId } = useParams();
    const dispatch = useAppDispatch();
    const { booking_detail } = useSelector(bookingtSelector);
    const router = useRouter();
    const isFetching = useRef(false);
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const t = useTranslations("booking");

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
        booking_detail && setIsLoading(false);
    }, [booking_detail]);

    return(
        <>
            <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px] flex flex-col gap-[35px]">
                <div>
                    <button
                        className="mt-[45px] flex items-center gap-[5px] rounded-[10px] py-[10px] pl-[5px] pr-[10px] hover:bg-gray-200 duration-100 ease-in-out"
                        onClick={() => router.back()}
                    >
                        <IoIosArrowBack className="text-[18px]" />
                        <span>{t("back_to_bookings")}</span>
                    </button>
                </div>
                <HeaderBookingContent
                    isLoading={isLoading}
                    bookingId={booking_detail?.bookingzId}
                    bookingStatus={booking_detail?.bookingStatus}
                    trip_at={booking_detail?.trip_at}
                />
                <PackageInfo
                    isLoading={isLoading}
                    bookingId={booking_detail?.bookingzId}
                    trip_at={booking_detail?.trip_at}
                    pkgName={booking_detail?.packageName}
                    pkgImage={booking_detail?.packageImage}
                />
                <BookingInfoContent
                    isLoading={isLoading}
                    booker={booking_detail?.bookerInfo}
                    pickUpLocation={booking_detail?.pickUpLocation}
                    specialRequest={booking_detail?.specialRequest}
                    adult={booking_detail?.booked_info.adult}
                    child={booking_detail?.booked_info.child}
                    group={booking_detail?.booked_info.group}
                />
                <PaymentInfoContent
                    isLoading={isLoading}
                    payment={booking_detail?.booked_info}
                />
            </div>
        </>
    )
}