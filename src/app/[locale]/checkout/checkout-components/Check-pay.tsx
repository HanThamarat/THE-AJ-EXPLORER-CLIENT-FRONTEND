import Image from "next/image";
import CardIcon from "@/app/assets/images/svg/credit-card.svg";
import QrIcon from "@/app/assets/images/svg/Thai-QR-Payment.svg";
import NextApp from "@/app/assets/images/svg/Next.svg";
import KPlusApp from "@/app/assets/images/svg/Kbanlk.svg";
import SCBApp from "@/app/assets/images/svg/Scb.svg";
import BkkApp from "@/app/assets/images/svg/Bkk.svg";
import KrungSri from "@/app/assets/images/svg/KrungSri.svg";
import { useState } from "react";
import CardPaymentForm from "../payment-componets/card-contnet";
import CvButton from "@/app/components/CvButton/CvButton";
import MoblieBankingContent from "../payment-componets/moblie-content";

interface CheckPayProps {
    CompletePayWithQr: () => void;
    CompletePayWithCard: (data: any) => void;
    CompletePayWithMobileBanking: (data: string) => void;
    isLoadingPayment: boolean;
}

export default function CheckPay({
    CompletePayWithQr,
    CompletePayWithCard,
    CompletePayWithMobileBanking,
    isLoadingPayment
}: CheckPayProps) {

    const [paymentActive, setPaymentActive] = useState<number>();

    const [isCardValid, setIsCardValid] = useState(false);
    const [cardData, setCardData] = useState<any>(null);
    const [mobileBank, setMoblieBanking] = useState<string>("");

    const handleCardValidation = (isValid: boolean, data?: any) => {
        setIsCardValid(isValid);
        setCardData(data);
    };
    
    const handleMobileBank = (data: string) => {
        setMoblieBanking(data);
    };

    const handleClickCompletePay = async () => {
        if (paymentActive === 0 && isCardValid) {
            CompletePayWithCard(cardData);
        } else if (paymentActive === 1 && mobileBank !== "") {
            CompletePayWithMobileBanking(mobileBank);
        } else if (paymentActive === 2) {
            CompletePayWithQr();
        }
    };

    const payList = [
        {
            icon: <Image src={CardIcon} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />,
            label: "Credit/Debit Card",
            component: <CardPaymentForm onValidate={handleCardValidation} />
        },
        {
            icon: <div className="flex items-center gap-[5px]">
                    <Image src={NextApp} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                    <Image src={KPlusApp} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                    <Image src={SCBApp} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                    <Image src={BkkApp} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                    <Image src={KrungSri} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                </div>,
            label: "Mobile Banking",
            component: <MoblieBankingContent onChange={handleMobileBank} />
        },
        {
            icon: <Image src={QrIcon} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />,
            label: "QR Payment",
        },
    ];
    
    return(
        <div className="w-full flex flex-col gap-[24px]">
            <span className="text-[18px] font-semibold">Check and pay</span>
            <div className="flex flex-col gap-[10px]">
                {
                    payList.map((data, key) => (
                        <div key={key} className="w-full flex flex-col gap-[5px]">
                            <div onClick={() => setPaymentActive(key)} className={`w-full duration-100 ease-linear cursor-pointer border ${ key === paymentActive ? 'border-[#613DC1] bg-[#613DC1]/10' : 'border-[#D4D7DE] ' } py-[11px] px-[12px] rounded-[10px] flex items-center gap-[10px]`}>
                                {data.icon}
                                <span className="md:text-[16px] font-medium">{data.label}</span>
                            </div>
                            {
                                key === paymentActive && <div className="w-full mt-[10px] px-[10px]">{data.component}</div>
                            }
                        </div>
                    ))
                }
            </div>
            <div className="w-full border border-gray-200 rounded-full"></div>
            <span>By proceeding with this booking, I agree to The AJ Explorer's Terms of Use and Privacy Policy.</span>
            <div className="w-full flex justify-end items-center">
                <div>
                    <div>
                    <CvButton 
                        label="Complete booking"
                        onClick={handleClickCompletePay}
                        isLoading={isLoadingPayment}
                    />
                </div>
                </div>
            </div>
        </div>
    );
}