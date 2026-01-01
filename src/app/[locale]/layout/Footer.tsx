"use client"

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { HiEnvelope } from "react-icons/hi2";
import logo from "@/app/assets/images/svg/logo.svg";
import { useState } from "react";

export default function Footer() {
    const locale = useLocale();
    const [email, setEmail] = useState("");
    
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log("Subscribe:", email);
        setEmail("");
    };
    
    return(
        <div className="w-full flex flex-col lg:flex-row">
            {/* Left Column - Blue Background */}
            <div className="w-full lg:w-[40%] bg-[#613DC1] py-[40px] sm:py-[50px] px-[30px] sm:px-[40px] lg:px-[50px]">
                <div className="flex flex-col gap-[30px] sm:gap-[40px]">
                    {/* Logo */}
                    <div className="w-[160px] sm:w-[180px]">
                        <Image 
                            src={logo} 
                            alt="The AJ Explorer Logo" 
                            width={180} 
                            height={60}
                            className="w-full h-auto brightness-0 invert"
                        />
                    </div>
                    
                    {/* Social Media Icons */}
                    <div className="flex items-center gap-[12px]">
                        <a 
                            href="#" 
                            className="w-[40px] h-[40px] border-2 border-white rounded flex items-center justify-center text-white hover:bg-white hover:text-[#613DC1] transition-all"
                            aria-label="Facebook"
                        >
                            <FaFacebook className="w-[18px] h-[18px]" />
                        </a>
                        <a 
                            href="#" 
                            className="w-[40px] h-[40px] border-2 border-white rounded flex items-center justify-center text-white hover:bg-white hover:text-[#613DC1] transition-all"
                            aria-label="YouTube"
                        >
                            <FaYoutube className="w-[18px] h-[18px]" />
                        </a>
                        <a 
                            href="#" 
                            className="w-[40px] h-[40px] border-2 border-white rounded flex items-center justify-center text-white hover:bg-white hover:text-[#613DC1] transition-all"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="w-[18px] h-[18px]" />
                        </a>
                        <a 
                            href="#" 
                            className="w-[40px] h-[40px] border-2 border-white rounded flex items-center justify-center text-white hover:bg-white hover:text-[#613DC1] transition-all"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="w-[18px] h-[18px]" />
                        </a>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="flex flex-col gap-[15px] text-white text-[14px] sm:text-[15px]">
                        <p>
                            {locale === 'th' 
                                ? '478 หมู่2 ตำบลอ่าวนาง อำเภอเมือง จังหวัดกระบี่ 81180'
                                : '478 Moo 2, Ao Nang Sub-district, Mueang District, Krabi Province 81180'
                            }
                        </p>
                        <p>
                            <a href="tel:0990356899" className="hover:underline">(099) 035-6899</a>
                        </p>
                        <p>
                            <a href="tel:0633415693" className="hover:underline">(063) 341-5693</a>
                        </p>
                        <p>
                            <a href="mailto:ajorigin2025@gmail.com" className="hover:underline">ajorigin2025@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Right Column - Light Gray Background */}
            <div className="w-full lg:w-[60%] bg-white py-[40px] sm:py-[50px] px-[30px] sm:px-[40px] lg:px-[50px]">
                <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[50px]">
                    {/* Services Section */}
                    <div className="flex flex-col gap-[20px]">
                        <h3 className="font-bold text-[16px] sm:text-[18px] text-gray-800">
                            {locale === 'th' ? 'บริการ' : 'Services'}
                        </h3>
                        <div className="flex flex-col gap-[10px] text-[14px] text-gray-700">
                            <Link href={`/${locale}/package`} className="hover:text-[#613DC1] transition-colors">
                                {locale === 'th' ? 'แพ็กเกจท่องเที่ยว' : 'Travel Packages'}
                            </Link>
                            <Link href={`/${locale}/package`} className="hover:text-[#613DC1] transition-colors">
                                {locale === 'th' ? 'กิจกรรม' : 'Activities'}
                            </Link>
                            <Link href={`/${locale}/blog`} className="hover:text-[#613DC1] transition-colors">
                                {locale === 'th' ? 'บล็อก' : 'Blog'}
                            </Link>
                            <Link href={`/${locale}/account/booking`} className="hover:text-[#613DC1] transition-colors">
                                {locale === 'th' ? 'การจอง' : 'Bookings'}
                            </Link>
                        </div>
                    </div>
                    
                    {/* Company Section */}
                    <div className="flex flex-col gap-[20px]">
                        <h3 className="font-bold text-[16px] sm:text-[18px] text-gray-800">
                            {locale === 'th' ? 'บริษัท' : 'Company'}
                        </h3>
                        <div className="flex flex-col gap-[10px] text-[14px] text-gray-700">
                            <Link href={`/${locale}/about`} className="hover:text-[#613DC1] transition-colors">
                                {locale === 'th' ? 'เกี่ยวกับเรา' : 'About'}
                            </Link>
                            <Link href={`/${locale}/contactus`} className="hover:text-[#613DC1] transition-colors">
                                {locale === 'th' ? 'ติดต่อเรา' : 'Contact'}
                            </Link>
                            <Link href={`/${locale}/terms-of-use`} className="hover:text-[#613DC1] transition-colors">
                                {locale === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'}
                            </Link>
                            <Link href={`/${locale}/privacy-policy`} className="hover:text-[#613DC1] transition-colors">
                                {locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
                            </Link>
                        </div>
                    </div>
                    
                    {/* Newsletter Section */}
                    <div className="flex flex-col gap-[20px]">
                        <h3 className="font-bold text-[16px] sm:text-[18px] text-gray-800">
                            {locale === 'th' ? 'จดหมายข่าว' : 'Our Newsletter'}
                        </h3>
                        <p className="text-[14px] text-gray-600 leading-relaxed">
                            {locale === 'th' 
                                ? 'อย่าพลาดข่าวสารล่าสุด อัปเดต และข้อเสนอพิเศษจากบริษัทของเรา! สมัครรับจดหมายข่าววันนี้และรับข้อมูลภายในส่งตรงถึงกล่องจดหมายของคุณ'
                                : "Never miss out on our company's latest news, updates, and exclusive offers! Subscribe to our newsletter today and get the inside scoop delivered straight to your inbox."
                            }
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-[12px]">
                            <div className="relative">
                                <HiEnvelope className="absolute left-[12px] top-1/2 -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
                                <input
                                    type="email"
                                    placeholder={locale === 'th' ? 'ที่อยู่อีเมล' : 'Email Address'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-[40px] pr-[12px] py-[12px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#613DC1] focus:border-transparent text-[14px]"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#613DC1] text-white py-[12px] rounded font-medium hover:bg-[#5029a8] transition-colors text-[14px]"
                            >
                                {locale === 'th' ? 'สมัครรับจดหมาย' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="mt-[40px] pt-[20px] border-t border-gray-300">
                    <p className="text-[13px] text-gray-600">
                        © {new Date().getFullYear()}. All Rights Reserved. Built by The AJ Explorer with ❤️
                    </p>
                </div>
            </div>
        </div>
    )
}