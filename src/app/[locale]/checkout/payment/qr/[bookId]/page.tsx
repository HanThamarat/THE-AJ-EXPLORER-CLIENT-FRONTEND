"use client"

import { useParams } from "next/navigation"
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { generateQrCodePayment } from "@/app/store/slice/paymentSlice";
import { paymentSelector } from "@/app/store/slice/paymentSlice";
import { useSession } from "next-auth/react";
import { currencyConvertToThai } from "@/app/hooks/currencyConvert";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useRouter } from "next/navigation";
import { useCreateQueryString } from "@/app/hooks/createQueryParams";
import notify from "@/app/components/CvAlert/toastify";

dayjs.extend(LocalizedFormat);

export default function QrCodePaymentPage() {

    const { bookId } = useParams();
    const dispatch = useAppDispatch();
    const { qrcode } = useSelector(paymentSelector);
    const isFaching = useRef(false);
    const { data: session } = useSession();
    const router = useRouter();
    const createQueryString = useCreateQueryString();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const query = createQueryString({
        steper: "3",
    });

    useEffect(() => {
        if (!session) return;

        const fecthData = async () => {
            if (isFaching.current) return;
            const data = {
                bookid: bookId as string,
                accessToken: session?.authToken
            }
            isFaching.current = true;
            await dispatch(generateQrCodePayment(data));
            isFaching.current = false;
        };

        intervalRef.current = setInterval(fecthData, 6000);
        
        return () => {
            if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            }
        };
    }, [dispatch, session, bookId]);

    useEffect(() => {
        if (!qrcode) return;

        if (qrcode.paid || qrcode.failure_code) {
            if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            }
        }
    }, [qrcode]);

    useEffect(() => {
        if (qrcode) {
            if ((qrcode.expired_at && qrcode.paid !== true) || qrcode.failure_code) {
                notify({
                    type: "error",
                    label: "Booking failed, Please try again later",
                    postion: "top-center"
                });
                router.push('/');
            }


            if (qrcode.paid === true) {
                const timer = setTimeout(() => {
                    router.push(`/checkout?${query}`);
                }, 4000);

                return () => clearTimeout(timer);
            }
        }
    }, [qrcode, query, router]); 

    return(
        <>
        <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px] mt-[40px]">
            <div className="flex justify-center">
                <div className="bg-white rounded-[20px] p-[20px]">
                    {
                        qrcode ?
                        <div className="w-[250px] md:w-[400px] overflow-hidden rounded-[10px]">
                            <img
                                src={qrcode.source.scannable_code.image.download_uri}
                                alt="PromptPay QR"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        :
                        <div className="w-[250px] md:w-[400px] h-[300px] md:h-[500px] bg-gray-200 animate-pulse ease-linear rounded-[10px]"></div>
                    }
                    <div className="flex flex-col gap-[10px] mt-[10px] justify-center items-center">
                        {
                            qrcode ?
                            <span className="md:text-[16px] font-medium">Booking ID: {bookId}</span>
                            :
                            <div className="w-[200px] h-[14px] rounded-[4px] bg-gray-200 animate-pulse ease-linear"></div>
                        }
                        {
                            qrcode ?
                            <div className="flex items-center gap-[5px]"><span className="md:text-[16px] font-medium">Payment Status: </span>
                                {
                                    qrcode.paid === true ?
                                    <div className="bg-[#ECFDF3] px-[8px] py-[4px] rounded-full flex items-center gap-[5px]">
                                        <div className="w-[10px] h-[10px] rounded-full bg-[#12B76A]"></div>
                                        <span className="text-[#027A48] font-medium">Paid</span>
                                    </div>
                                    :
                                    <div className="bg-[#FFA500]/10 px-[8px] py-[4px] rounded-full flex items-center gap-[5px]">
                                        <div className="w-[10px] h-[10px] rounded-full bg-[#FFA500]/50"></div>
                                        <span className="text-[#FFA500]/70 font-medium">Panding</span>
                                    </div>
                                }
                            </div>
                            :
                            <div className="w-[200px] h-[14px] rounded-[4px] bg-gray-200 animate-pulse ease-linear"></div>
                        }
                        {
                            qrcode ?
                            <span className="md:text-[16px] font-medium">{currencyConvertToThai(qrcode.amount / 100)} THB</span>
                            :
                            <div className="w-[200px] h-[14px] rounded-[4px] bg-gray-200 animate-pulse ease-linear"></div>
                        }
                        {
                            qrcode ?
                            <span>QR expires on {dayjs(qrcode.expires_at).format("lll")}</span>
                            :
                            <div className="w-[200px] h-[14px] rounded-[4px] bg-gray-200 animate-pulse ease-linear"></div>
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}