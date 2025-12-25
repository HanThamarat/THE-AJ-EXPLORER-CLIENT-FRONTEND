"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import NextApp from "@/app/assets/images/svg/Next.svg";
import KPlusApp from "@/app/assets/images/svg/Kbanlk.svg";
import SCBApp from "@/app/assets/images/svg/Scb.svg";
import BkkApp from "@/app/assets/images/svg/Bkk.svg";
import KrungSri from "@/app/assets/images/svg/KrungSri.svg";

interface MoblieBankingContentProps {
    onChange: (value: string) => void; 
}

export default function MoblieBankingContent({
    onChange
}: MoblieBankingContentProps) {

    const [mobileBank, setMoblieBanking] = useState<string>("");

    useEffect(() => {
        onChange(mobileBank);
    }, [mobileBank]);

    const bankList = [
        {
            bank_key: "mobile_banking_bbl",
            bankName: "Bualuang mBanking",
            image: <Image src={BkkApp} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
        },
        {
            bank_key: "mobile_banking_kbank",
            bankName: "K Plus",
            image: <Image src={KPlusApp} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
        },
        {
            bank_key: "mobile_banking_ktb",
            bankName: "KTB NEXT",
            image: <Image src={NextApp} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
        },
        {
            bank_key: "mobile_banking_bay",
            bankName: "Krungsri",
            image: <Image src={KrungSri} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
        },
        {
            bank_key: "mobile_banking_scb",
            bankName: "SCB Easy",
            image: <Image src={SCBApp} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
        },
    ];

    return(
        <div className="flex flex-col gap-[10px] px-[10px]">
            {
                bankList.map((data, key) => (
                    <div 
                        key={key} 
                        className={`w-full border ${ mobileBank === data.bank_key ? 'border-[#613DC1] bg-[#613DC1]/10' : 'border-gray-200' } rounded-[10px] p-[10px] cursor-pointer flex items-center gap-[10px]`}
                        onClick={() => setMoblieBanking(data.bank_key)}
                    >
                        {data.image}
                        <span>{data.bankName}</span>
                    </div>
                ))
            }
        </div>
    );
}