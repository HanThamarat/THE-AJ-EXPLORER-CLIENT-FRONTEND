"use client"

import { useLocale } from "next-intl"
import { AlertCircle, Calendar, DollarSign, Cloud } from "lucide-react"

export default function CancelBooking() {
    const locale = useLocale()
    const isThai = locale === 'th'

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {isThai ? 'นโยบายการยกเลิกการจอง' : 'Cancellation Policy'}
                </h1>
                <p className="text-gray-600">
                    {isThai 
                        ? 'เพื่อให้การเดินทางของคุณเป็นไปอย่างราบรื่น กรุณาตรวจสอบนโยบายการยกเลิกการจองก่อนทำการจองกิจกรรม'
                        : 'To ensure your trip goes smoothly, please review the cancellation policy before booking activities'
                    }
                </p>
            </div>

            {/* Policy Items */}
            <div className="space-y-6">
                {/* 3+ days before */}
                <div className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex items-start gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {isThai 
                                    ? 'ยกเลิกล่วงหน้าอย่างน้อย 3 วันก่อนวันเดินทาง'
                                    : 'Cancel at least 3 days before travel date'
                                }
                            </h3>
                            <div className="flex items-center gap-2 text-green-600 font-medium">
                                <DollarSign className="w-4 h-4" />
                                <span>
                                    {isThai 
                                        ? 'รับเงินคืน 100% ของยอดที่ชำระ'
                                        : 'Receive 100% refund of paid amount'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1-2 days before */}
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <div className="flex items-start gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-yellow-600 shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {isThai 
                                    ? 'ยกเลิกล่วงหน้า 1–2 วันก่อนวันเดินทาง'
                                    : 'Cancel 1–2 days before travel date'
                                }
                            </h3>
                            <div className="flex items-center gap-2 text-yellow-600 font-medium">
                                <DollarSign className="w-4 h-4" />
                                <span>
                                    {isThai 
                                        ? 'รับเงินคืน 50% ของยอดที่ชำระ'
                                        : 'Receive 50% refund of paid amount'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Same day or no-show */}
                <div className="border-l-4 border-red-500 pl-4 py-2">
                    <div className="flex items-start gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {isThai 
                                    ? 'ยกเลิกในวันเดินทาง หรือไม่มาใช้บริการ (No-show)'
                                    : 'Cancel on travel date or no-show'
                                }
                            </h3>
                            <div className="flex items-center gap-2 text-red-600 font-medium">
                                <AlertCircle className="w-4 h-4" />
                                <span>
                                    {isThai 
                                        ? 'ขอสงวนสิทธิ์ ไม่คืนเงินทุกกรณี'
                                        : 'We reserve the right to not refund in all cases'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Force majeure */}
                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                    <div className="flex items-start gap-3 mb-2">
                        <Cloud className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">
                                {isThai 
                                    ? 'กรณีสภาพอากาศหรือเหตุสุดวิสัย'
                                    : 'Weather conditions or force majeure'
                                }
                            </h3>
                            <p className="text-gray-700 text-sm mb-2">
                                {isThai 
                                    ? 'เช่น สภาพอากาศไม่ปลอดภัย ภัยธรรมชาติ หรือเหตุการณ์ที่อยู่นอกเหนือการควบคุม'
                                    : 'Such as unsafe weather conditions, natural disasters, or events beyond our control'
                                }
                            </p>
                            <p className="text-gray-700 text-sm font-medium">
                                {isThai 
                                    ? 'The AJ Explorer ขอสงวนสิทธิ์ในการ คืนเงินบางส่วน / คืนเงินเต็มจำนวน หรือเสนอการเลื่อนวันเดินทาง ตามความเหมาะสม ทั้งนี้ การพิจารณาของบริษัทถือเป็นที่สิ้นสุด'
                                    : 'The AJ Explorer reserves the right to provide partial refund / full refund or offer to reschedule the travel date as appropriate. The company\'s decision is final.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Note */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                    {isThai 
                        ? 'หมายเหตุ: การคืนเงินจะถูกดำเนินการภายใน 5-10 วันทำการหลังจากได้รับการอนุมัติ'
                        : 'Note: Refunds will be processed within 5-10 business days after approval'
                    }
                </p>
            </div>
        </div>
    )
}

