import CvInput from "@/app/components/input/CvInput";
import CountrySelector from "@/app/components/selector/country-selector";
import { COUNTRIES } from "@/app/libs/countries";
import { SelectMenuOption } from "@/app/libs/type";
import { useState } from "react";

export default function CustomerInfo() {

    const [isOpen, setIsOpen] = useState(false);
    // Default this to a country's code to preselect it
    const [country, setCountry] = useState<SelectMenuOption["value"]>("BE");

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
                <CountrySelector
                    id={"country-selector"}
                    open={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                    onChange={setCountry}
                    selectedValue={COUNTRIES.find((option) => option.value === country)}
                />
            </div>
        </form>
    );
}