interface WalletCardProps {
  balanceLabel: string;
  balance: string;
  cardNetwork?: string;
  maskedNumber: string;
  expiry: string;
  active?: boolean;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  balanceLabel,
  balance,
  cardNetwork = "VISA",
  maskedNumber,
  expiry,
  active = false,
}) => {
  return (
    <div
      className={[
        "relative flex flex-col justify-between rounded-2xl bg-[#111827] px-5 py-4 text-white select-none",
        "h-46.25 w-full overflow-hidden transition-shadow",
        active ? "shadow-xl ring-1 ring-white/10" : "shadow-md opacity-90",
      ].join(" ")}
    >
      {/* Top row: network + masked number */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold tracking-widest dmSans-font">{cardNetwork}</span>
        <span className="text-xs tracking-[0.18em] text-gray-400 dmSans-font">
          •••• {maskedNumber}
        </span>
      </div>

      {/* Middle: balance label + amount */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400 dmSans-font">
          {balanceLabel}
        </span>
        <span className="text-2xl font-bold tracking-tight dmSans-font">{balance}</span>
      </div>

      {/* Bottom: expiry */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-gray-500 dmSans-font">Exp</span>
        <span className="text-[11px] font-semibold text-gray-300 dmSans-font">{expiry}</span>
      </div>

      {/* Decorative circle accents */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/3"/>
      <div className="pointer-events-none absolute -bottom-8 -right-2 h-36 w-36 rounded-full bg-white/3"/>
    </div>
  );
};

export default WalletCard;
