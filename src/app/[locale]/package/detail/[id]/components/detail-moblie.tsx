import DescriptionLoader from "@/app/components/loader/description-loader";
import { packageEntity } from "@/app/types/package";
import { convert } from "html-to-text";
import TicketState from "./ticket-state";

interface PackageDetailMobileProps {
    packageData: packageEntity;
    loading: boolean;
}

export default function PackageDetailMobile({
    packageData,
    loading
}: PackageDetailMobileProps) {
    return(
        <> 
            <div className="w-full">
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
        </>
    );
};