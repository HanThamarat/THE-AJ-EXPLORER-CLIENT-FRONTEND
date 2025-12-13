import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { packageSelector } from "@/app/store/slice/packageSlice";
import { getPackageDetail } from "@/app/store/slice/packageSlice";
import Image from "next/image";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { currencyConvertToThai } from "@/app/hooks/currencyConvert";
dayjs.extend(LocalizedFormat);

interface TicketInfoProps {
    packageId: number;
    tripDate: string;
    amountPrice: number;
    adultQty: number;
    childQty: number;
    groupQty: number;
}

export default function TicketInfo({
    packageId,
    tripDate,
    amountPrice,
    adultQty,
    childQty,
    groupQty
}: TicketInfoProps) {

    const dispatch = useAppDispatch();
    const { packageDetail } = useSelector(packageSelector);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isFaching = useRef<boolean>(false);

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
                <span className="text-[16px] font-medium">{currencyConvertToThai(amountPrice)} THB</span>
            </div>
            <span className="text-gray-500">Includes taxes and charges</span>
        </div>
    );
}