"use client"

import Image from "next/image";
import logo from "@/app/assets/images/svg/logo.svg";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Dropdown, type MenuProps, ConfigProvider } from 'antd';
import { useLocale } from 'next-intl';
import usFlag from "@/app/assets/images/svg/US.svg";
import thaiFlag from "@/app/assets/images/svg/Asia.svg";
import CvButton from "@/app/components/CvButton/CvButton";
import { PiListBold } from "react-icons/pi";
import React, { useState } from "react";
import { Drawer } from 'antd';
import { GrHomeRounded } from "react-icons/gr";
import { IoTicketOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuContact } from "react-icons/lu";

interface navType {
    label: string
    path: string
    icon: React.ReactElement
}

export default function Nav() {
    const locale = useLocale();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);    

    const t = useTranslations("nav");
    const homeT = useTranslations("home");

    const navConfig: navType[] = [
        {
            label: t("home"),
            path: "/",
            icon: <GrHomeRounded className="text-[16px]" />
        },
        {
            label: t("activities"),
            path: "/activities",
            icon: <IoTicketOutline className="text-[16px]" />
        },
        {
            label: t("blog"),
            path: "/blog",
            icon: <IoNewspaperOutline className="text-[16px]" />
        },
        {
            label: t("contactus"),
            path: "/contactus",
            icon: <LuContact className="text-[16px]" />
        },
    ];

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href="/en" className="flex items-center gap-[10px]">
                    <Image src={usFlag} width={25} alt="" />
                    <span>English</span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link href="/th" className="flex items-center gap-[10px]">
                    <Image src={thaiFlag} width={25} alt="" />
                    <span>ภาษาไทย</span>
                </Link>
            ),
        },
    ];
    
    return(
        <>
            <Drawer
                closable={false}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                width={300}
            >
                <CvButton label={homeT("signin-button")} />
                <div className="mt-[20px]">
                    <span className="text-[16px] font-semibold">More menu</span>
                    <div className="grid grid-cols-1 mt-[10px] gap-[10px]">
                        {
                            navConfig.map((item, key) => (
                                <Link key={key} href={item.path} className="text-[14px] text-primary flex items-center gap-[10px]">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </Drawer>
            <div className="w-full py-[15px] border-b border-b-[#D4D7DE]">
                <div className="hidden mx-[20px] 2xl:max-w-7xl 2xl:mx-auto md:flex justify-between items-center">
                    <div className="w-full flex items-center gap-[20px] lg:gap-[50px]">
                        <Image src={logo} width={160} alt="" />
                        <div className="flex items-center gap-[10px] lg:gap-[20px]">
                            {
                                navConfig.map((item, key) => (
                                    <Link key={key} href={item.path} className="text-[14px]">{item.label}</Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-end gap-[20px]">
                        <Dropdown menu={{ items }} placement="bottom" arrow>
                            <button className="text-[14px]">
                                {
                                    locale === "en" ?
                                    <div className="flex items-center gap-[10px]">
                                        <Image src={usFlag} alt="" />
                                        <span>English</span>
                                    </div>
                                    :
                                    <div className="flex items-center gap-[10px]">
                                        <Image src={thaiFlag} alt="" />
                                        <span>ภาษาไทย</span>
                                    </div>
                                }
                            </button>
                        </Dropdown>
                        <div className="w-[160px]">
                            <CvButton label={homeT("signin-button")} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center md:hidden mx-[10px]">
                    <Image src={logo} width={130} alt="" />
                    <div className="flex gap-[20px] items-center">
                        <Dropdown menu={{ items }} placement="bottom" arrow>
                            <button className="text-[14px]">
                                {
                                    locale === "en" ?
                                    <div className="flex items-center gap-[10px]">
                                        <Image src={usFlag} width={24} alt="" />
                                        <span>English</span>
                                    </div>
                                    :
                                    <div className="flex items-center gap-[10px]">
                                        <Image src={thaiFlag} width={24} alt="" />
                                        <span>ภาษาไทย</span>
                                    </div>
                                }
                            </button>
                        </Dropdown>
                        <button type="button" onClick={() => setOpenDrawer(true)}>
                            <PiListBold className="text-[24px]" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}