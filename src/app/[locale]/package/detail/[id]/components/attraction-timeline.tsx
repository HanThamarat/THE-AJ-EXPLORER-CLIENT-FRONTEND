import { packageAttractionEntity } from "@/app/types/package";
import { SlLocationPin } from "react-icons/sl";
import dayjs from "dayjs";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { useTranslations } from "next-intl";

interface AttractionTimelineProps {
    packageAttraction: packageAttractionEntity[] | null
}

export default function AttractionTimeline({
    packageAttraction
}: AttractionTimelineProps){

    const [showmore, setShowmore] = useState<boolean>(false);
    const t = useTranslations("package_detail");

    return (
        <>
            <span className="text-[18px] font-semibold text-gray-800">{t("itinerary_information")}</span>
            {
                packageAttraction !== null && packageAttraction.length <= 4  ? 
                <div className={`grid grid-cols-1 gap-[10px] mt-[20px]`}>
                    {
                        packageAttraction !== null && packageAttraction.map((data, key) => (
                            <div key={key} className="flex items-start gap-[10px]">
                                <div className="grid grid-cols-1 gap-[5px]">
                                    <SlLocationPin className="text-[24px] text-gray-500" />
                                    <div className="flex justify-center">
                                        <div className="h-[50px] w-0 border rounded-full border-gray-500"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-[10px]">
                                    <span className="font-medium">Stop at: {data.attractionName}</span>
                                    <div className="flex items-center gap-[5px]">
                                        <FaRegClock className="text-[18px] text-gray-600" />
                                        <span className="text-gray-600"> {dayjs(data.attractionTime).format('h A')}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                <div className="w-full">
                    <div className={`grid grid-cols-1 gap-[10px] mt-[20px] ${ showmore ? '' : 'max-h-[330px] overflow-y-hidden' } `}>
                        {
                            packageAttraction !== null && packageAttraction.map((data, key) => (
                                <div key={key} className="flex items-start gap-[10px]">
                                    <div className="grid grid-cols-1 gap-[5px]">
                                        <SlLocationPin className="text-[24px] text-gray-500" />
                                        <div className="flex justify-center">
                                            <div className="h-[50px] w-0 border rounded-full border-gray-500"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-[10px]">
                                        <span className="font-medium">Stop at: {data.attractionName}</span>
                                        <div className="flex items-center gap-[5px]">
                                            <FaRegClock className="text-[18px] text-gray-600" />
                                            <span className="text-gray-600"> {dayjs(data.attractionTime).format('h A')}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button className="underline text-blue-700 cursor-pointer" onClick={() => setShowmore(!showmore)}>Show more</button>
                </div>
            }
        </>
    );
}