import DescriptionLoader from "@/app/components/loader/description-loader";
import { packageEntity } from "@/types/package";
import { convert } from "html-to-text";
import TicketState from "./ticket-state";
import BenefitComponent from "./benifit";
import AttractionTimeline from "./attraction-timeline";
import { useTranslations } from "next-intl";

interface PackageDetailMobileProps {
    packageData: packageEntity;
    loading: boolean;
}

export default function PackageDetailMobile({
    packageData,
    loading
}: PackageDetailMobileProps) {

    const t = useTranslations("package_detail");

    return(
        <> 
            <div className="w-full">
                {
                    !loading && packageData !== null ?
                    <TicketState packageOptions={packageData.packageOption} packageId={packageData.id} />
                    :
                    <div className="flex flex-col gap-[10px]">
                        <DescriptionLoader />
                        <DescriptionLoader />
                    </div>
                }
            </div>
            <div className="w-full mt-[24px]">
                {
                    loading ?
                    <DescriptionLoader />
                    :
                    <div className="text-gray-600 text-[14px]">
                        {convert(packageData?.description as string, {
                            wordwrap: 130
                        })}
                    </div>
                }
            </div>
            <div className="w-full mt-[24px]">
                {
                    loading ?
                    <DescriptionLoader />
                    :
                    <BenefitComponent
                        benefit={packageData.benefit_include}
                        not_benefit={packageData.benefit_not_include}
                    />
                }
            </div>
            <div className="w-full mt-[24px]">
                {
                    loading ?
                    <DescriptionLoader />
                    :
                    <AttractionTimeline packageAttraction={packageData.pakcageAttraction} />
                }
            </div>
            <div className="mt-[24px]">
                {
                    loading ?
                    <DescriptionLoader />
                    :
                    packageData.additional_description !== "no data" &&
                    <div className="w-full">
                        <span className="text-[16px] font-semibold text-gray-800">{t("additional_description")}</span>
                        <div className="text-gray-600 text-[14px] mt-[5px]">
                            {convert(packageData?.additional_description as string, {
                                wordwrap: 130
                            })}
                        </div>
                    </div>
                }
            </div>
        </>
    );
};