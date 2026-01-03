import { useTranslations } from "next-intl";

interface CheckoutHeaderProps {
    steps?: number; 
}

export default function CheckoutHeader({
    steps = 1
}: CheckoutHeaderProps) {
    const t = useTranslations("checkout");
    return(
        <div className="w-full flex justify-center items-center p-[20px] rounded-[20px] bg-white">
            <div className="flex items-center gap-[10px]">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex w-[20px] h-[20px] rounded-full border border-[#495AFF] items-center justify-center">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#495AFF]"></div>
                    </div>
                    <span className={`mt-[4px] text-[#495AFF]`}>{t("customer_info")}</span>
                </div>
                <div className="flex items-start">
                    <div className={`min-w-[50px] 2xl:min-w-[150px] border rounded-full border-2 mt-[8px] ${ steps >= 2 ? 'border-[#495AFF]' : 'border-[#CFD6DC]' }`}></div>
                    <div className="flex flex-col items-center justify-center">
                        <div className={`flex w-[20px] h-[20px] rounded-full border ${ steps >= 2 ? 'border-[#495AFF]' : 'border-[#CFD6DC] bg-[#CFD6DC]' } items-center justify-center`}>
                            <div className={`w-[10px] h-[10px] rounded-full ${ steps >= 2 ? 'bg-[#495AFF]' : 'bg-[#CFD6DC]' }`}></div>
                        </div>
                        <span className={`mt-[4px] ${ steps >= 2 ? 'text-[#495AFF]' : 'text-[#CFD6DC]' }`}>{t("payment_info")}</span>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className={`min-w-[50px] 2xl:min-w-[150px] border rounded-full border-2 mt-[8px] ${ steps >= 3 ? 'border-[#495AFF]' : 'border-[#CFD6DC]' }`}></div>
                    <div className="flex flex-col items-center justify-center">
                        <div className={`flex w-[20px] h-[20px] rounded-full border ${ steps >= 3 ? 'border-[#495AFF]' : 'border-[#CFD6DC] bg-[#CFD6DC]' } items-center justify-center`}>
                            <div className={`w-[10px] h-[10px] rounded-full ${ steps >= 3 ? 'bg-[#495AFF]' : 'bg-[#CFD6DC]' }`}></div>
                        </div>
                        <span className={`mt-[4px] ${ steps >= 3 ? 'text-[#495AFF]' : 'text-[#CFD6DC]' }`}>{t("booking_confirmed")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}