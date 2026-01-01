import { currencyConvertToThai } from "@/app/hooks/currencyConvert";
import { bookedCapacityInfoType } from "@/app/types/booking";

interface PaymentInfoContentProps {
    isLoading: boolean;
    payment?: bookedCapacityInfoType;
}

export default function PaymentInfoContent({
    isLoading,
    payment
}: PaymentInfoContentProps) {
    return(
        isLoading ?
        <div className="w-full flex flex-col gap-[10px] rounded-[20px] bg-white p-[20px]">
             <div className="flex flex-col gap-[5px]">
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
            </div>
             <div className="flex flex-col gap-[5px]">
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
            </div>
             <div className="flex flex-col gap-[5px]">
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
            </div>
             <div className="flex flex-col gap-[5px]">
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
            </div>
        </div>
        :
        <div className="w-full bg-white rounded-[20px] flex flex-col gap-[15px]">
            <div className="px-[20px] mt-[24px]">
                <span className="text-[18px] font-semibold">Payment Information</span>
            </div>
            {
                payment?.adult !== 0 &&
                <div className="flex justify-between px-[20px] md:text-[14px] font-medium">
                    <span>{payment?.adult} x adult</span>
                    <span>{currencyConvertToThai(payment?.adultPrice as number)} THB</span>
                </div>
            }
            {
                payment?.child !== 0 &&
                <div className="flex justify-between px-[20px] md:text-[14px] font-medium">
                    <span>{payment?.child} x child</span>
                    <span>{currencyConvertToThai(payment?.childPrice as number)} THB</span>
                </div>
            }
            {
                payment?.group !== 0 &&
                <div className="flex justify-between px-[20px] md:text-[14px] font-medium">
                    <span>{payment?.group} x group</span>
                    <span>{currencyConvertToThai(payment?.groupPrice as number)} THB</span>
                </div>
            }
            <div className="w-full border border-gray-200"></div>
            <div className="w-full flex justify-between items-start px-[20px] mb-[20px]">
                <div className="flex flex-col">
                    <span className="text-[16px] font-medium">Total</span>
                    <span className="text-gray-600">Includes taxes and charges</span>
                </div>
                <span className="text-[16px] font-semibold">{currencyConvertToThai(payment?.totalPrice as number)} THB</span>
            </div>
        </div>
    );
}