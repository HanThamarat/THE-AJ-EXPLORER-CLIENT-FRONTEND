"use client"

import Image from "next/image";
import menu from "@/app/assets/images/img/home.png";
import { useTranslations } from "next-intl";
import CvSelector, { SelectorOptionTpye } from "@/app/components/selector/CvSelector";
import { IoSearch } from "react-icons/io5";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { packageSelector } from "@/app/store/slice/packageSlice";
import { getprovincePackages } from "@/app/store/slice/packageSlice";
import { useEffect, useState } from "react";
import { useRef } from "react";
import compass from "@/app/assets/images/svg/compass-03.svg";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { SearchSchema, SearchType } from "@/app/types/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function Hero() {

    const dispatch = useAppDispatch();
    const { provinceShotPack } = useSelector(packageSelector);
    const [provincePackOptions, setProvincePackOptions] = useState<SelectorOptionTpye[]>([]);
    const [packageOption, setPackageOption] = useState<SelectorOptionTpye[]>([]);
    const [provinceName, setProvinceName] = useState<string>("");
    const isFaching = useRef(false);
    const router = useRouter();

    const t = useTranslations("home");
    const t_search = useTranslations("search_pacakge");

    useEffect(() => {
        const fecthData = async () => {
            if (isFaching.current) return;
            isFaching.current = true;
            await dispatch(getprovincePackages());
            isFaching.current = false;
        }

        provinceShotPack === null && fecthData();

        if (provinceShotPack !== null) {
            const filterData: SelectorOptionTpye[] = provinceShotPack?.map((data) => ({
                value: data.provinceid,
                label: data.provincename,
            }));
            
            setProvincePackOptions(filterData);
        }
    }, [dispatch, provinceShotPack]);

    const handieChangeProvice = async (provinceId: number) => {
        const filterPackageProvice = await provinceShotPack?.filter(data => data.provinceid === provinceId);
        setProvinceName(filterPackageProvice ? filterPackageProvice[0].provincename as string : "");
        const setFormat: SelectorOptionTpye[] = filterPackageProvice ? filterPackageProvice[0].packages
        .filter((item, index, self) => index === self.findIndex((t) => t.packageName === item.packageName))
        .map((data) => ({
            value: data.packageName,
            label: <div className="flex items-center gap-[10px] h-[40px]">
                        <div className="w-[35px] h-[35px] rounded-[10px] flex justify-center items-center bg-gray-300">
                            <Image src={compass} alt="" className="w-[24px] h-[24px] text-white" />
                        </div>
                        <span>{data.packageName}</span>
                   </div>
        })) : [];
        setPackageOption(setFormat);
    };

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<SearchType>({ resolver: zodResolver(SearchSchema) });

    const handlerSubmitSearch: SubmitHandler<SearchType> = async (data) => {
        router.push(`/package?provinceId=${data.provinceId}&provinceName=${ provinceName }&packageName=${data.packageName === undefined ? null : data.packageName}`);
    } 

    return(
        <div className="w-full px-0 2xl:max-w-7xl 2xl:mx-auto 2xl:px-0 md:px-[20px] md:mt-[40px] relative">
            <div className="relative h-[200px] md:h-full md:rounded-[20px] overflow-hidden">
                <Image src={menu} alt="Menu" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C0735]/[0.46] to-[#81149B]/[0.46]" />
                <div className="absolute inset-0 flex items-center p-[20px] z-10 text-white text-lg font-medium">
                    <span className="font-bold text-[18px] md:text-[30px]">{t("hero-title-1")}<br />{t("hero-title-2")}</span>
                </div>
            </div>
            <form onSubmit={handleSubmit(handlerSubmitSearch)} className="absolute mt-[-45px] md:mt-[-55px] lg:mt-[-70px] w-full px-[20px] md:px-[70px] lg:px-[100px] z-[20]">
                <div className=" bg-white w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-[10px] md:px-[30px] pt-[30px] pb-[40px] md:pb-[60px] rounded-[20px] flex flex-col md:flex-row justify-between gap-[10px] md:gap-[20px]">
                    <div className="w-full md:w-[30%]">
                        <Controller
                            name="provinceId"
                            control={control}
                            render={({ field }) => (
                                <CvSelector
                                    placeholder={t_search("select_province")}
                                    option={provincePackOptions}
                                    value={field.value}
                                    onChange={(e) => {
                                        handieChangeProvice(e as number);
                                        field.onChange(Number(e));
                                    }}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        control={control}
                        name="packageName"
                        render={({ field }) => (
                            <CvSelector
                                placeholder={t_search("enter_activity")}
                                option={packageOption}
                                value={field.value}
                                onChange={(e) => field.onChange(e as string)}
                            />
                        )}
                    />
                </div>
                <div className="z-[40] mt-[-25px] md:mt-[-35px] w-full flex justify-center">
                    <button type="submit" className="bg-primary flex items-center gap-[10px] py-[10px] md:py-[15px] lg:py-[18px] px-[40px] md:px-[50] lg:px-[60px] rounded-[10px] md:rounded-[20px]">
                        <IoSearch className="text-[16px] md:text-[25px] text-white" />
                        <span className="text-white text-[16px] md:text-[25px]">Search</span>
                    </button>
                </div>
            </form>
        </div>
    )
}