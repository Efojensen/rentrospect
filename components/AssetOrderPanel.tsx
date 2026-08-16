"use client";

import { useState, useTransition } from "react";
import { placeOrder } from "@/app/orderActions";
import BottomSheet from "@/components/BottomSheet";
import QuantityStepper from "@/components/QuantityStepper";

interface AssetOrderPanelProps {
    assetId: string;
    rate?: number;
    pricingUnit?: string;
    vendor?: string;
    name?: string;
    about?: string;
    category?: string;
    description?: string;
    ownerSrc: string;
    rating: number;
    reviews: number;
}

export default function AssetOrderPanel({
    assetId,
    rate,
    pricingUnit,
    vendor,
    name,
    about,
    category,
    description,
    ownerSrc,
    rating,
    reviews,
}: AssetOrderPanelProps) {
    const [quantity, setQuantity] = useState(1);
    const [placed, setPlaced] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handlePlaceOrder = () => {
        setPlaced(false);
        startTransition(async () => {
            await placeOrder(assetId, quantity);
            setPlaced(true);
        });
    };

    return (
        <>
            {/* Desktop price + stepper row */}
            <div className="hidden md:flex justify-between">
                <p className="text-[28px] font-bold dmSans-font text-[#1A202C]">
                    ₵{rate}/<span className="text-[16px] text-gray-600">{pricingUnit}</span>
                </p>
                <QuantityStepper initialValue={1} min={1} onChange={setQuantity} />
            </div>

            <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isPending}
                className="mt-8 bg-black rounded-xl md:rounded-2xl px-6 py-3 w-full text-sm md:text-[16px] font-semibold text-white dmSans-font shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? "Placing order..." : "Place order"}
            </button>

            {placed && (
                <p className="mt-2 text-sm text-green-600">
                    Order placed for {quantity} {quantity === 1 ? "item" : "items"}.
                </p>
            )}

            <BottomSheet
                price={rate}
                pricingUnit={pricingUnit}
                owner={vendor}
                rating={rating}
                name={name!}
                reviews={reviews}
                quantity={quantity}
                about={about}
                category={category}
                ownerSrc={ownerSrc}
                description={description}
                onQuantityChange={setQuantity}
                onPlaceOrder={handlePlaceOrder}
                isPending={isPending}
                placed={placed}
                assetSrc={""}
                progress={0}
            />
        </>
    );
}
