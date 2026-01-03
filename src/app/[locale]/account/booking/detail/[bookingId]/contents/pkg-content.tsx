
import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import dayjs from "dayjs";
import Localized from "dayjs/plugin/localizedFormat";
import { useTranslations } from "next-intl";
dayjs.extend(Localized);

interface PackageInfoProps {
    isLoading: boolean;
    bookingId?: string;
    trip_at?: string | Date;
    pkgName?: string;
    pkgImage?: string;
}

export default function PackageInfo({
    isLoading,
    bookingId,
    trip_at,
    pkgName,
    pkgImage
}: PackageInfoProps) {
    const t = useTranslations("booking");
    return(
        isLoading ?
        <div className="w-full flex flex-col gap-[24px] bg-white p-[20px] rounded-[20px]">
            <div className="w-full bg-gray-200 rounded-[10px] h-[100px] md:h-[180px] animate-pulse ease-linear">

            </div>
            <div className="flex flex-col gap-[5px]">
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[10px] rounded-full"></div>
            </div>
        </div>
        :
        <div className="flex flex-col bg-white rounded-[20px] w-full">
            <div className="w-full rounded-t-[20px] h-[120px] md:h-[280px] overflow-hidden">
                <Image src={pkgImage as string} alt="" width={0} height={0} className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-full flex flex-col md:flex-row">
                <div className="w-full flex flex-col gap-[10px] p-[20px]">
                    <span className="md:text-[16px] font-semibold line-clamp-2 text-ellipsis">{pkgName}</span>
                    <span className="md:text-[16px] font-semibold">{t("trip_at")} {dayjs(trip_at).format("ll")}</span>
                </div>
                <div className="border border-gray-200">
                </div>
                <div className="w-full p-[20px]">
                    <button
                        className="cursor-pointer flex items-center gap-[5px] text-[#613DC1]"
                    >
                        <MdOutlineEmail className="text-[20px]" />
                        <p>{t("get_booking_confirmation")}</p>
                    </button>
                </div>
            </div>
        </div>
    );
}