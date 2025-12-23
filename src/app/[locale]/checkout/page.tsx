"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CheckoutHeader from "./checkout-components/header";
import TicketInfo from "./checkout-components/ticket-info";
import CustomerInfo from "./checkout-components/customer-info";
import { ClientBookingCreateBody, contractBookingDTO } from "@/app/types/booking";
import CheckPay from "./checkout-components/Check-pay";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { getPackageDetail, packageSelector } from "@/app/store/slice/packageSlice";
import { packageEntity } from "@/app/types/package";
import { useSession } from "next-auth/react";
import { createNewBooking } from "@/app/store/slice/bookingSlice";
import { useRouter } from "next/navigation";

export default function CheckOutPage() {

    const searchParams = useSearchParams();
    const packageId = Number(searchParams.get("packageId"));
    const tripDate = searchParams.get("tripDate");
    const pkgOption = Number(searchParams.get("pkgOption"));
    const adultQty = Number(searchParams.get("adultQty"));
    const childQty = Number(searchParams.get("childQty"));
    const groupQty = Number(searchParams.get("groupQty"));
    const [amoutPrice, setAmoutPrice] = useState<number>(0);
    const [childPrice, setChildPrice] = useState<number>(0);
    const [adultPrice, setAdultPrice] = useState<number>(0);
    const [groupPrice, setGroupPrice] = useState<number>(0);
    const [contractData, setContractData] = useState<contractBookingDTO>();
    const dispatch = useAppDispatch();
    const { packageDetail } = useSelector(packageSelector);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isFaching = useRef<boolean>(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const [steper, setSteper] = useState<number>(1);

    const handlerContract = async (data: contractBookingDTO) => {
        setContractData(data);
        setSteper(2);
        console.log(data);
    }

    const handleClickCompletePayWithQr = async () => {
        const data: ClientBookingCreateBody = {
            packageId: packageId,
            childPrice: childPrice,
            childQty: childQty,
            adultPrice: adultPrice,
            adultQty: adultQty,
            groupPrice: groupPrice,
            groupQty: groupQty,
            amount: amoutPrice,
            additionalDetail: contractData?.additionalDetail,
            pickup_lat: 100.1000,
            pickup_lgn: 135.240,
            trip_at: tripDate as string,
            pickupLocation: contractData?.arrival_details,
            contractBooking: {
                userId: session?.user?.id as string,
                email: contractData?.email as string,
                firstName: contractData?.firstName as string,
                lastName: contractData?.lastName as string,
                country: contractData?.country as string,
                phoneNumber: contractData?.phoneNumber as string,
            },
            policyAccept: true
        };

        const dataformat = {
            data,
            accessToken: session?.authToken
        }

        const createNewBook: any = await dispatch(createNewBooking(dataformat));

        if (createNewBook.payload.status === true) {
            router.push(`checkout/payment/qr/${createNewBook.payload.data.bookingId}`);
        }
    };  

    useEffect(() => { 
        const fecthData = async () => {
            if (isFaching.current) return;
            isFaching.current = true;
            await dispatch(getPackageDetail(packageId));
            isFaching.current = false;
        };

        packageDetail === null && fecthData();

        packageDetail !== null && setIsLoading(false);
    }, [dispatch, packageDetail])

    useEffect(() => {
        if (adultQty > 0 || childQty > 0) {
            setAmoutPrice(0);

            if (packageDetail?.packageOption !== null) {
                const amoutAdult = (Number(packageDetail?.packageOption[pkgOption].adultPromoPrice !== 0 ? packageDetail?.packageOption[pkgOption].adultPromoPrice : packageDetail?.packageOption[pkgOption].adultPrice) * adultQty);
                const amoutchild = (Number(packageDetail?.packageOption[pkgOption].childPromoPrice !== 0 ? packageDetail?.packageOption[pkgOption].childPromoPrice : packageDetail?.packageOption[pkgOption].childPrice) * childQty);
                const amoutPrice = (amoutAdult + amoutchild);

                setChildPrice(amoutchild);
                setAdultPrice(amoutAdult);
                setAmoutPrice(amoutPrice);
            }
        }

        if (groupQty > 0) {
            setAmoutPrice(0);

            if (packageDetail?.packageOption !== null) {
                setGroupPrice(Number(packageDetail?.packageOption[pkgOption].groupPromoPrice !== 0 ? packageDetail?.packageOption[pkgOption].groupPromoPrice : packageDetail?.packageOption[pkgOption].groupPrice));
                setAmoutPrice(Number(packageDetail?.packageOption[pkgOption].groupPromoPrice !== 0 ? packageDetail?.packageOption[pkgOption].groupPromoPrice : packageDetail?.packageOption[pkgOption].groupPrice));
            }
        }
        
    }, [adultQty, childQty, groupQty, packageDetail]);

    return(
        <> 
        <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px]">
            <div className="mt-[60px]">
                <CheckoutHeader  steps={steper} />
            </div>
            <div className="flex flex-col-reverse w-full mt-[20px] md:flex-row justify-between items-start gap-[20px]">
                <div className="w-full md:w-4/6 bg-white p-[10px] rounded-[20px]">
                    {
                        steper === 1 && <CustomerInfo callBackData={handlerContract} />
                    }
                    {
                        steper === 2 && <CheckPay CompletePayWithQr={handleClickCompletePayWithQr} />
                    }
                </div>
                <div className="w-full md:w-2/6">
                    <TicketInfo
                        isLoading={isLoading}
                        packageDetail={packageDetail as packageEntity}
                        amoutPrice={amoutPrice}
                        tripDate={tripDate as string}
                        adultQty={Number(adultQty)}
                        childQty={Number(childQty)}
                        groupQty={Number(groupQty)}
                    />
                </div>
            </div>
        </div>
        </>
    );
}