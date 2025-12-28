"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { bookingtSelector, findMyTrip } from "@/app/store/slice/bookingSlice";
import { useCreateQueryString } from "@/app/hooks/createQueryParams";
import PackageSekeleton from "@/app/components/loader/package-skeleton";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Image from "next/image";
import CvButton from "@/app/components/CvButton/CvButton";
import useMediaQuery from "@/app/hooks/mediaQuery";
import Notfound from "@/app/assets/images/svg/404-notfund.svg";

dayjs.extend(LocalizedFormat);

export default function BookingPage() {

    const searchPatams = useSearchParams();
    const page = searchPatams.get("page");
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const { loading, my_trip } = useSelector(bookingtSelector);
    const isFaching = useRef<boolean>(false);
    const createQueryString = useCreateQueryString();
    const router = useRouter();
    const pathname = usePathname();
    const isMd = useMediaQuery("(min-width: 768px)");
    
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        my_trip !== null && loading ? setIsLoading(true) : setIsLoading(false);
    }, [loading]);

    useEffect(() => {
        setIsLoading(true);

        if (session) {
            const fecthData = async () => {
                if (isFaching.current) return;
                const data = {
                    page: page as string,
                    accessToken: session?.authToken as string,
                }
                isFaching.current = true;
                await dispatch(findMyTrip(data));
                isFaching.current = false

                setIsLoading(false);
            };

            fecthData();
        }
    }, [page, session, dispatch]);

    const BookingMenu = [
        {
            "key": "upcoming",
            "value": "Upcoming"
        },
        {
            "key": "cancaled",
            "value": "Canceled"
        },
        {
            "key": "completed",
            "value": "Completed"
        },
    ];

    const handleChangePage = (value: string) => {
        const query = createQueryString({
            page: value
        });
        router.push(`${pathname}?${query}`);
    };

    return(
        <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px] flex flex-col gap-[35px]">
            <div className="flex flex-col gap-[5px] mt-[45px]">
                <span className="text-[18px] font-semibold">My Trip</span>
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-[5px] bg-white rounded-[10px] p-[5px]">
                    {
                        BookingMenu.map((data, key) => (
                            <div 
                                key={key} 
                                className={`w-full cursor-pointer duration-100 ease-in-out ${ data.key === page ? 'text-[#613DC1] bg-[#613DC1]/15' : '' } rounded-[5px] flex justify-center items-center py-[8px]`}
                                onClick={() => handleChangePage(data.key)}
                            >
                                <span className="font-medium">{data.value}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className="w-full">
                {
                    isLoading ? 
                    <PackageSekeleton />
                    :
                    my_trip?.length !== 0 ?
                    <div className="flex flex-col gap-[24px]">
                        {
                            my_trip?.map((data, key) => (
                                <div key={key} className="w-full flex flex-col gap-[10px]">
                                    <div className="flex flex-col">
                                        <span className="text-[18px] font-medium">{data.province_name}</span>
                                        <span className="text-[14px] font-medium">{dayjs(data.trip_date).format("ll")}</span>
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        {
                                            data.booking_detail.map((item, key) => (
                                                <div 
                                                    key={key} 
                                                    className="bg-white flex flex-col md:flex-row rounded-[20px]"
                                                    onClick={() => {
                                                        !isMd && router.push("/");
                                                    }}
                                                >
                                                    <div className="h-[250px] w-full md:w-[300px] rounded-[20px] overflow-hidden">
                                                        <Image 
                                                            src={item.package.packageMainImage.base64 as string} 
                                                            alt=""
                                                            width={0}
                                                            height={0}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="p-[10px] w-full flex flex-col justify-between">
                                                        <div className="flex flex-col gap-[10px]">
                                                            <div className="flex justify-between">
                                                                <span className="font-semibold text-[18px] line-clamp-2 text-ellipsis">{item.package.packageName}</span>
                                                                <div className={`flex items-center gap-[10px] py-[5px] px-[10px] rounded-[10px] ${ item.bookingStatus === 'panding' && 'bg-[#FFA500]/10' } ${ item.bookingStatus === 'confirmed' && 'bg-[#ECFDF3]' } ${ item.bookingStatus === 'failed' && 'bg-[#F44336]/10' }`}>
                                                                    <div className={`w-[8px] h-[8px] rounded-full ${ item.bookingStatus === 'panding' && 'bg-[#FFA500]/50' } ${ item.bookingStatus === 'failed' && 'bg-[#F44336]/50' } ${ item.bookingStatus === 'confirmed' && 'bg-[#12B76A]' }`}></div>
                                                                    <span className={`${ item.bookingStatus === 'panding' && 'text-[#FFA500]/70' } ${ item.bookingStatus === 'failed' && 'bg-[#F44336]/70' } ${ item.bookingStatus === 'confirmed' && 'bg-[#027A48]' }`}>{item.bookingStatus}</span>
                                                                </div>
                                                            </div>
                                                            <span>Booking ID: {item.bookingId}</span>
                                                            <span>Trip at {dayjs(data.trip_date).format("ll")}</span>
                                                        </div>
                                                        <div className="w-full md:flex justify-end hidden">
                                                            <div className="w-200px]">
                                                                <CvButton
                                                                    label="Manage Booking"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className="w-full bg-white rounded-[20px] p-[20px] flex flex-col items-center justify-center">
                        <Image src={Notfound} alt="" className="w-[150px] md:w-[300px]" />
                        <span className="text-[18px] font-semibold">No data Found</span>
                        <span>No data are currently available.</span>
                    </div>
                }
            </div>
        </div>
    )
}