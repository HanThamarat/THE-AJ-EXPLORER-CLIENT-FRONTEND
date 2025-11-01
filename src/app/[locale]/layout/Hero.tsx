"use client"

import Image from "next/image";
import menu from "@/app/assets/images/img/home.png";
import { useTranslations } from "next-intl";
import CvSelector from "@/app/components/selector/CvSelector";
import CvInput from "@/app/components/input/CvInput";
import { IoSearch } from "react-icons/io5";

export default function Hero() {

    const t = useTranslations("home");

    return(
        <div className="w-full md:max-w-7xl md:mx-auto md:mt-[40px] relative">
            <div className="relative md:rounded-[20px] overflow-hidden">
                <Image src={menu} alt="Menu" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C0735]/[0.46] to-[#81149B]/[0.46]" />
                <div className="absolute inset-0 flex items-center p-[20px] z-10 text-white text-lg font-medium">
                    <span className="font-bold text-[18px] md:text-[30px]">{t("hero-title-1")}<br />{t("hero-title-2")}</span>
                </div>
            </div>
            <div className="absolute mt-[-30px] md:mt-[-55px] lg:mt-[-70px] w-full px-[50px] md:px-[70px] lg:px-[100px] z-[20]">
                <div className=" bg-white w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-[30px] pt-[30px] pb-[60px] rounded-[20px] flex justify-between gap-[20px]">
                    <div className="w-[30%]">
                        <CvSelector
                            placeholder="Select Province"
                        />
                    </div>
                    <CvInput
                        placeholder="Enter activities"
                    />
                </div>
                <div className="z-[40] mt-[-35px] w-full flex justify-center">
                    <button type="button" className="bg-primary flex items-center gap-[10px] py-[10px] md:py-[15px] lg:py-[18px] px-[40px] md:px-[50] lg:px-[60px] rounded-[20px]">
                        <IoSearch className="text-[24px] text-white" />
                        <span className="text-white text-[25px]">Search</span>
                    </button>
                </div>
            </div>
        </div>
    )
}