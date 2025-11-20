"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getPackagesBySearch } from "@/app/store/slice/packageSlice";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { packageSelector } from "@/app/store/slice/packageSlice";
import Image from "next/image";
import PackageSekeleton from "@/app/components/loader/package-skeleton";

export default function AllPackagePage() {

    const searchParams = useSearchParams();
    const provinceId = searchParams.get("provinceId");
    const packageName = searchParams.get("packageName");
    const { packagesBySearch } = useSelector(packageSelector);
    const dispatch = useAppDispatch();
    const isFetchingPackage = useRef(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMoreData, setIsLoadingMoreData] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    
    const observerTarget = useRef<HTMLDivElement>(null);

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
            <div className="w-full mx-[20px] 2xl:max-w-7xl 2xl:mx-auto">
                {
                    isLoading ?
                    <div className="mt-[40px]">
                        <div className='animate-pulse w-[300px] font-semibold text-[24px] bg-gray-200 rounded-[5px]'><span className='invisible'>Thamarat Laosen</span></div>
                        <div className='animate-pulse font-semibold w-[220px] text-[16px] bg-gray-200 mt-[2px] rounded-[5px]'><span className='invisible'>Thamarat</span></div>
                    </div>
                    :
                    <div className="mt-[40px]">
                        <span className="font-semibold text-[24px]">{packageName}</span>
                        <span className="font-semibold text-[16px] block">{packagesBySearch?.total} results</span>
                    </div>
                }
                <div className="flex justify-between w-full ga-[20px] mt-[24px]">
                    <div className="w-2/6">

                    </div>
                    <div className="w-4/6 grid grid-cols-1 gap-[10px]">
                        {
                            packagesBySearch?.items.map((data, key) => (
                                <div className="w-full bg-white rounded-[20px] flex gap-2.5" key={key}>
                                    <div className="w-2/6">
                                        <Image src={data.packageImage[0].file_base64 as string} alt="" width={0} height={0} className="h-[300px] w-full object-cover rounded-[20px]" />
                                    </div>
                                    <div className="w-4/6 p-5">

                                    </div>
                                </div>
                            ))
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