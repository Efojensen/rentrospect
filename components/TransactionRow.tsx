// TransactionRow.tsx
// A single row in the Recent Transactions list.
// Props:
//   avatarSrc  – image URL for the contact/merchant avatar
//   avatarAlt  – accessible alt text
//   name       – merchant or contact name
//   date       – date string e.g. "May 24, 2022"
//   amount     – amount string e.g. "+₵80.59" or "-₵34.75"
//   type       – "credit" | "debit"  controls amount colour

import React from "react";
import Image from "next/image";

interface TransactionRowProps {
  avatarSrc: string;
  avatarAlt: string;
  name: string;
  date: string;
  amount: string;
  type: "credit" | "debit";
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  avatarSrc,
  avatarAlt,
  name,
  date,
  amount,
  type,
}) => {
  return (
    <div className="w-full flex items-center gap-4 py-3.5 border-b border-gray-100 last:border-b-0">
      {/* Avatar */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
        <Image src={avatarSrc} alt={avatarAlt} fill sizes="40px" className="object-cover" />
      </div>

      {/* Name + date */}
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <span className="text-sm font-semibold text-gray-900 truncate dmSans-font">{name}</span>
        <span className="text-xs text-gray-400 dmSans-font">{date}</span>
      </div>

      {/* Amount */}
      <span
        className={[
          "text-sm font-semibold shrink-0 dmSans-font",
          type === "credit" ? "text-teal-500" : "text-orange-400",
        ].join(" ")}
      >
        {amount}
      </span>
    </div>
  );
};

export default TransactionRow;
