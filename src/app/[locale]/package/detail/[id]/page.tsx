"use client"

import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { getPackageDetail } from "@/app/store/slice/packageSlice";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { packageSelector } from "@/app/store/slice/packageSlice";
import ImageLoader from "@/app/components/loader/image-loader";
import ImageSection from "./components/image-section";
import PackageDetailFullscreen from "./components/detail-fullscreen";
import { packageEntity } from "@/app/types/package";
import PackageDetailMobile from "./components/detail-moblie";

export default function PackageDetail() {

    const params = useParams<{ id: string }>();
    const searchParams = useSearchParams();
    const packageId = params.id;
    const packageName = searchParams.get("packageName");
    const provinceName = searchParams.get("provinceName");
    const { packageDetail } = useSelector(packageSelector);
    const dispatch = useAppDispatch();

    const [isLoading, SetIsLoading] = useState<boolean>(true);
    const isFaching = useRef<boolean>(false);

    useEffect(() => {
        SetIsLoading(true);
    }, []);

    useEffect(() => {
        const fecthData = async () => {
            if (isFaching.current) return;
            isFaching.current = true;
            await dispatch(getPackageDetail(Number(packageId)));
            isFaching.current = false;
        }

        fecthData();        

        if (packageDetail !== null) {
            SetIsLoading(false);
        }
    }, [dispatch, packageDetail]);

    return(
        <>
            <div className="w-full px-[20px] 2xl:px-[0px] 2xl:max-w-7xl 2xl:mx-auto">
                <div className="mt-[24px] flex-col gap-[20px]">
                    { 
                        isLoading ?
                        <div>
                            <div className='animate-pulse font-semibold text-[14px] w-[220px] bg-gray-200 mt-[2px] rounded-[5px]'><span className='invisible'>Thamarat</span></div> 
                            <div className='animate-pulse font-semibold w-[220px] text-[24px] bg-gray-200 mt-[2px] rounded-[5px]'><span className='invisible'>Thamarat</span></div>
                        </div>
                              :
                         <div className="flex items-center">
                            <span className="text-purple-500">Home</span>
                            <IoIosArrowForward className="text-[20px]" />
                            <span className="">{provinceName}</span>
                            <IoIosArrowForward className="text-[20px]" />
                            <span className="">{packageDetail?.packageName}</span>
                        </div>
                    }
                    <div>
                        <span className="text-[18px] md:text-[24px] font-semibold mt-[20px]">{packageDetail?.packageName}</span>
                    </div>
                </div>
                
                <div className="w-full mt-[24px]">
                    {
                        isLoading ?
                        <ImageLoader />
                        :
                        <ImageSection image={packageDetail?.packageImage || []} />
                    }
                </div>
                
                <div className="w-full mt-[24px]">
                    <div className="md:hidden">
                        <PackageDetailMobile packageData={packageDetail as packageEntity} loading={isLoading} />
                    </div>
                    <div className="hidden md:block">
                        <PackageDetailFullscreen packageData={packageDetail as packageEntity} loading={isLoading}  />
                    </div>
                </div>
            </div>
        </>
    );
}