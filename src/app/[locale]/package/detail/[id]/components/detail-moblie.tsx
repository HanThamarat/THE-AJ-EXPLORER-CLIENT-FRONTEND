import DescriptionLoader from "@/app/components/loader/description-loader";
import { packageEntity } from "@/app/types/package";
import { convert } from "html-to-text";

interface PackageDetailMobileProps {
    packageData?: packageEntity;
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