import { bookerInfoType } from "@/types/booking";
import { useTranslations } from "next-intl";

interface BookingInfoContentProps {
    isLoading: boolean;
    booker?: bookerInfoType;
    pickUpLocation?: string;
    specialRequest?: string | null;
    adult?: number | null;
    child?: number | null;
    group?: number | null;
}

export default function BookingInfoContent({
    isLoading,
    booker,
    pickUpLocation,
    specialRequest,
    adult,
    child,
    group
}: BookingInfoContentProps) {
    const t = useTranslations("booking");
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
                <span className="text-[18px] font-semibold">{t("booking_information")}</span>
            </div>
            <div className="flex flex-col px-[20px]">
                <span className="md:text-[14px] font-semibold">{t("lead_guest")}</span>
                <span className="md:text-[14px]">{booker?.firstName} {booker?.lastName}</span>
            </div>
            <div className="w-full border border-gray-200"></div>
            <div className="flex flex-col px-[20px]">
                <span className="md:text-[14px] font-semibold">{t("pick_up_location")}</span>
                <span className="md:text-[14px]">{pickUpLocation}</span>
            </div>
            <div className="w-full border border-gray-200"></div>
            <div className="flex flex-col px-[20px]">
                <span className="md:text-[14px] font-semibold">{t("special_request")}</span>
                <span className="md:text-[14px]">{specialRequest ? specialRequest : t("no_special_request")}</span>
            </div>
            <div className="w-full border border-gray-200"></div>
            <div className="flex flex-col px-[20px] mb-[20px]">
                <span className="md:text-[14px] font-semibold">{t("booked_capacity")}</span>
                <span className="md:text-[14px]">{ adult && `${adult} ${t("adult")}` }{ child && `, ${child} ${t("child")}` }</span>
                {
                    group !== 0 && <span className="md:text-[14px]">{group} {t("people")}</span>
                }
            </div>
        </div>
    )
}