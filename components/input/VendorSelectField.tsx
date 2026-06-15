import Image from 'next/image'

export interface Option {
    label: string;
    value: string;
}

interface VendorSelectFieldProps {
    label: string;
    value: string;
    options: Option[];
    placeholder?: string;
    onChange: (value: string) => void;
}

export default function VendorSelectField({
    label,
    value,
    options,
    placeholder = "Select an option",
    onChange,
}: VendorSelectFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold leading-5 tracking-[-0.0088rem] dmSans-font">
                {label}
            </label>

            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="
                        appearance-none
                        h-12.5
                        w-full
                        rounded-2xl
                        px-4
                        pr-12
                        outline-none
                        border
                        border-[#F3F4F6]
                        bg-white
                        dmSans-font
                    "
                >
                    <option value="">{placeholder}</option>

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <Image
                    width={18}
                    height={18}
                    src='/svgs/chevron-down.svg'
                    alt='chevron-down'
                    className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-[#3E4E50]
                    "
                />
            </div>
        </div>
    );
}