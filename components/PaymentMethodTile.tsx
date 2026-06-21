// PaymentMethodTile.tsx
// A selectable payment-method tile.
// Props:
//   maskedNumber – last 4 digits shown, e.g. "8304"
//   methodType   – "card" | "momo"  controls which brand badge renders
//   editLabel    – text for the edit action (default "Edit")
//   selected     – whether this tile is currently chosen
//   onSelect     – callback fired when the tile is clicked

import Image from "next/image";
import React from "react";

// ── Inline brand badges ──────────────────────────────────────────────────────
const MomoBadge: React.FC = () => (
  <div className="flex items-center justify-center rounded px-2 py-0.5 bg-[#f5a623]">
    <svg
      width="34"
      height="12"
      viewBox="0 0 34 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mobile Money"
    >
      <text
        x="0"
        y="11"
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        fontSize="10"
        fill="#ffffff"
      >
        MoMo
      </text>
    </svg>
  </div>
);

// ── Component ────────────────────────────────────────────────────────────────

export type PaymentMethodType = "card" | "momo";

interface PaymentMethodTileProps {
  maskedNumber: string;
  methodType: PaymentMethodType;
  editLabel?: string;
  selected?: boolean;
  onSelect?: () => void;
}

export const PaymentMethodTile: React.FC<PaymentMethodTileProps> = ({
  maskedNumber,
  methodType,
  editLabel = "Edit",
  selected = false,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        "flex items-center gap-3 rounded-2xl border bg-white px-4 h-12 w-full cursor-pointer transition-all text-left py-4",
        selected
          ? "border-gray-900 shadow-[0_0_0_1px_#111827]"
          : "border-[#EAECF0] hover:border-gray-300",
      ].join(" ")}
    >
      {/* Radio indicator */}
      <span
        className={[
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 bg-white",
          selected ? "border-gray-900" : "border-gray-300",
        ].join(" ")}
      >
        {selected && (
          <span className="size-1.75 rounded-full bg-gray-900" />
        )}
      </span>

      {/* Card info */}
      <span className="flex flex-1 flex-col gap-0.5 min-w-0">
        <span className="text-sm font-semibold tracking-wider text-gray-900 dmSans-font">
          •••• {maskedNumber}
        </span>
        <span className="text-[11px] text-gray-400 dmSans-font">{editLabel}</span>
      </span>

      {/* Brand badge */}
      {methodType === "card" ?
        <Image
          src='svgs/visa.svg'
          width={48}
          height={53.3}
          alt='visa'
        />
        :
        <MomoBadge />}
    </button>
  );
};

export default PaymentMethodTile;
