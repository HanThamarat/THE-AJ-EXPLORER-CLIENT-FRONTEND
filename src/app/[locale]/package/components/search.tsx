"use client"

import { IoSearch } from "react-icons/io5";
import CvSelector, { SelectorOptionTpye } from "@/app/components/selector/CvSelector";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { getprovincePackages, packageSelector } from "@/app/store/slice/packageSlice";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import Image from "next/image";
import compass from "@/app/assets/images/svg/compass-03.svg";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SearchSchema, SearchType } from "@/app/types/search";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

export default function SearchComponent() {

    const dispatch = useAppDispatch();
    const { provinceShotPack } = useSelector(packageSelector);
    const [provincePackOptions, setProvincePackOptions] = useState<SelectorOptionTpye[]>([]);
    const [packageOption, setPackageOption] = useState<SelectorOptionTpye[]>([]);
    const isFaching = useRef(false);
    const router = useRouter();
    const searParams = useSearchParams();
    const provinceId = searParams.get('provinceId');
    const packageName = searParams.get('packageName');

    const t = useTranslations("search_pacakge");

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

     useEffect(() => {
        const fecthData = async () => {
            const filterPackageProvice = await provinceShotPack?.filter(data => data.provinceid === Number(provinceId));
            const setFormat: SelectorOptionTpye[] = filterPackageProvice ? filterPackageProvice[0].packages
            .filter((item, index, self) => index === self.findIndex((t) => t.packageName === item.packageName))
            .map((data) => ({
                value: data.packageName,
                label: <div className="flex items-center gap-[10px] h-[40px]">
                            <div className="w-[35px] h-[35px] rounded-[10px] flex justify-center items-center bg-gray-300">
                                <Image src={compass} alt="" className="w-[24px] h-[24px] text-white" />
                            </div>
                            <span>{data.packageName}</span >
                    </div>
            })) : [];
            setPackageOption(setFormat);
        }

        if (provincePackOptions) {
            reset({
                provinceId: Number(provinceId),
                packageName: packageName !== "null" ? packageName as string : ""
            });
            fecthData();
        }
    }, [provincePackOptions]);

    const handieChangeProvice = async (provinceId: number) => {
        const filterPackageProvice = await provinceShotPack?.filter(data => data.provinceid === provinceId);
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
        router.push(`/package?provinceId=${data.provinceId}&packageName=${data.packageName}`);
    } 


    return(
        <form onSubmit={handleSubmit(handlerSubmitSearch)} className="py-[20px] bg-primary w-full">
            <div className="mx-[20px] 2xl:mx-auto 2xl:max-w-7xl gap-[10px] md:gap-[20px] md:flex md:items-center">
                <div className="w-full gap-[10px] md:gap-[20px] flex items-center">
                    <div className="w-[45%] md:w-[30%]">
                        <Controller
                            name="provinceId"
                            control={control}
                            render={({ field }) => (
                                <CvSelector
                                    placeholder={t("select_province")}
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
                                placeholder={t("enter_activity")}
                                option={packageOption}
                                value={field.value}
                                onChange={(e) => field.onChange(e as string)}
                            />
                        )}
                    />
                </div>
                <button type="submit" className="w-full mt-[10px] md:mt-[0px] h-[40px] md:w-[45px] flex justify-center items-center gap-[10px] bg-white rounded-[6px]">
                    <IoSearch className="text-primary text-[20px]" />
                    <span className="text-primary md:hidden">Search</span>
                </button>
            </div>
        </form>
    )
}