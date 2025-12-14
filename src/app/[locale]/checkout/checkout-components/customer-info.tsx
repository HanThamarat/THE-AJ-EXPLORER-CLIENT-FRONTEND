import CvInput from "@/app/components/input/CvInput";

export default function CustomerInfo() {
    return(
        <form className="w-full flex flex-col gap-[24px]">
            <div className="flex flex-col">
                <span className="text-[18px] font-semibold">Contact details</span>
                <span>This is where your confirmation will be sent</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                <CvInput
                    label="First name *"
                    placeholder="Please enter your first name"
                />
                <CvInput
                    label="Last name *"
                    placeholder="Please enter your last name"
                />
                <CvInput
                    label="Email *"
                    placeholder="Please enter your email"
                />
                <CvInput
                    label="Country/region of residence *"
                    placeholder="Please select the country"
                />
            </div>
        </form>
    );
}