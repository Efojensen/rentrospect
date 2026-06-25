// DepositAmountDialog.tsx
// Screen 1 — enter a deposit amount using quick-select chips or the custom numpad.
//
// Props:
//   open          – controls visibility
//   activeBalance – displayed balance string, e.g. "₵5,580"
//   quickAmounts  – array of quick-select strings (default: ["GH¢ 100.00","GH¢ 500.00","GH¢ 1000.00"])
//   onClose       – fired when ✕ is pressed
//   onBack        – fired when ‹ is pressed
//   onNext        – fired with the entered amount string when → / confirm is pressed

import { Numpad } from "@/components/Numpad";
import { useState, useCallback } from "react";

interface DepositAmountDialogProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  onBack?: () => void;
  activeBalance?: string;
  quickAmounts?: string[];
  onNext: (amount: string) => void;
}

const DEFAULT_QUICK = ["GH¢ 100.00", "GH¢ 500.00", "GH¢ 1000.00"];

export const DepositAmountDialog: React.FC<DepositAmountDialogProps> = ({
  open,
  onBack,
  title,
  onNext,
  onClose,
  activeBalance = "₵0.00",
  quickAmounts = DEFAULT_QUICK,
}) => {
  const [raw, setRaw] = useState("0");

  const handleKey = useCallback((key: string) => {
    if (key === "enter") {
      onNext(raw); return;
    }
    setRaw((prev) => {
      if (key === "backspace") return prev.length > 1 ? prev.slice(0, -1) : "0";
      if (prev === "0" && key !== ".") return key;
      return prev + key;
    });
  }, [raw, onNext]);

  const handleQuick = (label: string) => {
    // Strip non-numeric except dot
    const num = label.replace(/[^0-9.]/g, "");
    setRaw(num || "0");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="relative flex w-full max-w-sm flex-col gap-5 rounded-3xl bg-gray-50 px-6 pb-6 pt-5 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between">
          <button type="button" onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-gray-500 hover:text-gray-800 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-900 dmSans-font">{title ?? 'Deposit'}</span>
          <button type="button" onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-gray-400 hover:text-gray-700 transition-colors text-base leading-none">
            ✕
          </button>
        </div>

        {/* Amount display */}
        <div className="flex flex-col items-center gap-1 py-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900 tracking-tight dmSans-font">
              ₵{raw}
            </span>
            <span className="text-sm font-semibold text-gray-400 dmSans-font">GHS</span>
          </div>

          {/* Balance row */}
          <div className="flex items-center gap-6 mt-1">
            <span className="text-xs text-gray-400 dmSans-font">Active Balance</span>
            <span className="text-xs font-semibold text-gray-500 dmSans-font">{activeBalance}</span>
          </div>
        </div>

        {/* Quick-select chips */}
        <div className="flex gap-2">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleQuick(amt)}
              className="flex-1 rounded-2xl border border-[#EAECF0] bg-white py-2.5 text-xs font-semibold text-gray-700 hover:border-gray-400 transition-colors shadow-sm dmSans-font"
            >
              {amt}
            </button>
          ))}
        </div>

        {/* Numpad */}
        <Numpad onKey={handleKey} />
      </div>
    </div>
  );
};

export default DepositAmountDialog;
