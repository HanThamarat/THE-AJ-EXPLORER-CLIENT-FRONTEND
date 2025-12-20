"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutHeader from "./checkout-components/header";
import TicketInfo from "./checkout-components/ticket-info";
import CustomerInfo from "./checkout-components/customer-info";
import { contractBookingDTO } from "@/app/types/booking";
import CheckPay from "./checkout-components/Check-pay";

export default function CheckOutPage() {

    const searchParams = useSearchParams();
    const packageId = searchParams.get("packageId");
    const tripDate = searchParams.get("tripDate");
    const amountPrice = searchParams.get("amountPrice");
    const adultQty = searchParams.get("adultQty");
    const childQty = searchParams.get("childQty");
    const groupQty = searchParams.get("groupQty");
    const [contractData, setContractData] = useState<contractBookingDTO>();

    const [steper, setSteper] = useState<number>(2);

    const handlerContract = async (data: contractBookingDTO) => {
        setContractData(data);
        setSteper(2);
        console.log(data);
    }

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
                        steper === 2 && <CheckPay />
                    }
                </div>
                <div className="w-full md:w-2/6">
                    <TicketInfo
                        packageId={Number(packageId)}
                        tripDate={tripDate as string}
                        amountPrice={Number(amountPrice)}
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