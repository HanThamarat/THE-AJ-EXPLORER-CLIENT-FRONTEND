"use client"

import { useParams } from "next/navigation";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaBuildingUser } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { FiXCircle } from "react-icons/fi";
import { CiCreditCard2 } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/navigation";

import CancelBooking from "./components/CancelBooking";
import PaymentRefund from "./components/PaymentRefund";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsCondition from "./components/TermsCondition";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

export default function TermPage() {
    const { page } = useParams();
    const router = useRouter();
    const pathname = usePathname();

    const menu = [
        {
            title: "About Us",
            menu: [
                {
                    label: "Contract Us",
                    icon: <TfiHeadphoneAlt />,
                    route: '/terms/contract',
                },
                {
                    label: "About Us",
                    icon: <FaBuildingUser />,
                    route: '/terms/about-us',
                },
                {
                    label: "Terms and Condition",
                    icon: <IoDocumentTextOutline />,
                    route: '/terms/term',
                },
                {
                    label: "Privacy Policy",
                    icon: <GoShieldCheck />,
                    route: '/terms/privacy-policy',
                },
            ]
        },
        {
            title: "Customer Service",
            menu: [
                {
                    label: "Cancel Booking",
                    icon: <FiXCircle />,
                    route: '/terms/cancel',
                },
                {
                    label: "Payment & Refund",
                    icon: <CiCreditCard2 />,
                    route: '/terms/payment-refund',
                },
            ]
        }
    ];

    return(
        <div className="w-full px-[20px] mt-[40px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px] flex flex-col md:flex-row gap-[20px]">
            <div className="w-full md:w-1/4">
                <div className="w-full bg-white rounded-[10px] py-[15px] flex flex-col gap-[24px]">
                {
                    menu.map((data, key) => (
                            <div key={key} className="w-full h-fit flex flex-col gap-[10px]">
                            <span className="px-[15px]">{data.title}</span>
                            {
                                data.menu.map((item, key) => (
                                    <button 
                                        key={key} 
                                            className={`px-[11px] ${ pathname === item.route ? ' border-l-4 border-l-primary text-primary' : 'border-l-4 border-l-transparent' } py-[5px] flex items-center gap-[5px] w-full cursor-pointer duration-100 ease-in-out`}
                                        onClick={() => router.push(item.route)}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </button>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            </div>
            <div className="w-full md:w-3/4 bg-white rounded-[10px] py-[15px] px-[20px] md:px-[30px] flex flex-col gap-[24px]">
                {page === 'cancel' && <CancelBooking />}
                {page === 'payment-refund' && <PaymentRefund />}
                {page === 'privacy-policy' && <PrivacyPolicy />}
                {page === 'term' && <TermsCondition />}
                {page === 'about-us' && <AboutUs />}
                {page === 'contract' && <ContactUs />}
            </div>
        </div>
    );
};
