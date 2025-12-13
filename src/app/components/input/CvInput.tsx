import React from "react";

import type { InputRef } from "antd";

interface CvInputPropType {
  label?: string;
  color?: string;
  placeholder: string;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const CvInput = React.forwardRef<InputRef, CvInputPropType>(
  ({ placeholder, label, color, onChange, value, type, error, ...rest }, ref: any) => {
    return (
        <div className="w-full grid grid-cols-1 gap-[2px]">
          {label && <span className="font-medium text-[12px]">{label}</span>}
          <input
            className="border hover:border-primary bg-white hover:outline-2 hover:outline-[#EAF4FF] h-[40px] rounded-[6px] px-[10px] text-[14px] border-[#d7dade] focus:border-primary focus:outline-2 focus:outline-[#EAF4FF] outline-0 duration-100 ease-in-out"
            type={ type ? type : "text" }
            {...rest} 
            ref={ref}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
           />
           <span className="text-red-500">{ error && error }</span> 
        </div>
    );
  }
);

export default CvInput;
