import CvInput from "@/app/components/input/CvInput";
import CountrySelector from "@/app/components/selector/country-selector";
import { COUNTRIES } from "@/app/libs/countries";
import { SelectMenuOption } from "@/app/libs/type";
import { useEffect, useState } from "react";
import DefaultTextArea from "@/app/components/textarea/default-textarea";
import CvButton from "@/app/components/CvButton/CvButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { contractBookingDTO, contractBookingDTOSchema } from "@/types/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import Link from "next/link";
import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { useTranslations } from "next-intl";

interface CustomerInfoProps {
    callBackData: (data: contractBookingDTO) => void; 
}

export default function CustomerInfo({  
    callBackData
}: CustomerInfoProps) {
    const t = useTranslations("checkout");
    const [isOpen, setIsOpen] = useState(false);
    // Default this to a country's code to preselect it
    const [country, setCountry] = useState<SelectMenuOption["value"]>("TH");
    const [accepterm, setAccepterm] = useState<boolean>(true);

    const onChange: CheckboxProps['onChange'] = (e) => {
        setAccepterm(!e.target.checked);
    };
      

    const {
        handleSubmit,
        control,
        reset,
        register,
        setValue,
        formState: { errors }        
    } = useForm<contractBookingDTO>({ resolver: zodResolver(contractBookingDTOSchema) });

    const handlerclickNextState: SubmitHandler<contractBookingDTO> = (date) => {
        callBackData(date);
    } 

    useEffect(() => {
        setValue("country", "TH");
    }, []);

    return(
        <form onSubmit={handleSubmit(callBackData)} className="w-full flex flex-col gap-[24px]">
            <div className="flex flex-col">
                <span className="text-[18px] font-semibold">{t("contact_details")}</span>
                <span>{t("confirmation_sent_to")}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                <CvInput
                    label={`${t("first_name")} *`}
                    placeholder={t("enter_first_name")}
                    error={errors.firstName?.message}
                    {...register("firstName")}
                />
                <CvInput
                    label={`${t("last_name")} *`}
                    placeholder={t("enter_last_name")}
                    error={errors.lastName?.message}
                    {...register("lastName")}
                />
                <CvInput
                    label={`${t("email")} *`}
                    placeholder={t("enter_email")}
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
                    label={`${t("phone_number")} *`}
                    placeholder={t("enter_phone_number")}
                    type="number"
                    error={errors.phoneNumber?.message}
                    {...register("phoneNumber")}
                />
            </div>
            <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-semibold">{t("arrival_details")}</span>
                <CvInput
                    label={`${t("pickup_location")} *`}
                    placeholder={t("enter_hotel")}
                    error={errors.arrival_details?.message}
                    {...register("arrival_details")}
                />
            </div>
            <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-semibold">{t("additional_details")}</span>
                <DefaultTextArea
                    label={t("special_requirements")}
                    placeholder={t("enter_special_requirements")}
                />
            </div>
            <div className="w-full border border-gray-200 rounded-full"></div>
            <div className=" flex w-full items-start gap-[5px]">
                <Checkbox onChange={onChange} value={accepterm} ></Checkbox>
                <div className="mt-[3px]">
                    {t("terms_agreement_full")} <Link href="/terms/term" className=" text-blue-700 underline">{t("terms_and_conditions")}</Link> {t("of_theajexplorer")} {t("privacy_statement")}
                </div>
            </div>
            <div className="w-full flex justify-end">
                <div className="w-[200px]">
                    <CvButton
                        label={t("next_payment_info")}
                        type="submit"
                        disable={accepterm}
                    />
                </div>
            </div>
        </form>
    );
}