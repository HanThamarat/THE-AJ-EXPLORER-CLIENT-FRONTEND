"use client"

import { IoIosArrowBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { TbCreditCardRefund } from "react-icons/tb";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { bankAccDTOSchema, bankAccDTOType, cancelBookingDTOType } from "@/types/cancel";
import { zodResolver } from "@hookform/resolvers/zod";
import CvInput from "@/app/components/input/CvInput";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { useSelector } from "react-redux";
import { cancelSelector, createNewCancel } from "@/app/store/slice/cancelSlice";
import { getBankOption } from "@/app/store/slice/cancelSlice";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import CvSelector, { SelectorOptionTpye } from "@/app/components/selector/CvSelector";
import Image from "next/image";
import CvButton from "@/app/components/CvButton/CvButton";
import { DeleteConfirmModal } from "@/app/components/modal/default-modal";
import { createNewCancelProps } from "@/app/store/slice/cancelSlice";
import notify from "@/app/components/CvAlert/toastify";

export default function BookingCancel() {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { bankOption } = useSelector(cancelSelector);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [bankOptional, setBankoptional] = useState<SelectorOptionTpye[]>([]);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
    const [accData, setAccData] = useState<bankAccDTOType | null>();
    const isFathcing = useRef<boolean>(false); 
    const { data: session, status } = useSession();
    const { bookingId } = useParams(); 

    const {
        handleSubmit,
        control,
        reset,
        register,
        formState: { errors }
    } = useForm<bankAccDTOType>({ resolver: zodResolver(bankAccDTOSchema) });

    const handlerSubmitBankAcc: SubmitHandler<bankAccDTOType> = async (data) => {
        setAccData(data);
        setIsOpenConfirmModal(true);
    }

    const handlerConfirm = async () => {
        try {
            if (!accData) return;

            const dataFormat: cancelBookingDTOType = {
                bookingId: bookingId as string,
                reason: "no reason",
                bankAccount: accData
            };

            const data: createNewCancelProps = {
                accessToken: session?.authToken as string,
                dataDTO: dataFormat
            };

            const response: any = await dispatch(createNewCancel(data));

            console.log(response.payload);
            

            if (response.payload.status === true) {
                notify({
                    type: "success",
                    label: "Cancel a booking successfully.",
                });
                setIsOpenConfirmModal(false);
                router.back();
            } else {
                throw response.payload.error;
            }
        } catch (error) {
            setIsOpenConfirmModal(false);
            notify({
                type: "error",
                label: error as string ?? "Have something worng, please try again later."
            });
        }
    }

    useEffect(() => {
        
        if (status === "loading") return;

        const fecthBankData = async () => {
            if (isFathcing.current) return;
            isFathcing.current = true;
            await dispatch(getBankOption(session?.authToken as string));
            isFathcing.current = false;
        }

        fecthBankData();

    }, [dispatch, status]);

    useEffect(() => {

        if (bankOption !== null) {
            const mapBankOption: SelectorOptionTpye[] = bankOption.map((item) => ({
                value: item.id,
                label: <div className="flex items-center gap-[10px]">
                    <Image src={item.bankPicture} alt="" width={24} height={24} />
                    <span>{ item.bankNameEn }</span>
                </div>
            }));
            setBankoptional(mapBankOption);
            setIsLoading(false);
        }

    }, [bankOption]);

    return(
        <>
            <DeleteConfirmModal
                title="Do you want to cancel a booking"
                description="confirm for cancel this booking"
                open={isOpenConfirmModal}
                confirmFunc={handlerConfirm}
                cancalFunc={() => setIsOpenConfirmModal(false)}
            />
            <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px] flex flex-col gap-[35px]">
                <div>
                     <button
                        className="mt-[45px] flex items-center gap-[5px] rounded-[10px] py-[10px] pl-[5px] pr-[10px] hover:bg-gray-200 duration-100 ease-in-out"
                        onClick={() => router.back()}
                    >
                        <IoIosArrowBack className="text-[18px]" />
                        <span>Back to Booking detail</span>
                    </button>
                </div>
                <div className="w-full bg-white rounded-[20px]">
                    <div className="flex items-center gap-[10px] border-b border-b-gray-200 p-[20px]">
                        <TbCreditCardRefund className="text-[24px]" />
                        <div className="flex flex-col">
                            <span className="text-[16px] font-semibold">Bank Infomation</span>
                            <span>Enter bank infomation to refund.</span>
                        </div>
                    </div>
                    <form 
                     className="w-full p-[20px] flex flex-col gap-[20px]"
                     onSubmit={handleSubmit(handlerSubmitBankAcc)}
                    >
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                            <CvInput
                                label="First name *"
                                placeholder="Enter first name"
                                {...register("accountFirstName")}
                                error={errors.accountFirstName?.message}
                            />
                            <CvInput
                                label="Last name *"
                                placeholder="Enter first name"
                                {...register("accountLastName")}
                                error={errors.accountLastName?.message}
                            />
                            <div className="w-full flex flex-col">
                                <Controller
                                    control={control}
                                    name="bankId"
                                    render={({ field }) => (
                                        <CvSelector
                                            placeholder="Select the bank provider"
                                            label="Select Bank"
                                            option={bankOptional}
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    )}
                                />
                                { errors && <span className="text-red-500">{errors.bankId?.message}</span> }
                            </div>
                            <CvInput
                                label="Account Number *"
                                placeholder="Enter Account number"
                                {...register("accountNumber")}
                                error={errors.accountNumber?.message}
                            />
                        </div>
                        <div className="w-full flex justify-end items-center gap-[10px]">
                            <div className="w-fit">
                                <CvButton
                                    type="submit"
                                    label="Confirm"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};