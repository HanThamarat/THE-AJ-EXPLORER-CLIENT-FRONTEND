"use client"

import { useLocale } from "next-intl"

export default function TermsCondition() {
    const locale = useLocale()
    const isThai = locale === 'th'

    return (
        <div className="w-full space-y-8">
            {/* Terms & Conditions Section */}
            <div className="space-y-8">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {isThai ? 'ข้อกำหนดและเงื่อนไข' : 'Terms & Conditions'}
                    </h1>
                    <p className="text-gray-600 mb-2">The AJ Explorer</p>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'กรุณาอ่านข้อกำหนดและเงื่อนไขเหล่านี้อย่างละเอียดก่อนใช้เว็บไซต์ของเราหรือทำการจอง โดยการเข้าถึงหรือใช้ The AJ Explorer คุณยอมรับที่จะผูกพันกับข้อกำหนดเหล่านี้'
                            : 'Please read these Terms & Conditions carefully before using our website or making a booking. By accessing or using The AJ Explorer, you agree to be bound by these terms.'
                        }
                    </p>
                </div>

                {/* Section 1: Services */}
                <section className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        1. {isThai ? 'บริการ' : 'Services'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'The AJ Explorer เป็นแพลตฟอร์มออนไลน์ที่ช่วยให้ผู้ใช้ค้นพบและจองกิจกรรมการท่องเที่ยว การเดินทาง และประสบการณ์ต่างๆ เราเป็นตัวกลางระหว่างผู้ใช้และผู้ให้บริการกิจกรรม'
                            : 'The AJ Explorer is an online platform that allows users to discover and book travel activities, trips, and experiences. We act as an intermediary between users and activity providers.'
                        }
                    </p>
                </section>

                {/* Section 2: Booking */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        2. {isThai ? 'การจอง' : 'Booking'}
                    </h2>
                    <ul className="space-y-2 text-gray-700 ml-4">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'ผู้ใช้ต้องให้ข้อมูลที่ถูกต้อง ครบถ้วน และเป็นปัจจุบันเมื่อทำการจอง'
                                    : 'Users must provide accurate, complete, and up-to-date information when making a booking.'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'การจองจะได้รับการยืนยันเฉพาะหลังจากชำระเงินเต็มจำนวนสำเร็จแล้วเท่านั้น'
                                    : 'A booking is confirmed only after full payment has been successfully completed.'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'The AJ Explorer ขอสงวนสิทธิ์ในการปฏิเสธหรือยกเลิกการจองที่มีข้อมูลไม่ถูกต้องหรือละเมิดข้อกำหนดเหล่านี้'
                                    : 'The AJ Explorer reserves the right to refuse or cancel bookings that contain incorrect information or violate these terms.'
                                }
                            </span>
                        </li>
                    </ul>
                </section>

                {/* Section 3: Pricing & Activity Information */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        3. {isThai ? 'ราคาและข้อมูลกิจกรรม' : 'Pricing & Activity Information'}
                    </h2>
                    <ul className="space-y-2 text-gray-700 ml-4">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'ราคาที่แสดงบนเว็บไซต์เป็นราคาต่อกิจกรรม เว้นแต่จะระบุไว้เป็นอย่างอื่น'
                                    : 'Prices shown on the website are per activity unless otherwise stated.'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'รายละเอียดกิจกรรม ตารางเวลา และความพร้อมใช้งานอาจเปลี่ยนแปลงขึ้นอยู่กับสถานการณ์'
                                    : 'Activity details, schedules, and availability may change depending on circumstances.'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'แม้ว่าเราจะพยายามให้ข้อมูลถูกต้อง แต่ The AJ Explorer ไม่รับประกันว่าข้อมูลทั้งหมดจะปราศจากข้อผิดพลาด'
                                    : 'While we strive for accuracy, The AJ Explorer does not guarantee that all information is free from errors.'
                                }
                            </span>
                        </li>
                    </ul>
                </section>

                {/* Section 4: Payment */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        4. {isThai ? 'การชำระเงิน' : 'Payment'}
                    </h2>
                    <ul className="space-y-2 text-gray-700 ml-4">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'การจองทั้งหมดต้องชำระเงินเต็มจำนวนล่วงหน้า'
                                    : 'All bookings require full payment in advance.'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'การชำระเงินจะถูกประมวลผลอย่างปลอดภัยผ่าน Omise Payment Gateway'
                                    : 'Payments are processed securely through Omise Payment Gateway.'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'วิธีการชำระเงินที่รองรับ ได้แก่ บัตรเครดิต/เดบิต PromptPay และ Mobile Banking (ขึ้นอยู่กับความพร้อมใช้งาน)'
                                    : 'Supported payment methods include credit/debit cards, PromptPay, and Mobile Banking (subject to availability).'
                                }
                            </span>
                        </li>
                    </ul>
                </section>

                {/* Section 5: Cancellation & Refund */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        5. {isThai ? 'การยกเลิกและการคืนเงิน' : 'Cancellation & Refund'}
                    </h2>
                    <ul className="space-y-2 text-gray-700 ml-4">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'การยกเลิกและการคืนเงินเป็นไปตามนโยบายการยกเลิกและการคืนเงินของเรา ตามที่ระบุไว้บนเว็บไซต์'
                                    : 'Cancellations and refunds are subject to our Cancellation & Refund Policy, as stated on the website.'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'The AJ Explorer ขอสงวนสิทธิ์ในการประเมินคำขอแต่ละรายการตามนโยบายที่ใช้บังคับ'
                                    : 'The AJ Explorer reserves the right to evaluate each request according to the applicable policy.'
                                }
                            </span>
                        </li>
                    </ul>
                </section>

                {/* Section 6: User Responsibilities */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        6. {isThai ? 'ความรับผิดชอบของผู้ใช้' : 'User Responsibilities'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        {isThai 
                            ? 'โดยการใช้บริการของเรา คุณยอมรับที่จะ:'
                            : 'By using our services, you agree to:'
                        }
                    </p>
                    <ul className="space-y-2 text-gray-700 ml-4">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'ปฏิบัติตามกฎ คำแนะนำ และแนวทางความปลอดภัยทั้งหมดที่ให้ไว้โดยผู้ดำเนินการกิจกรรม'
                                    : 'Follow all rules, instructions, and safety guidelines provided by activity operators'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'รับผิดชอบต่อความปลอดภัยของตนเองและทรัพย์สินส่วนตัว'
                                    : 'Take responsibility for your own safety and personal belongings'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'มั่นใจว่าคุณมีความพร้อมทางร่างกายและจิตใจในการเข้าร่วมกิจกรรมที่จองไว้'
                                    : 'Ensure you are physically and mentally fit to participate in booked activities'
                                }
                            </span>
                        </li>
                    </ul>
                </section>

                {/* Section 7: Limitation of Liability */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        7. {isThai ? 'ข้อจำกัดความรับผิดชอบ' : 'Limitation of Liability'}
                    </h2>
                    <ul className="space-y-2 text-gray-700 ml-4">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'การเข้าร่วมกิจกรรมเป็นความเสี่ยงของคุณเอง'
                                    : 'Participation in activities is at your own risk.'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'The AJ Explorer จะไม่รับผิดชอบต่อการบาดเจ็บ การสูญเสีย ความเสียหาย ความล่าช้า หรือความไม่สะดวกใดๆ ที่เกิดจากการเข้าร่วมกิจกรรม เว้นแต่กฎหมายกำหนด'
                                    : 'The AJ Explorer shall not be liable for any injury, loss, damage, delay, or inconvenience arising from participation in activities, except where required by law.'
                                }
                            </span>
                        </li>
                    </ul>
                </section>

                {/* Section 8: Force Majeure */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        8. {isThai ? 'เหตุสุดวิสัย' : 'Force Majeure'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'The AJ Explorer ไม่รับผิดชอบต่อการหยุดชะงักของบริการหรือการยกเลิกที่เกิดจากเหตุการณ์ที่อยู่นอกเหนือการควบคุมของเรา รวมถึงแต่ไม่จำกัดเพียง ภัยธรรมชาติ สภาพอากาศรุนแรง การนัดหยุดงาน หรือการกระทำของรัฐบาล'
                            : 'The AJ Explorer is not responsible for service disruption or cancellation caused by events beyond our control, including but not limited to natural disasters, severe weather, strikes, or government actions.'
                        }
                    </p>
                </section>

                {/* Section 9: Intellectual Property */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        9. {isThai ? 'ทรัพย์สินทางปัญญา' : 'Intellectual Property'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'เนื้อหาทั้งหมดบนเว็บไซต์นี้ รวมถึงข้อความ รูปภาพ โลโก้ และเครื่องหมายการค้า เป็นทรัพย์สินของ The AJ Explorer หรือพันธมิตร และไม่สามารถใช้ได้โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร'
                            : 'All content on this website, including text, images, logos, and trademarks, is the property of The AJ Explorer or its partners and may not be used without written permission.'
                        }
                    </p>
                </section>

                {/* Section 10: Changes to Terms */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        10. {isThai ? 'การเปลี่ยนแปลงข้อกำหนด' : 'Changes to Terms'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'The AJ Explorer ขอสงวนสิทธิ์ในการแก้ไขข้อกำหนดและเงื่อนไขเหล่านี้ได้ตลอดเวลา การอัปเดตจะมีผลทันทีเมื่อเผยแพร่บนเว็บไซต์'
                            : 'The AJ Explorer reserves the right to modify these Terms & Conditions at any time. Updates take effect immediately upon publication on the website.'
                        }
                    </p>
                </section>

                {/* Section 11: Governing Law */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        11. {isThai ? 'กฎหมายที่ใช้บังคับ' : 'Governing Law'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'ข้อกำหนดและเงื่อนไขเหล่านี้อยู่ภายใต้กฎหมายของประเทศไทย'
                            : 'These Terms & Conditions are governed by the laws of Thailand.'
                        }
                    </p>
                </section>

                {/* Section 12: Contact Us */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                            12. {isThai ? 'ติดต่อเรา' : 'Contact Us'}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {isThai 
                                ? 'สำหรับคำถามเกี่ยวกับข้อกำหนดและเงื่อนไขเหล่านี้ กรุณาติดต่อเราผ่าน theajexplorer.com'
                                : 'For questions regarding these Terms & Conditions, please contact us via theajexplorer.com.'
                            }
                        </p>
                    </div>
                </section>
            </div>

            {/* Cookie Policy Section */}
            <div className="space-y-8 pt-8 border-t-2 border-gray-300">
                {/* Cookie Policy Header */}
                <div className="border-b border-gray-200 pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {isThai ? 'นโยบายคุกกี้' : 'Cookie Policy'}
                    </h1>
                    <p className="text-gray-600 mb-2">The AJ Explorer</p>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'นโยบายคุกกี้นี้อธิบายวิธีการที่ The AJ Explorer ใช้คุกกี้และเทคโนโลยีที่คล้ายกันบนเว็บไซต์ของเรา'
                            : 'This Cookie Policy explains how The AJ Explorer uses cookies and similar technologies on our website.'
                        }
                    </p>
                </div>

                {/* What Are Cookies */}
                <section className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        {isThai ? 'คุกกี้คืออะไร?' : 'What Are Cookies?'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'คุกกี้คือไฟล์ข้อความขนาดเล็กที่เก็บไว้บนอุปกรณ์ของคุณเมื่อคุณเยี่ยมชมเว็บไซต์ ช่วยปรับปรุงการทำงานของเว็บไซต์และประสบการณ์ผู้ใช้'
                            : 'Cookies are small text files stored on your device when you visit a website. They help improve website functionality and user experience.'
                        }
                    </p>
                </section>

                {/* How We Use Cookies */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        {isThai ? 'วิธีที่เราใช้คุกกี้' : 'How We Use Cookies'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        {isThai ? 'เราใช้คุกกี้เพื่อ:' : 'We use cookies to:'}
                    </p>
                    <ul className="space-y-2 text-gray-700 ml-4">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'จดจำการตั้งค่าและความชอบของคุณ'
                                    : 'Remember your preferences and settings'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'วิเคราะห์การเข้าชมเว็บไซต์และประสิทธิภาพ'
                                    : 'Analyze website traffic and performance'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                {isThai 
                                    ? 'ปรับปรุงเนื้อหาและประสบการณ์ผู้ใช้'
                                    : 'Improve content and user experience'
                                }
                            </span>
                        </li>
                    </ul>
                </section>

                {/* Types of Cookies */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        {isThai ? 'ประเภทของคุกกี้ที่เราใช้' : 'Types of Cookies We Use'}
                    </h2>
                    <ul className="space-y-2 text-gray-700 ml-4">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                <strong>{isThai ? 'คุกกี้ที่จำเป็น' : 'Essential Cookies'}</strong> – {isThai 
                                    ? 'จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์'
                                    : 'Required for basic website functionality'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                <strong>{isThai ? 'คุกกี้วิเคราะห์' : 'Analytics Cookies'}</strong> – {isThai 
                                    ? 'ช่วยให้เราเข้าใจว่าผู้เยี่ยมชมใช้เว็บไซต์ของเราอย่างไร'
                                    : 'Help us understand how visitors use our website'
                                }
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>
                                <strong>{isThai ? 'คุกกี้การตั้งค่า' : 'Preference Cookies'}</strong> – {isThai 
                                    ? 'จดจำการตั้งค่าและตัวเลือกของผู้ใช้'
                                    : 'Remember user settings and choices'
                                }
                            </span>
                        </li>
                    </ul>
                </section>

                {/* Managing Cookies */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        {isThai ? 'การจัดการคุกกี้' : 'Managing Cookies'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'คุณสามารถควบคุมหรือปิดการใช้งานคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ โปรดทราบว่าการปิดการใช้งานคุกกี้อาจส่งผลต่อคุณสมบัติบางอย่างของเว็บไซต์'
                            : 'You can control or disable cookies through your browser settings. Please note that disabling cookies may affect certain features of the website.'
                        }
                    </p>
                </section>

                {/* Updates to Cookie Policy */}
                <section className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        {isThai ? 'การอัปเดตนโยบายนี้' : 'Updates to This Policy'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {isThai 
                            ? 'เราอาจอัปเดตนโยบายคุกกี้นี้เป็นครั้งคราว การเปลี่ยนแปลงใดๆ จะถูกโพสต์บนหน้านี้'
                            : 'We may update this Cookie Policy from time to time. Any changes will be posted on this page.'
                        }
                    </p>
                </section>
            </div>
        </div>
    )
}

