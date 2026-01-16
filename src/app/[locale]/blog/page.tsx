"use client"

import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { blogSelector } from "@/app/store/slice/blogSlice";
import { getBlogList } from "@/app/store/slice/blogSlice";
import { useEffect, useRef, useState } from "react";
import { blogListEntityType } from "@/types/blog";
import BlogCarousel from "./contents/blogCarousel";
import BlogList from "./contents/blogList";

export default function BlogPage() {

    const dispatch = useAppDispatch();
    const { blogList } = useSelector(blogSelector);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [carouselBlog, setCarouselBlog] = useState<blogListEntityType[]>();
    const isFaching = useRef(false);

    useEffect(() => {
        setIsLoading(true);

        const fecthBlogData = async () => {
            if (isFaching.current) return;
            isFaching.current = true;
            await dispatch(getBlogList());
            isFaching.current = false;
        }

        fecthBlogData();
    }, [dispatch]);

    useEffect(() => {
        if (blogList !== null) {
            const fliterForCarouselBlog: blogListEntityType[] = blogList.items.slice(0, 5);
            console.log(fliterForCarouselBlog);
            
            setCarouselBlog(fliterForCarouselBlog);
            setIsLoading(false);
        }
    }, [blogList]);

    return(
        <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px] mt-[30px] flex flex-col gap-[34px]">
            <BlogCarousel
                isLoading={isLoading}
                carouselBlogData={carouselBlog}
            />
            <BlogList
                isLoading={isLoading}
                blogList={blogList?.items}
            />
        </div>
    );
}