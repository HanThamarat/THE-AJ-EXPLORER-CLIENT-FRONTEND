"use client"

import { useLocale } from "next-intl"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactUs() {
    const locale = useLocale()
    const isThai = locale === 'th'

    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {isThai ? 'ติดต่อเรา' : 'Contact Us'}
                </h1>
                <p className="text-gray-600 mb-2">The AJ Explorer</p>
                <p className="text-gray-700 leading-relaxed">
                    {isThai 
                        ? 'เรายินดีรับฟังความคิดเห็น คำถาม หรือข้อเสนอแนะของคุณ กรุณาติดต่อเราผ่านช่องทางใดช่องทางหนึ่งด้านล่าง'
                        : 'We\'d love to hear from you. Please contact us through any of the channels below.'
                    }
                </p>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                            <MapPin className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                                {isThai ? 'ที่อยู่' : 'Address'}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                478 หมู่2 ตำบลอ่าวนาง<br />
                                อำเภอเมือง จังหวัดกระบี่ 81180
                            </p>
                            {!isThai && (
                                <p className="text-gray-700 leading-relaxed mt-2">
                                    478 Moo 2, Ao Nang Sub-district<br />
                                    Mueang District, Krabi Province 81180
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Phone Numbers */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                            <Phone className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                                {isThai ? 'เบอร์โทรศัพท์' : 'Phone'}
                            </h3>
                            <div className="space-y-2">
                                <a 
                                    href="tel:0990356899" 
                                    className="block text-gray-700 hover:text-purple-600 transition-colors"
                                >
                                    (099) 035-6899
                                </a>
                                <a 
                                    href="tel:0633415693" 
                                    className="block text-gray-700 hover:text-purple-600 transition-colors"
                                >
                                    (063) 341-5693
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow md:col-span-2">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                            <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                                {isThai ? 'อีเมล' : 'Email'}
                            </h3>
                            <a 
                                href="mailto:ajorigin2025@gmail.com" 
                                className="text-gray-700 hover:text-purple-600 transition-colors break-all"
                            >
                                ajorigin2025@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200 mt-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                    {isThai ? 'เวลาทำการ' : 'Business Hours'}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                    <strong>{isThai ? 'วันจันทร์ - วันอาทิตย์: 08:00 - 17:00 น.' : 'Monday - Sunday: 8:00 AM - 5:00 PM'}</strong>
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                    {isThai 
                        ? 'ระบบจองออนไลน์ของเราพร้อมให้บริการตลอด 24 ชั่วโมง สำหรับคำถามหรือความช่วยเหลือเพิ่มเติม กรุณาติดต่อเราผ่านช่องทางที่ระบุไว้ด้านบนในช่วงเวลาทำการ'
                        : 'Our online booking system is available 24/7. For additional questions or assistance, please contact us through the channels listed above during business hours.'
                    }
                </p>
            </div>

            {/* Social Media Note */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed text-sm">
                    {isThai 
                        ? 'คุณยังสามารถติดตามเราได้ผ่านช่องทางโซเชียลมีเดียของเราเพื่อรับข่าวสารล่าสุด ข้อเสนอพิเศษ และอัปเดตเกี่ยวกับประสบการณ์การเดินทางใหม่ๆ'
                        : 'You can also follow us on our social media channels for the latest news, special offers, and updates on new travel experiences.'
                    }
                </p>
            </div>
        </div>
    )
}

