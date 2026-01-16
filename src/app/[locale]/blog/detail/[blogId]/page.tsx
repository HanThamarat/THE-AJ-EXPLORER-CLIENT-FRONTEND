"use client"

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { blogSelector } from "@/app/store/slice/blogSlice";
import { getBlogDetail } from "@/app/store/slice/blogSlice";
import Image from "next/image";
import parse from "html-react-parser";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function BlogDetailPage() {

    const { blogId } = useParams();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { blogDetail } = useSelector(blogSelector);
    const [isLoading, setIsloading] = useState<boolean>(true);
    const isFaching = useRef(false);
    
    useEffect(() => {
    
        const fecthblogDetail = async () => {
            if (isFaching.current) return;
            isFaching.current = true;
            await dispatch(getBlogDetail(Number(blogId)));
            isFaching.current = false;
        }
        
        fecthblogDetail();
    }, [dispatch]);

    useEffect(() => {

        if (blogDetail !== null) {
            setIsloading(false);
        }

    }, [blogDetail]);

    return(
        <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px] mt-[30px] flex flex-col gap-[24px]">
            <div>
                <button
                    className="flex items-center gap-[5px] rounded-[10px] py-[10px] pl-[5px] pr-[10px] hover:bg-gray-200 duration-100 ease-in-out"
                    onClick={() => router.back()}
                >
                    <IoIosArrowBack className="text-[18px]" />
                    <span>Back to blogs</span>
                </button>
            </div>
            {
                isLoading ? 
                <div className="w-[180px] h-[20px] rounded-[8px] bg-gray-200 animate-pulse ease-in-out duration-100">

                </div>
                :
                <span className="text-[24px] font-semibold">{blogDetail?.blogName}</span>
            }
            {
                isLoading ? 
                <div className="w-full h-[250px] rounded-[20px] bg-gray-200 animate-pulse ease-in-out duration-100">

                </div>
                :
                <div className="w-full h-[450px] rounded-[20px] overflow-hidden">
                    <Image src={blogDetail?.thumnbnail.base64 as string} width={0} height={0} alt="" className="w-full h-full object-cover" />
                </div>
            }
            {
                isLoading ? 
                <div className="w-full h-[250px] rounded-[20px] bg-gray-200 animate-pulse ease-in-out duration-100">

                </div>
                :
                <div className="w-full flex flex-col items-center">
                    { parse(blogDetail?.description as string) }
                </div>
            }
        </div>
    );
}