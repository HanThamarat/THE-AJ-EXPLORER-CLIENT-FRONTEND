"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getPackagesBySearch } from "@/app/store/slice/packageSlice";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { packageSelector } from "@/app/store/slice/packageSlice";
import Image from "next/image";
import PackageSekeleton from "@/app/components/loader/package-skeleton";
import marker from "@/app/assets/images/svg/marker.svg";
import CvButton from "@/app/components/CvButton/CvButton";
import { convert } from "html-to-text";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function AllPackagePage() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const provinceId = searchParams.get("provinceId");
    const packageName = searchParams.get("packageName");
    const provinceName = searchParams.get("provinceName");
    const { packagesBySearch } = useSelector(packageSelector);
    const dispatch = useAppDispatch();
    const isFetchingPackage = useRef(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMoreData, setIsLoadingMoreData] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    
    const observerTarget = useRef<HTMLDivElement>(null);
    const t_package = useTranslations("package");

    useEffect(() => {
        setPage(1);
    }, []);

    useEffect(() => {
        const fetchPackage = async () => {
            if (isFetchingPackage.current) return;
            isFetchingPackage.current = true;

            page > 1 && setIsLoadingMoreData(true);

            await dispatch(getPackagesBySearch({ 
                page: page, 
                limit: 5, 
                packageName: packageName, 
                provinceId: Number(provinceId) 
            }));
            isFetchingPackage.current = false;

            setIsLoadingMoreData(false);
        }

        fetchPackage();

        if (packagesBySearch !== null) {
            setIsLoading(false);
        };
        
    }, [dispatch, packagesBySearch, provinceId, packageName, page]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting && 
                    packagesBySearch?.nextPage
                ) {        
                    setPage((prev) => prev + 1);
                    console.log(page);
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) observer.unobserve(observerTarget.current);
        };
    }, [packagesBySearch?.nextPage]);



    return(
        <>
            <div className="w-full px-[20px] 2xl:px-[0px] 2xl:max-w-7xl 2xl:mx-auto">
                {
                    isLoading ?
                    <div className="mt-[40px]">
                        <div className='animate-pulse w-[300px] font-semibold text-[24px] bg-gray-200 rounded-[5px]'><span className='invisible'>Thamarat Laosen</span></div>
                        <div className='animate-pulse font-semibold w-[220px] text-[16px] bg-gray-200 mt-[2px] rounded-[5px]'><span className='invisible'>Thamarat</span></div>
                    </div>
                    :
                    <div className="mt-[40px]">
                        <span className="font-semibold text-[24px]">{packageName === "null" ? provinceName : packageName}</span>
                        <span className="font-semibold text-[16px] block">{packagesBySearch?.total} {t_package("result")}</span>
                    </div>
                }
                <div className="md:flex justify-between w-full gap-[20px] mt-[34px]">
                    <div className="w-full md:w-2/6">
                        <div className="p-[20px] bg-white rounded-[20px] ">
                            <div>
                                <span className="text-[18px] font-semibold">{t_package("filter")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-[24px] md:mt-[0px] md:w-4/6">
                    {
                        isLoading ?
                        <PackageSekeleton />
                        :
                        <div className="w-full grid grid-cols-1 gap-[10px]">
                            {
                                packagesBySearch?.items.map((data, key) => (
                                    <div className="w-full bg-white rounded-[20px] flex gap-[5px] md:gap-2.5" key={key}>
                                        <div className="w-2/6">
                                            <Image src={data.packageImage[0].file_base64 as string} alt="" width={0} height={0} className="h-[200px] md:h-[300px] w-full object-cover rounded-[20px]" />
                                        </div>
                                        <div className="w-4/6 p-[10px] md:p-5 flex flex-col justify-between">
                                            <div className="w-full">
                                                <span className="text-[14px] md:text-[18px] line-clamp-2 font-semibold">{data.packageName}</span>
                                                <div className="flex gap-[5px] items-center mt-[5px]">
                                                    <Image src={marker} width={16} height={16} alt="" />
                                                    <span className="block">{data.province}</span>
                                                </div>
                                                <div className="hidden md:block mt-[20px]">
                                                    <div className="line-clamp-3">
                                                        {convert(data.packageDes, {
                                                            wordwrap: 130
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-end">
                                                <div className="flex flex-col items-end">
                                                    {
                                                        (data.promoAmount !== 0 && data.promoAmount !== null) &&
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-primary font-semibold text-[16px]">THB {data.promoAmount}</span>
                                                            <span className="text-[#A6A9AE] text-[14px] font-medium">From <span className="text-primary line-through">THB {data.fromAmount}</span></span>
                                                        </div>
                                                    }
                                                    {
                                                        (data.fromAmount !== 0 && data.promoAmount === 0) &&
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[#A6A9AE] text-[16px] font-semibold">From <span className="text-primary">THB {data.fromAmount}</span></span>
                                                        </div>
                                                    }
                                                    <div className="h-[5px]"></div>
                                                    <div className="hidden md:block">
                                                        <CvButton
                                                            label="Book Now"
                                                            onClick={() => router.push(`package/detail/${data.packageId}`)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                        {/* This div sits at the bottom. When it hits the screen, page increases */}
                        <div ref={observerTarget} className="w-full flex justify-center items-center mt-[10px]">
                            {isLoadingMoreData && (
                                <PackageSekeleton />
                            )}
                            {(packagesBySearch?.items?.length ?? 0) > 0 && !packagesBySearch?.nextPage && (
                                <span className="text-gray-400 text-sm">No more packages</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}