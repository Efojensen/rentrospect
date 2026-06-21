// DiscountCodeInput.tsx
// A controlled input that accepts a discount code and exposes it to the parent.
// Props:
//   label       – field label rendered above the box
//   SvgIcon     – a React SVG component shown as the leading icon
//   value       – controlled value (lift state up in the parent)
//   onChange    – called with the new string whenever the user types
//   onApply     – called with the trimmed code on "Apply" click or Enter key
//   placeholder – optional placeholder text (default "Discount Code")
//   disabled    – disables both the input and the Apply button

import React, { useCallback, KeyboardEvent } from "react";

interface DiscountCodeInputProps {
  label: string;
  SvgIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  value: string;
  onChange: (value: string) => void;
  onApply: (code: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const DiscountCodeInput: React.FC<DiscountCodeInputProps> = ({
  label,
  SvgIcon,
  value,
  onChange,
  onApply,
  placeholder = "Discount Code",
  disabled = false,
}) => {
  const handleApply = useCallback(() => {
    if (!disabled && value.trim()) onApply(value.trim());
  }, [disabled, value, onApply]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleApply();
    },
    [handleApply]
  );

  return (
    <div className="flex flex-col gap-2 mb-4.5 md:mt-6">
      <label
        htmlFor="discount-code-input"
        className="text-[16px] font-bold leading-[26.4px] tracking-[0.08px] dmSans-font text-white"
      >
        {label}
      </label>

      <div className="flex h-12 w-full items-center gap-3 rounded-2xl bg-otherSmallText px-4 focus-within:border-gray-400 transition-colors">
        <SvgIcon className="size-4.5 shrink-0 text-gray-400" aria-hidden="true" />

        <input
          id="discount-code-input"
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dmSans-font"
        />

        <button
          type="button"
          onClick={handleApply}
          disabled={disabled || !value.trim()}
          aria-label="Apply discount code"
          className="shrink-0 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300 dmSans-font"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DiscountCodeInput;
