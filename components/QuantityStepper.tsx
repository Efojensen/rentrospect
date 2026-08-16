"use client";

import { useState } from "react";

interface QuantityStepperProps {
  min?: number;
  max?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}

export default function QuantityStepper({
  min = 1,
  max = 5,
  onChange,
  initialValue = 1,
}: QuantityStepperProps) {
  const [count, setCount] = useState(initialValue);

  const updateCount = (next: number) => {
    setCount(next);
    onChange?.(next);
  };

  const handleDecrement = () => {
    if (count > min) {
      updateCount(count - 1);
    }
  };

  const handleIncrement = () => {
    updateCount(count + 1);
  };

  return (
    <div className=" inline-flex items-center gap-3 rounded-full bg-transparent px-2 py-1.5 shadow-sm">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={count <= min}
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <span className="text-base leading-none">−</span>
      </button>

      <span className="min-w-[1ch] text-center text-base font-medium text-gray-900">
        {count}
      </span>

      <button
        type="button"
        disabled={count >= max}
        onClick={handleIncrement}
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <span className="text-base leading-none">+</span>
      </button>
    </div>
  );
}
