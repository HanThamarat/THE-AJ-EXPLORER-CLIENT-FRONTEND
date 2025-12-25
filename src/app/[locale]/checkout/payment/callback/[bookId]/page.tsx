"use client"

import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { createChargeWithMobileBanking, paymentSelector } from "@/app/store/slice/paymentSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCreateQueryString } from "@/app/hooks/createQueryParams";
import CvDotLoader from "@/app/components/loader/CvdotLoader";
import notify from "@/app/components/CvAlert/toastify";

export default function PaymentCallbackPage() {

    const { bookId } = useParams();
    const dispatch = useAppDispatch();
    const { mobile_banking } = useSelector(paymentSelector);
    const isFaching = useRef(false);
    const router = useRouter();
    const createQueryString = useCreateQueryString();
    const query = createQueryString({
        steper: "3",
        bookingId: bookId as string,
    });

    const { data: session } = useSession();

    useEffect(() => {
        const fecthData = async () => {
            if (isFaching.current) return;

            const mbData = {
                data: {
                    bookingId: bookId as string
                },
                accessToken: session?.authToken,
            }

            isFaching.current = true;
            await dispatch(createChargeWithMobileBanking(mbData));   
            isFaching.current = false;
        }

        if (session) {
            fecthData();
        }
    }, []);

    useEffect(() => {

        if (mobile_banking) {
            if ((mobile_banking.expired_at && mobile_banking.paid !== true) || mobile_banking.failure_code) {
                notify({
                    type: "error",
                    label: "Booking failed, Please try again later",
                    postion: "top-center"
                });
                router.push('/');
            }

            if (mobile_banking.paid) {
                router.push(`/checkout?${query}`);
            }

        }

    }, [mobile_banking]);

    return(
        <>
            <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px] mt-[40px]">
                <div className="w-full px-[20px] py-[50px] bg-white rounded-[20px] items-center flex flex-col gap-[24px]">
                    <CvDotLoader Colors="#04080F" />
                    <div className="items-center flex flex-col items-center">
                        <span className="md:text-[18px] font-medium">Please wait, do not to close this page</span>
                        <span className="md:text-[16px] font-medium">We try to rediract you to complete page.</span>
                    </div>
                </div>
            </div>
        </>
    );
}