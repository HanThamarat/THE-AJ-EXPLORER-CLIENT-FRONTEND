import CvInput from "@/app/components/input/CvInput";
import CountrySelector from "@/app/components/selector/country-selector";
import { COUNTRIES } from "@/app/libs/countries";
import { SelectMenuOption } from "@/app/libs/type";
import { useState } from "react";
import DefaultTextArea from "@/app/components/textarea/default-textarea";
import CvButton from "@/app/components/CvButton/CvButton";

export default function CustomerInfo() {

    const [isOpen, setIsOpen] = useState(false);
    // Default this to a country's code to preselect it
    const [country, setCountry] = useState<SelectMenuOption["value"]>("TH");

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
                <CvInput
                    label="Phone number *"
                    placeholder="Please enter your phone number"
                    type="number"
                />
            </div>
            <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-semibold">Arrival details</span>
                <CvInput
                    label="Pick up location - Where will you arrive? *"
                    placeholder="Please enter your hotel"
                />
            </div>
            <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-semibold">Additional details</span>
                <DefaultTextArea
                    label="Special requirements"
                    placeholder="Enter special requirements"
                />
            </div>
            <div className="w-full border border-gray-200 rounded-full"></div>
            <div>
                By clicking "Next: Payment details" and completing a booking, you agree with the terms and conditions of theajexlorer.com and the privacy policy of Viator.
                Please see our Privacy Statement to understand how we use and protect your personal information.
            </div>
            <div className="w-full flex justify-end">
                <div className="w-[200px]">
                    <CvButton
                        label="Next: Payment info"
                    />
                </div>
            </div>
        </form>
    );
}