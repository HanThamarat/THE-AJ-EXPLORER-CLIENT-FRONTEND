import Image from "next/image";
import logo from "@/app/assets/images/svg/logo.svg";

export default function Footer() {
    return(
        <div className="w-full py-[40px] bg-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between">
                    <Image src={logo} alt="" width={160} />
                </div>
                <div className="flex justify-between mt-[45px]">
                    <span>Copyright © The AJ Explorer Co.,Ltd All right reserved.</span>
                </div>
            </div>
        </div>
    )
}