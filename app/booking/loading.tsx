import React from "react";

interface LoadingDialogProps {
  open: boolean;
  message?: string;
}

export const LoadingDialog: React.FC<LoadingDialogProps> = ({
  open,
  message = "Checking Balances",
}) => {
  if (!open) return null;

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">

      {/* Card */}
      <div className="flex flex-col md:h-65 md:w-100 items-center justify-center gap-5 rounded-2xl bg-white px-16 py-12 shadow-xl">

        {/* Spinner */}
        <div className="size-16 rounded-full border-5 border-[#EAECF0] border-t-[#026571] animate-spin mb-8" />

        {/* Label */}
        <p className='text-sm leading-5 text-center inter-font text-[#535862] dmSans-font'>{message}</p>
      </div>
    </div>
  );
};

export default LoadingDialog;
