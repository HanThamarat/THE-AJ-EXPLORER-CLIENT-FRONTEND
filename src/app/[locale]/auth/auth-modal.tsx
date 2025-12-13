"use client"

import { Modal } from 'antd';
import CvButton from '@/app/components/CvButton/CvButton';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import CvInput from '@/app/components/input/CvInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authDTOType, authEntitySchema } from '@/app/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import notify from '@/app/components/CvAlert/toastify';
import { useAppDispatch } from '@/app/hooks/appDispatch';
import { createAccount } from '@/app/store/slice/authSlice';

interface AuthModalProps {
    isOpen?: boolean;
    onCancel?: () => void;
}

export const AuthModal = ({
    isOpen,
    onCancel
}: AuthModalProps) => {

    const t = useTranslations("home");
    const t_auth = useTranslations("auth");
    const schema = authEntitySchema(t_auth);
    const [isOpenAuthModal, setIsOpenAuthModal] = useState<boolean>(false);
    const [isLoadingGoogleBtn, setIsLaodingGoogleBtn] = useState<boolean>(false);
    const [isLoadingSign, setIsLoadingSign] = useState<boolean>(false);
    const [state, setState] = useState<"sigin"| "signup">("sigin");
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        register
    } = useForm<authDTOType>({ resolver: zodResolver(schema) });

    const handlerSubmitSignin: SubmitHandler<authDTOType> = async (data) => {
        await setIsLoadingSign(true);

        const response : any = state === "sigin" ? await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        }) : await dispatch(createAccount(data));

        if (response.error && state === "sigin") {
            setIsLoadingSign(false);
            notify({
                postion: "top-center",
                label: "Please recheck your credentail.",
                type: "error"
            })
        }

        if (state === "signup") {
            if (response.payload.status === true) {
                reset({
                    name: "",
                    email: "",
                    password: "",
                });
                setIsLoadingSign(false);
                notify({
                    postion: "top-center",
                    label: "Create account successfully.",
                    type: "success"
                });
                setState("sigin");
            } else {
                setIsLoadingSign(false);
                notify({
                    postion: "top-center",
                    label: "Please recheck your credentail.",
                    type: "error"
                });
            }
        }
    }

    const handleGoogleSignIn = async () => {
        await setIsLaodingGoogleBtn(true);
        await signIn('google');
        setIsLaodingGoogleBtn(false);
    };

    return(
        <>
            {
                isOpen === undefined && 
                <div className='w-full'>
                    <CvButton 
                        label={t("signin-button")}
                        onClick={() => setIsOpenAuthModal(true)}
                    />
                </div>
            }
            <Modal
                closable={{ 'aria-label': 'Custom Close Button' }}
                footer={false}
                open={isOpen === undefined ? isOpenAuthModal : isOpen}
                onCancel={() => isOpen === undefined ? setIsOpenAuthModal(false) : onCancel}
                width={600}
            >
                <div className='w-full flex flex-col gap-[24px]'>
                    <div className='flex justify-center'>
                        <span className='text-[16px] font-semibold'>{t_auth("title")}</span>
                    </div>
                    <form onSubmit={handleSubmit(handlerSubmitSignin)} className='w-full flex flex-col gap-[10px]'>
                        {
                            state === 'signup' &&
                             <CvInput
                                label={t_auth("name")}
                                placeholder={t_auth("name_err_null")}
                                error={errors && errors.name?.message}
                                {...register("name")}
                            />
                        }
                        <CvInput
                            label={t_auth("email")}
                            placeholder={t_auth("email_err_null")}
                            error={errors && errors.email?.message}
                            {...register("email")}
                        />
                        <CvInput
                            label={t_auth("password")}
                            placeholder={t_auth("password_err_null")}
                            error={errors && errors.password?.message}
                            {...register("password")}
                        />
                        <div className='w-full mt-[15x]'>
                            <CvButton
                                label={state === 'sigin' ? t_auth("signin_btn") : t_auth("signup_btn")}
                                type="submit"
                                isLoading={isLoadingSign}
                            />
                        </div>
                    </form>
                    {
                        state === "sigin" &&
                        <div className='flex items-center gap-[10px]'>
                            <div className='border w-full rounded-full border-gray-200'></div>
                            <span className='text-gray-500'>Or</span>
                            <div className='border w-full rounded-full border-gray-200'></div>
                        </div>
                    }
                    {
                        state === 'sigin' &&
                        <div className='flex flex-col gap-[10px]'>
                            <CvButton
                                label='Create with Email'
                                color='#495AFF'
                                onClick={() => setState("signup")}
                            />
                            <CvButton
                                icon={<FcGoogle className='text-[24px]' />}
                                label='SignIn with Google'
                                color='#333333'
                                onClick={handleGoogleSignIn}
                                isLoading={isLoadingGoogleBtn}
                            />
                        </div>
                    }
                </div>
            </Modal>
        </>
    );
}