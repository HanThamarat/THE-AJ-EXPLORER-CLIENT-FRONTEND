import Image from "next/image";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { currencyConvertToThai } from "@/app/hooks/currencyConvert";
import { packageEntity } from "@/app/types/package";
import { useEffect, useState } from "react";
dayjs.extend(LocalizedFormat);

interface TicketInfoProps {
    tripDate: string;
    isLoading: boolean;
    packageDetail: packageEntity;
    amoutPrice: number;
    adultQty: number;
    childQty: number;
    groupQty: number;
}

export default function TicketInfo({
    isLoading,
    packageDetail,
    tripDate,
    amoutPrice,
    adultQty,
    childQty,
    groupQty
}: TicketInfoProps) {

    return(
        <div className="w-full bg-white p-[10px] rounded-[20px]">
            <div className="flex items-start gap-[10px]">
                {
                    isLoading ?
                    <div className="w-[80px] h-[80px] rounded-[10px] bg-gray-200">

                    </div>
                    :
                    <div className="w-[80px] h-[80px] rounded-[10px] overflow-hidden">
                        <Image src={packageDetail?.packageImage[0].file_base64 as string} alt="" width={0} height={0} className="w-full h-full object-cover" />
                    </div>
                }
                {
                    isLoading ?
                    <div>
                        <div className="w-[120px] h-[20px] rounded-[10px] bg-gray-200"></div>
                        <div className="mt-[5px] w-[100px] h-[10px] rounded-[10px] bg-gray-200"></div>
                    </div>
                    :
                    <div className="flex flex-col">
                        <span className="text-[16px] font-medium">{packageDetail?.packageName}</span>
                        <span>{dayjs(tripDate).format('ll')}</span>
                    </div>
                }
            </div>
            <div className="mt-[24px] flex flex-col gap-[5px]">
                {
                    (adultQty !== 0) &&
                    <span className="text-[16px] font-semibold">{adultQty} x Adults</span>
                }
                {
                    (childQty !== 0) &&
                    <span className="text-[16px] font-semibold">{childQty} x Childs</span>
                }
                {
                    (groupQty !== 0) &&
                    <span className="text-[16px] font-semibold">{groupQty} x Group</span>
                }
            </div>
            <div className="mt-[24px] flex justify-between w-full">
            <span className="text-[16px] font-medium">Total</span>
                {
                    isLoading ?
                    <div className="mt-[5px] w-[100px] h-[20px] rounded-[10px] bg-gray-200"></div>
                    :
                    <span className="text-[16px] font-medium">{currencyConvertToThai(amoutPrice)} THB</span>
                }
            </div>
            <span className="text-gray-500">Includes taxes and charges</span>
        </div>
    );
}