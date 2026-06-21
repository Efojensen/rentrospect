// RentalAssetCard.tsx
// Displays a single rental asset inside the "Your Order" dark panel.
// Props:
//   src      – URL / path for the product image
//   title    – product name (truncated with ellipsis if too long)
//   price    – price string, e.g. "€180.00"
//   quantity – shown as a white pill badge on the top-right of the image
//   rate     – daily rate string, e.g. "GH¢90/day"

import React from "react";
import Image from "next/image";

interface RentalAssetCardProps {
  src: string;
  title: string;
  price: string;
  quantity: number;
  rate: string;
}

export const RentalAssetCard: React.FC<RentalAssetCardProps> = ({
  src,
  title,
  price,
  quantity,
  rate,
}) => {
  return (
    <div className="w-full flex items-start gap-3 rounded-xl px-[19.08px] md:px-[26.2px] py-3 border-b border-otherSmallText last:border-b-0 bg-[#FFFFFF0A]">

      {/* Image + quantity badge */}
      <div className="relative h-16 w-18 shrink-0 overflow-hidden rounded-xl bg-[#1e2330]">
        <Image
          src={src}
          alt={title}
          fill
          sizes="72px"
          className="object-cover"
        />
        {quantity > 0 && (
          <span
            aria-label={`Quantity: ${quantity}`}
            className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-bold leading-none text-gray-900 shadow-sm"
          >
            {quantity}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className='flex justify-between items-center mb-3'>
          <p className="text-[14px] md:text-[16px] font-bold leading-[26.4px] tracking-[0.08px] text-white dmSans-font">{title}</p>
          <p className="text-[14px] md:text-[16px] font-medium text-white leading-[26.4px] tracking-[0.08px] dmSans-font">{price}</p>
        </div>
        <div className="flex items-center gap-3.75 text-[14px] md:text-[16px] text-bookingQtyTextClr dmSans-font">
          <p>Quantity: <span className='text-white'>{String(quantity).padStart(2, "0")}</span></p>
          <p className='text-[#CDD5E0]'>Daily Rate: <span className='text-white'>{rate}</span></p>
        </div>
      </div>
    </div>
  );
};

export default RentalAssetCard;
