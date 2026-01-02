"use client"

import { useLocale } from "next-intl"

export default function AboutUs() {
    const locale = useLocale()
    const isThai = locale === 'th'

    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {isThai ? 'เกี่ยวกับเรา' : 'About Us'}
                </h1>
                <p className="text-gray-600 mb-4">The AJ Explorer</p>
                <p className="text-gray-700 leading-relaxed text-lg">
                    {isThai 
                        ? 'ที่ The AJ Explorer เราเชื่อว่าการเดินทางไม่ใช่แค่การไปเยือนสถานที่ต่างๆ แต่เป็นการค้นพบประสบการณ์ วัฒนธรรม และเรื่องราวที่จะติดตัวคุณไปนานหลังจากที่การเดินทางจบลง'
                        : 'At The AJ Explorer, we believe that travel is more than just visiting places — it\'s about discovering experiences, cultures, and stories that stay with you long after the journey ends.'
                    }
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                    {isThai 
                        ? 'เราเป็นแพลตฟอร์มประสบการณ์การเดินทางที่ออกแบบมาเพื่อช่วยให้นักสำรวจค้นพบ จอง และเพลิดเพลินกับกิจกรรมการเดินทางและประสบการณ์ท้องถิ่นที่คัดสรรมาอย่างดี ตั้งแต่การผจญภัยในธรรมชาติไปจนถึงการหลบหนีทางวัฒนธรรม ทุกประสบการณ์บน The AJ Explorer ถูกคัดสรรอย่างระมัดระวังเพื่อให้แน่ใจในคุณภาพ ความปลอดภัย และความทรงจำที่ยากจะลืมเลือน'
                        : 'We are a travel experiences platform designed to help explorers easily discover, book, and enjoy handpicked trip activities and local experiences. From nature adventures to cultural escapes, every experience on The AJ Explorer is carefully curated to ensure quality, safety, and unforgettable memories.'
                    }
                </p>
            </div>

            {/* Our Mission */}
            <section className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {isThai ? 'พันธกิจของเรา' : 'Our Mission'}
                </h2>
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <p className="text-gray-700 leading-relaxed mb-3 font-medium">
                        {isThai 
                            ? 'พันธกิจของเรานั้นเรียบง่าย:'
                            : 'Our mission is simple:'
                        }
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        {isThai 
                            ? 'เพื่อทำให้ประสบการณ์การเดินทางที่มีความหมายเข้าถึงได้ ราบรื่น และสร้างแรงบันดาลใจสำหรับนักสำรวจทุกคน'
                            : 'To make meaningful travel experiences accessible, seamless, and inspiring for every explorer.'
                        }
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        {isThai 
                            ? 'เรามุ่งมั่นที่จะเชื่อมโยงนักเดินทางกับผู้ดำเนินการท้องถิ่นที่เชื่อถือได้และกิจกรรมที่เป็นเอกลักษณ์ ในขณะเดียวกันก็ให้ประสบการณ์การจองที่ราบรื่นและปลอดภัย เพื่อให้คุณสามารถมุ่งเน้นไปที่สิ่งที่สำคัญที่สุด: การเดินทาง'
                            : 'We aim to connect travelers with trusted local operators and unique activities, while providing a smooth and secure booking experience — so you can focus on what matters most: the journey.'
                        }
                    </p>
                </div>
            </section>

            {/* What We Do */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {isThai ? 'สิ่งที่เราทำ' : 'What We Do'}
                </h2>
                <ul className="space-y-3 text-gray-700 ml-4">
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>
                            {isThai 
                                ? 'คัดสรรกิจกรรมการเดินทางและประสบการณ์คุณภาพสูง'
                                : 'Curate high-quality trip activities and experiences'
                            }
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>
                            {isThai 
                                ? 'ร่วมมือกับผู้ดำเนินการท้องถิ่นและมัคคุเทศก์ที่เชื่อถือได้'
                                : 'Partner with trusted local operators and guides'
                            }
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>
                            {isThai 
                                ? 'ให้แพลตฟอร์มการจองที่ปลอดภัยและใช้งานง่าย'
                                : 'Provide a secure and easy-to-use booking platform'
                            }
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>
                            {isThai 
                                ? 'รองรับวิธีการชำระเงินหลายวิธีเพื่อความสะดวก'
                                : 'Support multiple payment methods for convenience'
                            }
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>
                            {isThai 
                                ? 'มุ่งเน้นความปลอดภัย ความโปร่งใส และประสบการณ์ที่ดีเยี่ยม'
                                : 'Focus on safety, transparency, and great experiences'
                            }
                        </span>
                    </li>
                </ul>
            </section>

            {/* Why Travel with The AJ Explorer */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    {isThai ? 'ทำไมต้องเดินทางกับ The AJ Explorer?' : 'Why Travel with The AJ Explorer?'}
                </h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-2xl shrink-0">🌍</span>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {isThai ? 'ประสบการณ์ที่คัดสรรอย่างระมัดระวัง' : 'Carefully Curated Experiences'}
                            </h3>
                            <p className="text-gray-700 text-sm">
                                {isThai 
                                    ? 'ทุกกิจกรรมถูกเลือกด้วยใจถึงคุณภาพและความแท้จริง'
                                    : 'Every activity is selected with quality and authenticity in mind.'
                                }
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <span className="text-2xl shrink-0">🤝</span>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {isThai ? 'พันธมิตรท้องถิ่นที่เชื่อถือได้' : 'Trusted Local Partners'}
                            </h3>
                            <p className="text-gray-700 text-sm">
                                {isThai 
                                    ? 'เราทำงานอย่างใกล้ชิดกับผู้ดำเนินการที่มีประสบการณ์และเชื่อถือได้'
                                    : 'We work closely with experienced and reliable operators.'
                                }
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <span className="text-2xl shrink-0">🔒</span>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {isThai ? 'การชำระเงินที่ปลอดภัย' : 'Secure Payments'}
                            </h3>
                            <p className="text-gray-700 text-sm">
                                {isThai 
                                    ? 'การชำระเงินจะถูกประมวลผลอย่างปลอดภัยผ่านเกตเวย์การชำระเงินที่เชื่อถือได้'
                                    : 'Payments are processed safely through trusted payment gateways.'
                                }
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <span className="text-2xl shrink-0">✨</span>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {isThai ? 'ประสบการณ์ที่เน้นนักสำรวจเป็นหลัก' : 'Explorer-First Experience'}
                            </h3>
                            <p className="text-gray-700 text-sm">
                                {isThai 
                                    ? 'ตั้งแต่การค้นพบไปจนถึงการจอง เราออกแบบทุกอย่างโดยคำนึงถึงนักเดินทาง'
                                    : 'From discovery to booking, we design everything with travelers in mind.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Promise */}
            <section className="space-y-4 pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {isThai ? 'คำมั่นสัญญาของเรา' : 'Our Promise'}
                </h2>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                    <p className="text-gray-700 leading-relaxed mb-4">
                        {isThai 
                            ? 'เรามุ่งมั่นที่จะปรับปรุงแพลตฟอร์มของเราอย่างต่อเนื่องและขยายคอลเลกชันประสบการณ์ของเรา เพื่อให้การเดินทางทุกครั้งที่จองกับ The AJ Explorer รู้สึกง่ายดาย ตื่นเต้น และน่าจดจำ'
                            : 'We are committed to continuously improving our platform and expanding our collection of experiences — so every trip booked with The AJ Explorer feels effortless, exciting, and memorable.'
                        }
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                        {isThai 
                            ? 'ไม่ว่าคุณจะแสวงหาการผจญภัย การพักผ่อน หรืออะไรก็ตามที่อยู่ระหว่างนั้น The AJ Explorer พร้อมช่วยให้คุณสำรวจได้มากขึ้น ลึกขึ้น และดีขึ้น'
                            : 'Whether you\'re seeking adventure, relaxation, or something in between, The AJ Explorer is here to help you explore more, deeper, and better.'
                        }
                    </p>
                </div>
            </section>
        </div>
    )
}

