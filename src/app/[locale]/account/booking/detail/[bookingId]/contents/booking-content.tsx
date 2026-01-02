import { bookerInfoType } from "@/types/booking";

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
                <span className="text-[18px] font-semibold">Booking Information</span>
            </div>
            <div className="flex flex-col px-[20px]">
                <span className="md:text-[14px] font-semibold">Lead guest</span>
                <span className="md:text-[14px]">{booker?.firstName} {booker?.lastName}</span>
            </div>
            <div className="w-full border border-gray-200"></div>
            <div className="flex flex-col px-[20px]">
                <span className="md:text-[14px] font-semibold">Pick up location</span>
                <span className="md:text-[14px]">{pickUpLocation}</span>
            </div>
            <div className="w-full border border-gray-200"></div>
            <div className="flex flex-col px-[20px]">
                <span className="md:text-[14px] font-semibold">Special request</span>
                <span className="md:text-[14px]">{specialRequest ? specialRequest : 'No Special request'}</span>
            </div>
            <div className="w-full border border-gray-200"></div>
            <div className="flex flex-col px-[20px] mb-[20px]">
                <span className="md:text-[14px] font-semibold">Booked capacity</span>
                <span className="md:text-[14px]">{ adult && `${adult} adult` }{ child && `, ${child} child` }</span>
                {
                    group !== 0 && <span className="md:text-[14px]">{group} people</span>
                }
            </div>
        </div>
    )
}