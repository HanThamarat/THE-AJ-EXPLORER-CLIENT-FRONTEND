import { blogListEntityType } from "@/types/blog";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogCarouselProps {
    isLoading: boolean;
    carouselBlogData?: blogListEntityType[];
}

export default function BlogCarousel({
    isLoading,
    carouselBlogData
}: BlogCarouselProps) {   
    
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="w-full h-[400px] rounded-[20px] bg-gray-200 animate-pulse duration-100 ease-linear">

            </div>
        );
    }

    if (!carouselBlogData || carouselBlogData.length === 0) {
        return null;
    }

    return (
        <div className="w-full h-[250px] md:h-[450px] rounded-[20px] relative overflow-hidden">
            <Image src={carouselBlogData[0].thumnbnail.base64 as string} alt="" width={0} height={0} className="absolute z-10 w-full h-full object-cover" />
            <div className="w-full h-full bg-gradient-to-t from-[#2C0735]/[0.46] to-[#81149B]/[0.46] z-20 absolute"></div>
            <div className="w-full h-full p-[10px] md:p-[20px] absolute z-30 flex flex-col justify-between">
                <div className="flex flex-col">
                    <span className="text-[24px] md:text-[34px] text-white font-semibold">{carouselBlogData[0].blogType}</span>
                    <span className="text-[18px] md:text-[28px] text-white font-medium">{carouselBlogData[0].blogName}</span>
                </div>
                <div className="w-full flex flex-row justify-between">
                    <button 
                        onClick={() => router.push(`blog/detail/${carouselBlogData[0].id}`)}
                        className=" cursor-pointer px-[15px] py-[10px] rounded-[10px] text-white bg-[#81149B]"
                    >
                        Read content more
                    </button>
                    <div className="px-[15px] py-[10px] rounded-[10px] text-white bg-[#81149B]">
                        {carouselBlogData[0].viewer} View
                    </div>
                </div>
            </div>
        </div>
    );
}