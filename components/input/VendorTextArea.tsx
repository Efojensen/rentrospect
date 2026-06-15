interface VendorTextAreaFieldProps {
    label: string;
    value: string;
    placeholder?: string;
    rows?: number;
    onChange: (value: string) => void;
}

export default function VendorTextAreaField({
    label,
    value,
    placeholder,
    rows = 5,
    onChange,
}: VendorTextAreaFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold leading-5 tracking-[-0.0088rem] dmSans-font">
                {label}
            </label>

            <textarea
                rows={rows}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-2xl bg-white p-4 outline-none border border-[#EAECF0] resize-none"
            />
        </div>
    );
}