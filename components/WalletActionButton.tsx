import Image from "next/image";

interface WalletActionButtonProps {
  label: string;
  svgIcon: string
  onClick?: () => void;
}

export const WalletActionButton: React.FC<WalletActionButtonProps> = ({
  label,
  svgIcon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col h-16.75 items-center gap-1.5 group"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111827] text-white transition-opacity group-hover:opacity-80">
        <Image
          width={24}
          height={24}
          src={svgIcon}
          alt={svgIcon}
          className="h-5 w-5" aria-hidden="true" />
      </div>
      <span className="text-[11px] font-semibold text-gray-700 dmSans-font">{label}</span>
    </button>
  );
};

export default WalletActionButton;
