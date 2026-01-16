import { blogListEntityType } from "@/types/blog";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogListProps {
    isLoading: boolean;
    blogList?: blogListEntityType[];
}

export default function BlogList({
    isLoading,
    blogList
}: BlogListProps) {

    const router = useRouter();

    if (isLoading) {
       return(
        <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-[10px]">
            <div className="w-full h-[190px] bg-gray-200 rounded-[10px] flex flex-col gap-[10px]"></div>
            <div className="w-full h-[190px] bg-gray-200 rounded-[10px] flex flex-col gap-[10px]"></div>
            <div className="w-full h-[190px] bg-gray-200 rounded-[10px] flex flex-col gap-[10px]"></div>
            <div className="w-full h-[190px] bg-gray-200 rounded-[10px] flex flex-col gap-[10px]"></div>
            <div className="w-full h-[190px] bg-gray-200 rounded-[10px] flex flex-col gap-[10px]"></div>
            <div className="w-full h-[190px] bg-gray-200 rounded-[10px] flex flex-col gap-[10px]"></div>
            <div className="w-full h-[190px] bg-gray-200 rounded-[10px] flex flex-col gap-[10px]"></div>
            <div className="w-full h-[190px] bg-gray-200 rounded-[10px] flex flex-col gap-[10px]"></div>
        </div>
       );
    }

    if (!blogList || blogList?.length === 0) {
        return null;
    }

    return(
        <div className="w-full flex flex-col gap-[5px]">
            <span className="text-[18px] font-semibold">All Blogs</span>
            <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-[10px]">
                {
                    blogList.map((item, key) => (
                        <div
                            key={key}
                            className="w-full bg-white rounded-[10px] flex flex-col gap-[10px] cursor-pointer"
                            onClick={() => router.push(`blog/detail/${item.id}`)}
                        >  
                            <div className="rounded-[10px] w-full h-[180px] overflow-hidden">
                                <Image src={item.thumnbnail.base64 as string} alt="" width={0} height={0} className="w-full h-full object-cover" />
                            </div>
                            <span className="px-[10px] mb-[10px] line-clamp-2 text-ellipsis font-medium">{item.blogName}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}