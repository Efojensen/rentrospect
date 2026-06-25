interface ProcessingDialogProps {
  open: boolean;
  message?: string;
  onCancel?: () => void;
}

export const ProcessingDialog: React.FC<ProcessingDialogProps> = ({
  open,
  message = "Processing transaction...",
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="relative flex w-full max-w-sm flex-col items-center gap-6 rounded-3xl bg-gray-50 px-6 pb-8 pt-5 shadow-2xl">

        {/* Header */}
        <div className="flex w-full items-center justify-between">
          {/* empty left spacer so title stays centred */}
          <div className="h-8 w-8" />
          <span className="text-sm font-semibold text-gray-900 dmSans-font">Deposit</span>
          <div className="h-8 w-8" />
        </div>

        {/* Spinner */}
        <div className="flex flex-col items-center gap-5 py-8">
          <div className="h-20 w-20 rounded-full border-[5px] border-gray-200 border-t-teal-500 animate-spin" />
          <p className="text-sm text-gray-500 dmSans-font">{message}</p>
        </div>

        {/* Cancel button */}
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-gray-200 bg-white px-5 py-2 text-xs font-semibold text-gray-600 hover:border-gray-400 transition-colors shadow-sm dmSans-font"
        >
          › Cancel Payment
        </button>

        {/* Paystack badge */}
        <div className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" className="text-gray-400" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span className="text-xs text-gray-400 dmSans-font">
            Secured by{" "}
            <span className="font-bold text-gray-600">paystack</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingDialog;
