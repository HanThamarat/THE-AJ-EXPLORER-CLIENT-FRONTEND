"use client"

import { useLocale } from "next-intl"
import { AlertCircle, Calendar, DollarSign, Cloud, CreditCard, Shield, Clock } from "lucide-react"

export default function PaymentRefund() {
    const locale = useLocale()
    const isThai = locale === 'th'

    return (
        <div className="w-full space-y-8">
            {/* Payment Section */}
            <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {isThai ? 'การชำระเงิน' : 'Payment'}
                    </h1>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'การจองกิจกรรมกับ The AJ Explorer ต้องชำระเงิน เต็มจำนวนล่วงหน้า เพื่อยืนยันการจอง'
                            : 'Booking activities with The AJ Explorer requires full payment in advance to confirm your booking'
                        }
                    </p>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {isThai ? 'ระบบชำระเงินที่ปลอดภัย' : 'Secure Payment System'}
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    {isThai 
                                        ? 'เราใช้ระบบชำระเงินผ่าน Omise Payment Gateway ซึ่งมีมาตรฐานความปลอดภัยระดับสากล'
                                        : 'We use Omise Payment Gateway, which has international security standards'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-purple-600" />
                            <span>
                                {isThai 
                                    ? 'รองรับช่องทางการชำระเงินดังต่อไปนี้'
                                    : 'Supported Payment Methods'
                                }
                            </span>
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>
                                    {isThai 
                                        ? 'บัตรเครดิต / บัตรเดบิต (Visa, Mastercard และเครือข่ายที่รองรับ)'
                                        : 'Credit / Debit Cards (Visa, Mastercard and supported networks)'
                                    }
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>PromptPay</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>
                                    {isThai 
                                        ? 'Mobile Banking และ Internet Banking ของธนาคารที่รองรับ'
                                        : 'Mobile Banking and Internet Banking of supported banks'
                                    }
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <p className="text-gray-700 text-sm">
                            {isThai 
                                ? 'เมื่อการชำระเงินสำเร็จ การจองจะถือว่าได้รับการยืนยันโดยสมบูรณ์ และพร้อมสำหรับการเดินทางของคุณ'
                                : 'Once payment is successful, your booking will be fully confirmed and ready for your trip'
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Cancellation & Refund Policy Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
                <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {isThai ? 'การยกเลิกและการคืนเงิน' : 'Cancellation & Refund Policy'}
                    </h2>
                </div>

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
                                        ? 'กรณีสภาพอากาศไม่เอื้ออำนวย หรือเหตุสุดวิสัย'
                                        : 'Unfavorable weather conditions or force majeure'
                                    }
                                </h3>
                                <p className="text-gray-700 text-sm mb-2">
                                    {isThai 
                                        ? 'เช่น สภาพอากาศที่ไม่ปลอดภัย ภัยธรรมชาติ หรือเหตุการณ์ที่อยู่นอกเหนือการควบคุมของบริษัท'
                                        : 'Such as unsafe weather conditions, natural disasters, or events beyond the company\'s control'
                                    }
                                </p>
                                <p className="text-gray-700 text-sm font-medium">
                                    {isThai 
                                        ? 'The AJ Explorer ขอสงวนสิทธิ์ในการ คืนเงินบางส่วน หรือคืนเงินเต็มจำนวน หรือ เสนอการเลื่อนวันเดินทาง ตามความเหมาะสม โดยคำนึงถึงความปลอดภัยและประสบการณ์ที่ดีที่สุดของผู้เดินทางเป็นสำคัญ ทั้งนี้ การพิจารณาของบริษัทถือเป็นที่สิ้นสุด'
                                        : 'The AJ Explorer reserves the right to provide partial refund or full refund, or offer to reschedule the travel date as appropriate, prioritizing the safety and best experience of travelers. The company\'s decision is final.'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Refund Processing Section */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-purple-600" />
                        <span>
                            {isThai ? 'ระยะเวลาในการคืนเงิน' : 'Refund Processing Time'}
                        </span>
                    </h2>
                </div>

                <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <p className="text-gray-700 mb-2">
                            {isThai 
                                ? 'การคืนเงินจะดำเนินการผ่านช่องทางเดียวกับที่ใช้ชำระเงิน'
                                : 'Refunds will be processed through the same channel used for payment'
                            }
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-1" />
                        <div>
                            <p className="text-gray-700">
                                {isThai 
                                    ? 'ระยะเวลาดำเนินการคืนเงินโดยประมาณ 7–14 วันทำการ ทั้งนี้ขึ้นอยู่กับกระบวนการของธนาคารหรือผู้ให้บริการชำระเงิน'
                                    : 'Refund processing time is approximately 7–14 business days, depending on the bank or payment service provider\'s process'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

