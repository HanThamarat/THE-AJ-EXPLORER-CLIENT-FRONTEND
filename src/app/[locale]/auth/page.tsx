"use client"

import Image from "next/image";
import attrImage from "@/app/assets/images/img/attraction.jpg";

export default function AuthPage() {
    return(
        <>
            <div className="h-[90vh] flex">
                <div className="w-full h-full overflow-hidden">
                    <Image src={attrImage} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="w-[40%]">

                </div>
            </div>
        </>
    );
};