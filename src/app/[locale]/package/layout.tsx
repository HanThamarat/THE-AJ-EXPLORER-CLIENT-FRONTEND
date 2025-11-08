import CvInput from "@/app/components/input/CvInput";
import CvSelector from "@/app/components/selector/CvSelector";
import { getTranslations } from 'next-intl/server';
import React from "react";
import { IoSearch } from "react-icons/io5";

export default async function PackageLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const t = await getTranslations("search_pacakge");

    return(
        <div className="mb-[50px]">
            <div className="py-[20px] bg-primary w-full">
                <div className="mx-[20px] 2xl:mx-auto 2xl:max-w-7xl gap-[10px] md:gap-[20px] md:flex md:items-center">
                    <div className="w-full gap-[10px] md:gap-[20px] flex items-center">
                        <div className="w-[45%] md:w-[30%]">
                            <CvSelector
                                placeholder={t("select_province")}
                            />
                        </div>
                        <CvInput
                            placeholder={t("enter_activity")}
                        />
                    </div>
                    <button className="w-full mt-[10px] md:mt-[0px] h-[40px] md:w-[45px] flex justify-center items-center gap-[10px] bg-white rounded-[6px]">
                        <IoSearch className="text-primary text-[20px]" />
                        <span className="text-primary md:hidden">Search</span>
                    </button>
                </div>
            </div>
            {children}
        </div>
    );
};