import DescriptionLoader from "@/app/components/loader/description-loader";
import { packageEntity } from "@/app/types/package";
import { convert } from "html-to-text";

interface PackageDetailFullscreenProps {
    packageData?: packageEntity;
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
                </div>
                <div className="w-[30%]">

                </div>
            </div>
        </>
    );
};