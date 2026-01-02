import CvInput from "@/app/components/input/CvInput";
import CountrySelector from "@/app/components/selector/country-selector";
import { COUNTRIES } from "@/app/libs/countries";
import { SelectMenuOption } from "@/app/libs/type";
import { useState } from "react";
import DefaultTextArea from "@/app/components/textarea/default-textarea";
import CvButton from "@/app/components/CvButton/CvButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { contractBookingDTO, contractBookingDTOSchema } from "@/types/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";

interface CustomerInfoProps {
    callBackData: (data: contractBookingDTO) => void; 
}

export default function CustomerInfo({  
    callBackData
}: CustomerInfoProps) {

    const [isOpen, setIsOpen] = useState(false);
    // Default this to a country's code to preselect it
    const [country, setCountry] = useState<SelectMenuOption["value"]>("TH");

    const {
        handleSubmit,
        control,
        reset,
        register,
        formState: { errors }        
    } = useForm<contractBookingDTO>({ resolver: zodResolver(contractBookingDTOSchema) });

    const handlerclickNextState: SubmitHandler<contractBookingDTO> = (date) => {
        callBackData(date);
    } 

    return(
        <form onSubmit={handleSubmit(callBackData)} className="w-full flex flex-col gap-[24px]">
            <div className="flex flex-col">
                <span className="text-[18px] font-semibold">Contact details</span>
                <span>This is where your confirmation will be sent</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                <CvInput
                    label="First name *"
                    placeholder="Please enter your first name"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                />
                <CvInput
                    label="Last name *"
                    placeholder="Please enter your last name"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                />
                <CvInput
                    label="Email *"
                    placeholder="Please enter your email"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <Controller
                    control={control}
                    name="country"
                    render={({ field }) => (
                        <CountrySelector
                             id={"country-selector"}
                            open={isOpen}
                            onToggle={() => setIsOpen(!isOpen)}
                            onChange={(e) => field.onChange(e)}
                            selectedValue={COUNTRIES.find((option) => option.value === (field.value === undefined ? country : field.value ))}
                        />
                    )}
                />
                <CvInput
                    label="Phone number *"
                    placeholder="Please enter your phone number"
                    type="number"
                    error={errors.phoneNumber?.message}
                    {...register("phoneNumber")}
                />
            </div>
            <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-semibold">Arrival details</span>
                <CvInput
                    label="Pick up location - Where will you arrive? *"
                    placeholder="Please enter your hotel"
                    error={errors.arrival_details?.message}
                    {...register("arrival_details")}
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
                        type="submit"
                    />
                </div>
            </div>
        </form>
    );
}