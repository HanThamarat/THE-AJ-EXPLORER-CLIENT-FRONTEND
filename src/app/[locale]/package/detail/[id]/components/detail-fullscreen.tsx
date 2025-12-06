import DescriptionLoader from "@/app/components/loader/description-loader";
import { packageEntity, packageOptionEntity } from "@/app/types/package";
import { convert } from "html-to-text";
import TicketState from "./ticket-state";
import BenefitComponent from "./benifit";

interface PackageDetailFullscreenProps {
    packageData: packageEntity;
    loading: boolean;
}

export default function PackageDetailFullscreen({
    packageData,
    loading
}: PackageDetailFullscreenProps) {
    return(
        <>
            <div className="w-full flex justify-between gap-[20px]">
                <div className="w-[70%]">
                    <div className="w-full">
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
                    <div className="mt-[30px]">
                         {
                            !loading && packageData !== null ?
                            <BenefitComponent 
                                benefit={packageData.benefit_include} 
                                not_benefit={packageData.benefit_not_include} 
                            />
                            :
                            <div className="flex flex-col gap-[10px]">
                                <DescriptionLoader />
                            </div>
                        }
                    </div>
                </div>
                <div className="w-[30%]">
                    {
                        !loading && packageData !== null ?
                        <TicketState packageOptions={packageData.packageOption} />
                        :
                        <div className="flex flex-col gap-[10px]">
                            <DescriptionLoader />
                            <DescriptionLoader />
                        </div>
                    }
                </div>
            </div>
        </>
    );
};