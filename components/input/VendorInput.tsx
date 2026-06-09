interface VendorInputFieldProps {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "number";
}

export default function VendorInputField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: VendorInputFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold leading-5 tracking-[-0.0088rem] dmSans-font">
                {label}
            </label>

            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 w-full rounded-2xl bg-white px-4 outline-none border border-[#EAECF0]"
            />
        </div>
    );
}