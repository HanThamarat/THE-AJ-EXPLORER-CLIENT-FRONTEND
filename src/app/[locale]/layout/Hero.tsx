"use client"

import Image from "next/image";
import menu from "@/app/assets/images/img/home.png";
import { useTranslations } from "next-intl";

export default function Hero() {

    const t = useTranslations("home");

    return(
        <div className="w-full md:max-w-7xl md:mx-auto">
            <div className="relative md:rounded-[20px] overflow-hidden">
                <Image src={menu} alt="Menu" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C0735]/[0.46] to-[#81149B]/[0.46]" />
                <div className="absolute inset-0 flex items-center p-[20px] z-10 text-white text-lg font-medium">
                    <span className="font-bold text-[18px] md:text-[30px]">{t("hero-title-1")}<br />{t("hero-title-2")}</span>
                </div>
            </div>
        </div>
    )
}