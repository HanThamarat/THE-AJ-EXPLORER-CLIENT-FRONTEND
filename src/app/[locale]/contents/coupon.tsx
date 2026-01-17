import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { couponSelector, getCouponList } from "@/app/store/slice/couponSlice";
import { useSession } from "next-auth/react";

export default function Coupon() {

    const dispatch = useAppDispatch();
    const { coupon_list } = useSelector(couponSelector);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isFaching = useRef(false);
    const { data: session, status } = useSession();

    useEffect(() => {

        if (status === 'loading') return;

        if (session) {
            const fecthCoupon = async () => {
                if (isFaching.current) return;
                isFaching.current = true;
                await dispatch(getCouponList(session.authToken));
                isFaching.current = false;
            };

            fecthCoupon();
        } else {
            const fecthCoupon = async () => {
                if (isFaching.current) return;
                isFaching.current = true;
                await dispatch(getCouponList());
                isFaching.current = false;
            };

            fecthCoupon();
        }
        
    }, [dispatch, status, session]);

    useEffect(() => {
        if (coupon_list !== null) {
            setIsLoading(false);
        }
    }, [coupon_list]);

    if (isLoading) {
        return(
           <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto flex gap-[20px]">
                <div className="w-full h-[150px] flex flex-col gap-[20px] rounded-[10px] bg-white animate-pulse duration-100 ease-in-out"></div>
                <div className="w-full h-[150px] flex flex-col gap-[20px] rounded-[10px] bg-white animate-pulse duration-100 ease-in-out"></div>
                <div className="hidden md:block w-full h-[150px] flex flex-col gap-[20px] rounded-[10px] bg-white animate-pulse duration-100 ease-in-out"></div>
                <div className="hidden md:block w-full h-[150px] flex flex-col gap-[20px] rounded-[10px] bg-white animate-pulse duration-100 ease-in-out"></div>
            </div>
        );
    }

    if (isLoading && coupon_list?.items.length === 0) {
        return null;
    }
    
    return(
        <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto flex overflow-x-scroll overflow-hidden no-scrollbar gap-[20px]">
            {
                coupon_list?.items.map((item, key) => (
                    <div key={key} className="min-w-[200px] md:min-w-[300px] flex flex-col gap-[20px] rounded-[15px] md:rounded-[20px] bg-white">
                        <div className="w-full rounded-t-[15px] md:rounded-t-[20px] flex justify-center bg-primary items-center py-[10px]">
                            <span className="text-white font-medium md:text-[16px]">SALE COUPON</span>
                        </div>
                        <div className="flex flex-col">
                            <div className="px-[10px] flex items-end justify-center w-full">
                                <span className="text-[24px] md:text-[34px] text-primary font-bold">{item.maxPercentDiscount}</span>
                                <span className="text-[16px] mb-[5px] md:text-[24px] text-primary font-semibold md:mb-[4px]">%OFF</span>
                            </div>
                            <div className="px-[10px] text-[16px] md:text-[20px] mt-[-9px] md:mt-[-12px] line-clamp-1 text-ellipsis text-primary font-semibold w-full flex justify-center">
                                <span>{item.couponName}</span>
                            </div>
                        </div>
                        <div className="px-[10px] mb-[10px]">
                             <button
                                className="cursor-pointer text-primary hover:bg-primary hover:text-white duration-100 ease-in-out text-[14px] font-semibold border-primary w-full border flex justify-center items-center py-[10px] rounded-full"
                            >
                                Apply Coupon
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}