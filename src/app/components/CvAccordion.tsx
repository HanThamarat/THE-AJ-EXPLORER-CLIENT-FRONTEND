import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export interface CvAccordionOptionProps {
    title?: any;
    children?: any;
}

export interface CvAccordionProps {
    accordionOptions: CvAccordionOptionProps[]
}

export default function CvAccordion({
    accordionOptions
}: CvAccordionProps) {

    const [activeIndex, setactiveIndex] = useState<number>(0);

    return(
       <div className="w-full grid grid-cols-1 gap-[5px]">
        {
            accordionOptions.map((item, key) => (
                <div key={key} className="w-full border border-gray-300 rounded-[10px] py-[10px] cursor-pointer duration-100 ease-in" onClick={() => setactiveIndex(key)}>
                    <div className="w-full px-[10px] flex justify-between items-center">
                        {item.title}
                        <div>
                            {
                                activeIndex === key ? <IoIosArrowUp className="text-[24px]" /> : <IoIosArrowDown className="text-[24px]" />
                            }
                        </div>
                        
                    </div>
                    {
                        activeIndex === key && <div className="w-full mt-[10px] border-t border-gray-300 pt-[10px] px-[10px]">
                            {item.children}
                        </div>
                    }
                </div>
            )) 
        }
       </div>
    )
}