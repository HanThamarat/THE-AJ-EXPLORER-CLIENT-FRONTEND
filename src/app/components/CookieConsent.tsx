"use client"

import { useState, useEffect } from "react"
import { useLocale } from "next-intl"
import { X, Cookie } from "lucide-react"
import { Link } from "@/i18n/navigation"

export default function CookieConsent() {
    const locale = useLocale()
    const isThai = locale === 'th'
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already accepted cookies
        const cookieConsent = localStorage.getItem('cookieConsent')
        if (!cookieConsent) {
            setIsVisible(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted')
        setIsVisible(false)
    }

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-300">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-2xl border border-gray-200 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Cookie Icon */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Cookie className="w-6 h-6 text-purple-600" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 text-base md:text-lg">
                        {isThai ? 'จำเป็นต้องได้รับความยินยอม' : 'Consent Required'}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2">
                        {isThai 
                            ? 'เราใช้คุกกี้ที่จำเป็นอย่างเคร่งครัดหรือเพื่อการทำงานของเว็บไซต์และเครื่องมืออื่นๆ เพื่อช่วยปรับปรุงประสบการณ์ผู้ใช้ของคุณ'
                            : 'We use cookies that are strictly necessary or for the functioning of the website and other tools to help improve your user experience.'
                        }
                    </p>
                    <Link 
                        href="/terms/term" 
                        className="text-sm text-purple-600 hover:text-purple-700 underline font-medium"
                    >
                        {isThai ? 'เรียนรู้เพิ่มเติม' : 'Learn more'}
                    </Link>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
                    <button
                        onClick={handleDecline}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                    >
                        {isThai ? 'ปฏิเสธ' : 'Decline'}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors whitespace-nowrap"
                    >
                        {isThai ? 'ยอมรับ' : 'Accept'}
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleDecline}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={isThai ? 'ปิด' : 'Close'}
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

