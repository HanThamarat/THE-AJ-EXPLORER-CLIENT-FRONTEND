import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FiPlus } from "react-icons/fi";
import { RiSubtractFill } from "react-icons/ri";
import { packageOptionEntity } from "@/app/types/package";
import CvButton from "@/app/components/CvButton/CvButton";
import { currencyConvertToThai } from "@/app/hooks/currencyConvert";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import notify from "@/app/components/CvAlert/toastify";
import "dayjs/locale/th";
import { useSession } from "next-auth/react";
import { AuthModal } from "@/app/[locale]/auth/auth-modal";

interface TicketStateProps {
    packageOptions: packageOptionEntity[] | null;
    packageId: number;
}

export default function TicketState({
    packageOptions,
    packageId
}: TicketStateProps) {
    const params = useParams();
    const locale = params.locale;

    dayjs.locale(locale === "th" ? "th" : "en");
    const [activePkgOption, setActivePkgOption] = useState<number>(0);
    const days = Array.from({ length: 7 }, (_, i) => dayjs().add(i + 1, "day"));
    const [selectedDate, setSelectedDate] = useState(days[0].format("YYYY-MM-DD"));
    const [adultQty, setadultQty] = useState<number>(0);
    const [childQty, setChildQty] = useState<number>(0);
    const [groupQty, setgroupQty] = useState<number>(0);
    const [amoutPrice, setAmoutPrice] = useState<number>(0);
    const [isOpenAuthModal, setIsOpenAuthModal] = useState<boolean>(false);
    const router = useRouter();
    const { data } = useSession();

    const t = useTranslations("package_detail");
    

    useEffect(() => {
        if (adultQty > 0 || childQty > 0) {
            setgroupQty(0);
            setAmoutPrice(0);

            if (packageOptions !== null) {
                const amoutAdult = (Number(packageOptions[activePkgOption].adultPromoPrice !== 0 ? packageOptions[activePkgOption].adultPromoPrice : packageOptions[activePkgOption].adultPrice) * adultQty);
                const amoutchild = (Number(packageOptions[activePkgOption].childPromoPrice !== 0 ? packageOptions[activePkgOption].childPromoPrice : packageOptions[activePkgOption].childPrice) * childQty);
                const amoutPrice = (amoutAdult + amoutchild);

                setAmoutPrice(amoutPrice);
            }
        }

        if (groupQty > 0) {
            setChildQty(0);
            setadultQty(0);
            setAmoutPrice(0);

            if (packageOptions !== null) {
                setAmoutPrice(Number(packageOptions[activePkgOption].groupPromoPrice !== 0 ? packageOptions[activePkgOption].groupPromoPrice : packageOptions[activePkgOption].groupPrice));
            }
        }
        
    }, [adultQty, childQty, groupQty]);

    const handlerClickBooking = async () => {

        if (data === null) return setIsOpenAuthModal(true);
        
        if (adultQty === 0 && childQty === 0 && groupQty === 0) {
            notify({
                type: "error",
                label: t("book_alert"),
                postion: "top-center"
            });
            return;
        }

        router.push(`/checkout?packageId=${packageId}&tripDate=${selectedDate}&pkgOption=${activePkgOption}&adultQty=${adultQty}&childQty=${childQty}&groupQty=${groupQty}&steper=1`);
    }

    const hnadlerReset = () => {
        setChildQty(0);
        setadultQty(0);
        setgroupQty(0);
        setAmoutPrice(0);
    }

    return(
        <>
        <AuthModal isOpen={isOpenAuthModal} onCancel={() => setIsOpenAuthModal(false)} />
        <div>
            <span className="text-[18px] font-semibold">{t("ticket")}</span>
        </div>
        <div className="w-full flex overflow-x-scroll gap-[10px] no-scrollbar mt-[10px]">
            {
                packageOptions?.length !== 1 && (
                    packageOptions?.map((data, key) => (
                        <div key={key} onClick={() => {
                            setActivePkgOption(key);
                            hnadlerReset();
                        }} className={`${activePkgOption === key ? 'border-[#613DC1] bg-[#613DC1]/5' : 'border-gray-200 bg-transparent' } transition-all duration-100 ease-in-out min-w-[180px] p-[10px] rounded-[5px] border cursor-pointer`}>
                            <span className={`${ activePkgOption === key ? 'text-[#613DC1]' : 'text-gray-700' } font-semibold text-[14px]`}>{data.name}</span>
                        </div>
                    ))
                )
            }
        </div>
        <div className="mt-[24px]">
            <span className="text-[18px] font-semibold">{t("search_ticket")}</span>
        </div>
        <div className="w-full flex overflow-x-scroll gap-[10px] no-scrollbar mt-[24px]">
            {days.map((date) => {
                const isSelected = selectedDate === date.format("YYYY-MM-DD");
                return (
                    <button
                        key={date.format("DD-MM-YYYY")}
                        onClick={() => setSelectedDate(date.format("YYYY-MM-DD"))}
                        className={`min-w-[80px] flex flex-col items-center justify-center rounded-[5px] border p-3 flex-shrink-0 transition-all ${
                        isSelected
                            ? "border-purple-500 bg-purple-50 text-purple-600 font-semibold"
                            : "border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                        <span className="text-sm">{date.format("ddd")}</span>
                        <span
                        className={`text-xl font-bold ${
                            isSelected ? "text-purple-700" : "text-black"
                        }`}
                        >
                        {date.format("D")}
                        </span>
                        <span className="text-sm">{date.format("MMM")}</span>
                    </button>
                );
            })}
        </div>
        <div className="mt-[24px] border border-[#613DC1] rounded-[10px] p-[10px] gird grid-cols-1 gap-[20px]">
            <div>
                <span className="text-[18px] font-semibold">{t("ticket_title")}</span>
            </div>
            {
                packageOptions !== null &&
                (packageOptions[activePkgOption].adultFromAge !== "" && packageOptions[activePkgOption].adultToAge !== "") ?
                <div>
                    <div className="flex justify-between items-center mt-[24px]">
                        <div>
                            <span className="text-[14px]">{t("adult_ticket")} ({t("age")} {packageOptions[activePkgOption].adultFromAge} - {packageOptions[activePkgOption].adultToAge})</span>
                            {
                                packageOptions[activePkgOption].adultPromoPrice !== 0 ?
                                <div className="flex items-center gap-[5px]">
                                    <span className="text-gray-500 block text-[10px] line-through">THB {currencyConvertToThai(packageOptions[activePkgOption].adultPrice as number)}</span>
                                    <span className="text-gray-500 block">THB {currencyConvertToThai(packageOptions[activePkgOption].adultPromoPrice as number)}</span>
                                </div>
                                :
                                <span className="text-gray-500 block">THB {currencyConvertToThai(packageOptions[activePkgOption].adultPrice as number)}</span>
                            }
                            
                        </div>
                        <div className="flex gap-[10px] justify-between items-center">
                            <button onClick={() => {
                                adultQty > 0 && setadultQty(adultQty-1);
                            }} className="cursor-pointer border flex justify-center items-center border-gray-300 rounded-[5px] h-[35px] w-[35px]">
                                <RiSubtractFill className="text-[24px] text-[#613DC1]" />
                            </button>
                            <div className="cursor-pointer border flex justify-center items-center border-gray-300 rounded-[5px] h-[35px] w-[35px]">
                                {adultQty}
                            </div>
                            <button onClick={() => {
                            setadultQty(adultQty+1);
                            }} className="cursor-pointer border flex justify-center items-center border-gray-300 rounded-[5px] h-[35px] w-[35px]">
                                <FiPlus className="text-[24px] text-[#613DC1]" />
                            </button>
                        </div>
                    </div>       
                    <div className="flex justify-between items-center mt-[10px]">
                        <div>
                            <span className="text-[14px]">{t("child_ticket")} ({t("age")} {packageOptions[activePkgOption].childFromAge} - {packageOptions[activePkgOption].childToAge})</span>
                            {
                                packageOptions[activePkgOption].childPromoPrice !== 0 ?
                                <div className="flex items-center gap-[5px]">
                                    <span className="text-gray-500 block text-[10px] line-through">THB {currencyConvertToThai(packageOptions[activePkgOption].childPrice as number)}</span>
                                    <span className="text-gray-500 block">THB {currencyConvertToThai(packageOptions[activePkgOption].childPromoPrice as number)}</span>
                                </div>
                                :
                                <span className="text-gray-500 block">THB {currencyConvertToThai(packageOptions[activePkgOption].childPrice as number)}</span>
                            }
                        </div>
                        <div className="flex gap-[10px] justify-between items-center">
                            <button onClick={() => {
                                childQty > 0 && setChildQty(childQty - 1);
                            }} className="cursor-pointer border flex justify-center items-center border-gray-300 rounded-[5px] h-[35px] w-[35px]">
                                <RiSubtractFill className="text-[24px] text-[#613DC1]" />
                            </button>
                            <div className="cursor-pointer border flex justify-center items-center border-gray-300 rounded-[5px] h-[35px] w-[35px]">
                                {childQty}
                            </div>
                            <button onClick={() => {
                                setChildQty(childQty + 1);
                            }} className="cursor-pointer border flex justify-center items-center border-gray-300 rounded-[5px] h-[35px] w-[35px]">
                                <FiPlus className="text-[24px] text-[#613DC1]" />
                            </button>
                        </div>
                    </div>       
                </div>
                :
                packageOptions !== null &&
                <div>
                     <div className="flex justify-between items-center mt-[24px]">
                        <div className="w-full">
                            <span className="text-[14px]">{t("group_ticket")} ({packageOptions[activePkgOption].groupFromAge} - {packageOptions[activePkgOption].groupToAge} {t("people")})</span>
                            {
                                packageOptions[activePkgOption].groupPromoPrice !== 0 ?
                                <div className="flex items-center gap-[5px]">
                                    <span className="text-gray-500 block text-[10px] line-through">THB {currencyConvertToThai(packageOptions[activePkgOption].groupPrice as number)}</span>
                                    <span className="text-gray-500 block">THB {currencyConvertToThai(packageOptions[activePkgOption].groupPromoPrice as number)}</span>
                                </div>
                                :
                                <span className="text-gray-500 block">THB {currencyConvertToThai(packageOptions[activePkgOption].groupPrice as number)}</span>
                            }
                        </div>
                        <div className="flex gap-[10px] justify-between items-center">
                            <button onClick={() => {
                                groupQty > 0 && setgroupQty(groupQty - 1);
                            }} className="cursor-pointer border flex justify-center items-center border-gray-300 rounded-[5px] h-[35px] w-[35px]">
                                <RiSubtractFill className="text-[24px] text-[#613DC1]" />
                            </button>
                            <div className="cursor-pointer border flex justify-center items-center border-gray-300 rounded-[5px] h-[35px] w-[35px]">
                                {groupQty}
                            </div>
                            <button onClick={() => {
                                groupQty < Number(packageOptions[activePkgOption].groupToAge) && setgroupQty(groupQty + 1);
                            }} className="cursor-pointer border flex justify-center items-center border-gray-300 rounded-[5px] h-[35px] w-[35px]">
                                <FiPlus className="text-[24px] text-[#613DC1]" />
                            </button>
                        </div>
                    </div>       
                </div>
            }
            <div className="mt-[24px]">
                <span className="text-[14px]">{t("total_price")} </span>
                <span className="text-[18px] font-medium">THB {currencyConvertToThai(amoutPrice)}</span>
            </div>
            <div className="mt-[10px]">
                <CvButton label={t("book_btn")} onClick={handlerClickBooking} />
            </div>
        </div>
        </>
    );
};