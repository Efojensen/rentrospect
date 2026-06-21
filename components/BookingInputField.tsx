import React from "react";

interface BookingInputFieldProps {
  type: 'text' | 'number' | 'date';
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  SvgIcon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const BookingInputField: React.FC<BookingInputFieldProps> = ({
  type,
  label,
  value,
  SvgIcon,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="text-sm font-semibold leading-5 tracking-[-0.0088rem] dmSans-font">
        {label}
      </label>

      <div className="flex h-12 w-full items-center gap-3 rounded-2xl border border-[#EAECF0] bg-white px-4">
        <SvgIcon className="size-4.5 shrink-0 text-gray-400" aria-hidden="true"/>
        <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 w-full bg-white px-4 outline-none border-b border-t border-x-0 border-[#EAECF0]"
            />
      </div>
    </div>
  );
};

export default BookingInputField;
