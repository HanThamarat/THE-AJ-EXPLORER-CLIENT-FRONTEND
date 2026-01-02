"use client"

import { useLocale } from "next-intl"
import { User, Mail, Lock, Eye, Cookie, Shield, FileText, AlertCircle } from "lucide-react"

export default function PrivacyPolicy() {
    const locale = useLocale()
    const isThai = locale === 'th'

    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {isThai ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
                </h1>
                <p className="text-gray-600">
                    The AJ Explorer
                </p>
                <p className="text-gray-700 mt-2 leading-relaxed">
                    {isThai 
                        ? 'ที่ The AJ Explorer เราให้ความสำคัญกับความเป็นส่วนตัวของคุณและมุ่งมั่นในการปกป้องข้อมูลส่วนบุคคลของคุณ นโยบายความเป็นส่วนตัวนี้อธิบายวิธีการรวบรวม ใช้ เปิดเผย และปกป้องข้อมูลของคุณเมื่อคุณเยี่ยมชมเว็บไซต์ของเราหรือทำการจองกับเรา'
                        : 'At The AJ Explorer, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a booking with us.'
                    }
                </p>
            </div>

            {/* Section 1: Information We Collect */}
            <section className="space-y-4">
                <div className="flex items-start gap-3">
                    <User className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            1. {isThai ? 'ข้อมูลที่เรารวบรวม' : 'Information We Collect'}
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            {isThai 
                                ? 'เราอาจรวบรวมข้อมูลส่วนบุคคลเมื่อคุณใช้เว็บไซต์ของเราหรือจองกิจกรรม รวมถึงแต่ไม่จำกัดเพียง:'
                                : 'We may collect personal information when you use our website or book an activity, including but not limited to:'
                            }
                        </p>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ชื่อ-นามสกุล' : 'Full name'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ที่อยู่อีเมลและข้อมูลติดต่อ' : 'Email address and contact details'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'รายละเอียดการจองและกิจกรรม' : 'Booking and activity details'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ข้อมูลที่เกี่ยวข้องกับการชำระเงิน (ประมวลผลโดยผู้ให้บริการชำระเงินบุคคลที่สามเท่านั้น)' : 'Payment-related information (processed by third-party payment providers only)'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ข้อมูลทางเทคนิค เช่น ที่อยู่ IP ประเภทเบราว์เซอร์ ข้อมูลอุปกรณ์ และคุกกี้' : 'Technical data such as IP address, browser type, device information, and cookies'}</span>
                            </li>
                        </ul>
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-gray-700">
                                <strong>{isThai ? 'หมายเหตุ:' : 'Note:'}</strong> {isThai 
                                    ? 'The AJ Explorer ไม่ได้เก็บข้อมูลบัตรเครดิตหรือบัตรเดบิต ข้อมูลการชำระเงินทั้งหมดจะถูกจัดการอย่างปลอดภัยโดยผู้ให้บริการชำระเงินของเรา'
                                    : 'The AJ Explorer does not store credit or debit card information. All payment data is handled securely by our payment service provider.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                    <Mail className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            2. {isThai ? 'วิธีที่เราใช้ข้อมูลของคุณ' : 'How We Use Your Information'}
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            {isThai ? 'เราใช้ข้อมูลของคุณเพื่อ:' : 'We use your information to:'}
                        </p>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ประมวลผลและจัดการจองกิจกรรม' : 'Process and manage activity bookings'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'สื่อสารข้อมูลสำคัญที่เกี่ยวข้องกับการจองของคุณ' : 'Communicate important information related to your booking'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ให้บริการและปรับปรุงบริการและประสบการณ์ผู้ใช้' : 'Provide and improve our services and user experience'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'รับประกันความปลอดภัยของเว็บไซต์และป้องกันการฉ้อโกง' : 'Ensure website security and prevent fraud'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ปฏิบัติตามข้อกำหนดทางกฎหมายและกฎระเบียบ' : 'Comply with legal and regulatory requirements'}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 3: Payment Security */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            3. {isThai ? 'ความปลอดภัยในการชำระเงิน' : 'Payment Security'}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {isThai 
                                ? 'การชำระเงินทั้งหมดจะถูกประมวลผลผ่าน Omise Payment Gateway ซึ่งเป็นผู้ให้บริการชำระเงินที่เชื่อถือได้ที่มีมาตรฐานความปลอดภัยระดับสากล The AJ Explorer ไม่สามารถเข้าถึงรายละเอียดการชำระเงินเต็มรูปแบบของคุณได้'
                                : 'All payments are processed through Omise Payment Gateway, a trusted payment service provider with international security standards. The AJ Explorer does not have access to your full payment details.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 4: Data Sharing and Disclosure */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                    <Eye className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            4. {isThai ? 'การแชร์และเปิดเผยข้อมูล' : 'Data Sharing and Disclosure'}
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            {isThai 
                                ? 'เราอาจแชร์ข้อมูลของคุณเฉพาะเมื่อจำเป็นเท่านั้น รวมถึงกับ:'
                                : 'We may share your information only when necessary, including with:'
                            }
                        </p>
                        <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ผู้ให้บริการกิจกรรมหรือพันธมิตรที่เกี่ยวข้องในการดำเนินการจองของคุณ' : 'Activity providers or partners involved in fulfilling your booking'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ผู้ให้บริการชำระเงิน' : 'Payment service providers'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'หน่วยงานทางกฎหมายหรือกฎระเบียบ เมื่อกฎหมายกำหนด' : 'Legal or regulatory authorities, when required by law'}</span>
                            </li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            {isThai 
                                ? 'เราไม่ขาย เช่าหรือแลกเปลี่ยนข้อมูลส่วนบุคคลของคุณเพื่อวัตถุประสงค์ทางการตลาดโดยไม่ได้รับความยินยอมจากคุณ'
                                : 'We do not sell, rent, or trade your personal information for marketing purposes without your consent.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 5: Cookies */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                    <Cookie className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            5. {isThai ? 'คุกกี้' : 'Cookies'}
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            {isThai ? 'เราใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อ:' : 'We use cookies and similar technologies to:'}
                        </p>
                        <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'จดจำการตั้งค่าของคุณ' : 'Remember your preferences'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'วิเคราะห์การใช้งานและประสิทธิภาพของเว็บไซต์' : 'Analyze website usage and performance'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ปรับปรุงประสบการณ์การท่องเว็บของคุณ' : 'Enhance your browsing experience'}</span>
                            </li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            {isThai 
                                ? 'คุณสามารถเลือกปิดการใช้งานคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ อย่างไรก็ตาม คุณสมบัติบางอย่างของเว็บไซต์อาจไม่ทำงานอย่างถูกต้อง'
                                : 'You can choose to disable cookies through your browser settings; however, some features of the website may not function properly.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 6: Data Security */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            6. {isThai ? 'ความปลอดภัยของข้อมูล' : 'Data Security'}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {isThai 
                                ? 'The AJ Explorer ดำเนินการมาตรการทางเทคนิคและองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต การสูญหาย การใช้ในทางที่ผิด หรือการเปิดเผย'
                                : 'The AJ Explorer implements appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, misuse, or disclosure.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 7: Your Rights */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                    <FileText className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            7. {isThai ? 'สิทธิของคุณ' : 'Your Rights'}
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            {isThai 
                                ? 'ขึ้นอยู่กับกฎหมายที่ใช้บังคับ คุณอาจมีสิทธิ์ในการ:'
                                : 'Depending on applicable laws, you may have the right to:'
                            }
                        </p>
                        <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'เข้าถึงข้อมูลส่วนบุคคลของคุณ' : 'Access your personal data'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ขอแก้ไขหรืออัปเดตข้อมูลของคุณ' : 'Request correction or updates to your information'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{isThai ? 'ขอการลบหรือจำกัดการใช้ข้อมูล' : 'Request deletion or restriction of data use'}</span>
                            </li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            {isThai 
                                ? 'คุณสามารถติดต่อเราผ่านช่องทางที่ระบุไว้บนเว็บไซต์ของเราเพื่อใช้สิทธิ์เหล่านี้'
                                : 'You may contact us through the channels listed on our website to exercise these rights.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 8: Changes to This Policy */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            8. {isThai ? 'การเปลี่ยนแปลงนโยบายนี้' : 'Changes to This Policy'}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {isThai 
                                ? 'The AJ Explorer ขอสงวนสิทธิ์ในการอัปเดตนโยบายความเป็นส่วนตัวนี้ได้ตลอดเวลา การเปลี่ยนแปลงใดๆ จะมีผลทันทีเมื่อโพสต์บนเว็บไซต์'
                                : 'The AJ Explorer reserves the right to update this Privacy Policy at any time. Any changes will become effective immediately upon posting on the website.'
                            }
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 9: Contact Us */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                        9. {isThai ? 'ติดต่อเรา' : 'Contact Us'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'หากคุณมีคำถามหรือข้อกังวลเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ กรุณาติดต่อเราผ่านข้อมูลที่ให้ไว้บน theajexplorer.com'
                            : 'If you have any questions or concerns regarding this Privacy Policy, please contact us via the information provided on theajexplorer.com.'
                        }
                    </p>
                </div>
            </section>
        </div>
    )
}

