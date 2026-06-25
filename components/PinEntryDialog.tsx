// PinEntryDialog.tsx
// Screen 4 — 4-digit PIN entry with the same numpad, a confirm button, and Cancel.
//
// Props:
//   open        – controls visibility
//   pinLength   – number of PIN digits (default 4)
//   label       – button label (default "Deposit")
//   subLabel    – small text under confirm button (default "Secured by ...")
//   onConfirm   – called with the PIN string when confirm is tapped
//   onCancel    – called when Cancel is tapped
//   onBack      – ‹ button
//   onClose     – ✕ button

import { Numpad } from "@/components/Numpad";
import { useState, useCallback } from "react";

interface PinEntryDialogProps {
  open: boolean;
  pinLength?: number;
  label?: string;
  subLabel?: string;
  onConfirm: (pin: string) => void;
  onCancel?: () => void;
  onBack?: () => void;
  onClose?: () => void;
}

export const PinEntryDialog: React.FC<PinEntryDialogProps> = ({
  open,
  pinLength = 4,
  label = "Deposit",
  subLabel = "Secured by paystack #4389",
  onConfirm,
  onCancel,
  onBack,
  onClose,
}) => {
  const [pin, setPin] = useState("");

  const handleKey = useCallback((key: string) => {
    if (key === "backspace") {
      setPin((p) => p.slice(0, -1));
      return;
    }
    if (key === "enter") {
      if (pin.length === pinLength) onConfirm(pin);
      return;
    }
    // Only digits
    if (!/^\d$/.test(key)) return;
    setPin((p) => (p.length < pinLength ? p + key : p));
  }, [pin, pinLength, onConfirm]);

  const handleConfirm = () => {
    if (pin.length === pinLength) onConfirm(pin);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="relative flex w-full max-w-sm flex-col gap-5 rounded-3xl bg-gray-50 px-6 pb-6 pt-5 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between">
          <button type="button" onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-gray-500 hover:text-gray-800 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-900 dmSans-font">Input PIN</span>
          <button type="button" onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-gray-400 hover:text-gray-700 transition-colors text-base leading-none">
            ✕
          </button>
        </div>

        {/* PIN dots */}
        <div className="flex items-center justify-center gap-4 py-2">
          {Array.from({ length: pinLength }).map((_, i) => (
            <div
              key={i}
              className={[
                "flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-2xl font-bold dmSans-font transition-colors",
                i < pin.length
                  ? "border-teal-400 bg-white text-gray-900"
                  : "border-gray-200 bg-white text-gray-300",
              ].join(" ")}
            >
              {i < pin.length ? "•" : "0"}
            </div>
          ))}
        </div>

        {/* Confirm button */}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={pin.length < pinLength}
          className={[
            "h-12 w-full rounded-2xl text-sm font-semibold transition-colors dmSans-font",
            pin.length === pinLength
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-teal-100 text-teal-300 cursor-not-allowed",
          ].join(" ")}
        >
          {label}
        </button>

        {/* SubLabel */}
        <p className="text-center text-[11px] text-gray-400 dmSans-font">{subLabel}</p>

        {/* Cancel */}
        <button
          type="button"
          onClick={onCancel}
          className="text-center text-sm font-semibold text-red-400 hover:text-red-500 transition-colors dmSans-font"
        >
          Cancel
        </button>

        {/* Numpad */}
        <Numpad onKey={handleKey} />
      </div>
    </div>
  );
};

export default PinEntryDialog;
