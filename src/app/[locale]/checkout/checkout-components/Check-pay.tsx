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
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

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
    const router = useRouter();
    const t = useTranslations("checkout");

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
            label: t("credit_debit_card"),
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
            label: t("mobile_banking"),
            component: <MoblieBankingContent onChange={handleMobileBank} />
        },
        {
            icon: <Image src={QrIcon} width={0} height={0} alt="" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />,
            label: t("qr_payment"),
        },
    ];
    
    return(
        <div className="w-full flex flex-col gap-[24px]">
            <span className="text-[18px] font-semibold">{t("check_and_pay")}</span>
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
            <span>{t("terms_agreement")} <Link href="/terms/term" className=" text-blue-700 underline">{t("terms_of_use")}</Link> <Link href="/terms/privacy-policy" className=" text-blue-700 underline">{t("privacy_policy")}</Link>.</span>
            <div className="w-full flex justify-end items-center gap-[10px]">
                <button
                    className="flex items-center gap-[5px] rounded-[7px] h-[40px] py-[10px] pl-[5px] pr-[10px] hover:bg-gray-200 duration-100 ease-in-out"
                    onClick={() => router.back()}
                >
                    <IoIosArrowBack className="text-[18px]" />
                    <span>{t("back_to_customer_info")}</span>
                </button>
                <div>
                    <CvButton 
                        label={t("complete_booking")}
                        onClick={handleClickCompletePay}
                        isLoading={isLoadingPayment}
                    />
                </div>
            </div>
        </div>
    );
}