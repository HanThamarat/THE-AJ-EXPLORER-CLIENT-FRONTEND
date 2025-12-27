"use client"

import Image from "next/image";
import logo from "@/app/assets/images/svg/logo.svg";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Dropdown, type MenuProps } from 'antd';
import { useLocale } from 'next-intl';
import usFlag from "@/app/assets/images/svg/US.svg";
import thaiFlag from "@/app/assets/images/svg/Asia.svg";
import CvButton from "@/app/components/CvButton/CvButton";
import { PiListBold } from "react-icons/pi";
import React, { useEffect, useState } from "react";
import { Drawer } from 'antd';
import { GrHomeRounded } from "react-icons/gr";
import { IoTicketOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuContact } from "react-icons/lu";
import { usePathname } from "@/i18n/navigation";
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthModal } from "../auth/auth-modal";
import Cookies from "js-cookie";

import MyTrip from "@/app/assets/images/svg/luggage-02.svg";
import Review from "@/app/assets/images/svg/compass-03.svg";
import Setting from "@/app/assets/images/svg/settings-02.svg";
import Logout from "@/app/assets/images/svg/log-in-01.svg";

interface navType {
    label: string
    path: string
    icon: React.ReactElement
}

export default function Nav() {
    const locale = useLocale();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);  
    const [shortName, setShortName] = useState<Array<string>>([]);  
    const [isLoading, setIsLoading] = useState<boolean>(true);  
    const currentPath = usePathname();    
    const { data: session, status } = useSession();
    const router = useRouter();

    const t = useTranslations("nav");
    const homeT = useTranslations("home");
    const t_menu = useTranslations("menu");

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
                <Link href={`/en${currentPath}`} className="flex items-center gap-[10px]">
                    <Image src={usFlag} width={25} alt="" />
                    <span>English</span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link href={`/th${currentPath}`} className="flex items-center gap-[10px]">
                    <Image src={thaiFlag} width={25} alt="" />
                    <span>ภาษาไทย</span>
                </Link>
            ),
        },
    ];

    const settingItems: MenuProps['items'] = [
        {
            key: 'MyTrip',
            icon: <Image src={MyTrip} alt="" width={16} height={16} />,
            label: (
                <Link href="/account/booking?page=upcoming">
                    { t_menu("mytrip") }
                </Link>
            ),
        },
        {
            key: 'Reviews',
            icon: <Image src={Review} width={16} height={16} alt="" />,
            label: (
                <Link href="/profile">
                    { t_menu("Reviews") }
                </Link>
            ),
        },
        {
            key: 'Setting',
            icon: <Image src={Setting} width={16} height={16} alt="" />,
            label: (
                <Link href="/account-settings">
                    { t_menu("Setting") }
                </Link>
            ),
        },
        {
            key: 'Logout',
            icon: <Image src={Logout} width={16} height={16} alt="" />,
            label: (
                <button onClick={() => signOut()}>{ t_menu("Signout") }</button>
            ),
        },
    ];

    useEffect(() => {
        if (session?.user?.name) {
            let shortName: Array<string> = [];
            const splitName = session.user.name.split(" ");
            for (const name of splitName) {
                shortName.push(name.slice(0, 1).toUpperCase())
            }
            setShortName(shortName);
            setIsLoading(false);
        }
    }, [session]);

    return(
        <>
            <Drawer
                closable={false}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                width={300}
            >
                {
                    status === 'loading' ?
                    <div>
                        <div className='animate-pulse bg-gray-200 rounded-[5px]'><span className='invisible'>Thamarat Laosen</span></div>
                        <div className='animate-pulse bg-gray-200 mt-[2px] rounded-[5px]'><span className='invisible'>Thamarat Laosen</span></div>
                    </div>
                    :
                    status === 'authenticated' ?
                    <Dropdown menu={{ items: settingItems }} placement="bottom" arrow>
                        <button className="flex gap-[10px] items-center">
                            {
                                session.user?.image !== undefined && session.user?.image !== null ?
                                <Image src={session.user?.image as string} alt="" width={35} height={35} className="object-cover rounded-full outline-[#2C0735]/80 outline-[4px]" />
                                :
                                <div className="flex justify-center items-center rounded-full w-[35px] h-[35px] bg-[#2C0735]">
                                    {
                                    !isLoading && shortName.map((data, key) => (<span key={key} className="text-white font-semibold">{ data }</span>))
                                    }
                                </div>
                            }
                            <span>{session.user?.name}</span>
                        </button>
                    </Dropdown>
                    :
                    <div className="w-[160px]">
                        <AuthModal />
                    </div>
                }
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
                        <Link href="/">
                            <Image src={logo} width={160} alt="" />
                        </Link>
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
                        {
                            status === 'loading' ?
                            <div>
                                <div className='animate-pulse bg-gray-200 rounded-[5px]'><span className='invisible'>Thamarat Laosen</span></div>
                                <div className='animate-pulse bg-gray-200 mt-[2px] rounded-[5px]'><span className='invisible'>Thamarat Laosen</span></div>
                            </div>
                            :
                            status === 'authenticated' ?
                            <Dropdown menu={{ items: settingItems }} placement="bottom" arrow>
                                <button className="flex gap-[10px] items-center">
                                    {
                                        session.user?.image !== undefined && session.user?.image !== null ?
                                        <Image src={session.user?.image as string} alt="" width={35} height={35} className="object-cover rounded-full outline-[#2C0735]/80 outline-[4px]" />
                                        :
                                        <div className="flex justify-center items-center rounded-full w-[35px] h-[35px] bg-[#2C0735]">
                                           {
                                            !isLoading && shortName.map((data, key) => (<span key={key} className="text-white font-semibold">{ data }</span>))
                                           }
                                        </div>
                                    }
                                    <span>{session.user?.name}</span>
                                </button>
                            </Dropdown>
                            :
                            <div className="w-[160px]">
                                <AuthModal />
                            </div>
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center md:hidden mx-[10px]">
                    <Link href="/">
                        <Image src={logo} width={130} alt="" />
                    </Link>
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