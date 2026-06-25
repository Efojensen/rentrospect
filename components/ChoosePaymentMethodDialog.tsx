export interface PaymentMethod {
  id: string;
  label: string;          // masked number or identifier
}

interface ChoosePaymentMethodDialogProps {
  open: boolean;
  onNext: () => void;
  onClose: () => void;
  selectedId?: string;
  onBack?: () => void;
  onAddCard?: () => void;
  onAddMomo?: () => void;
  cardMethods?: PaymentMethod[];
  momoMethods?: PaymentMethod[];
  onSelect: (id: string) => void;
}

// ── Brand icons ───────────────────────────────────────────────────────────────

const VisaIcon = () => (
  <div className="flex h-8 w-12 items-center justify-center rounded-md bg-[#1a1f71]">
    <span className="text-[10px] font-extrabold tracking-wider text-white dmSans-font">VISA</span>
  </div>
);

const MastercardIcon = () => (
  <div className="flex h-8 w-12 items-center justify-center rounded-md bg-white border border-gray-200">
    <div className="flex">
      <div className="h-5 w-5 rounded-full bg-red-500 opacity-90" />
      <div className="-ml-2.5 h-5 w-5 rounded-full bg-yellow-400 opacity-90" />
    </div>
  </div>
);

const MomoIcon = () => (
  <div className="flex h-8 w-12 items-center justify-center rounded-md bg-yellow-400">
    <span className="text-[9px] font-extrabold text-white dmSans-font">MoMo</span>
  </div>
);

const AirtelIcon = () => (
  <div className="flex h-8 w-12 items-center justify-center rounded-md bg-red-600">
    <span className="text-[9px] font-extrabold text-white dmSans-font">Airtel</span>
  </div>
);

const RadioCircle: React.FC<{ selected: boolean }> = ({ selected }) => (
  <span className={[
    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
    selected ? "border-teal-500" : "border-gray-300",
  ].join(" ")}>
    {selected && <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />}
  </span>
);

// ── Method row ────────────────────────────────────────────────────────────────

interface MethodRowProps {
  icon: React.ReactNode;
  label: string;
  id: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

const MethodRow: React.FC<MethodRowProps> = ({ icon, label, id, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(id)}
    className="flex w-full items-center gap-3 py-3 border-b border-gray-100 last:border-b-0"
  >
    {icon}
    <span className="flex-1 text-left text-sm text-gray-500 dmSans-font">{label}</span>
    <RadioCircle selected={selected} />
  </button>
);

// ── Add row ───────────────────────────────────────────────────────────────────

const AddRow: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center justify-between py-3"
  >
    <span className="text-sm font-semibold text-gray-700 dmSans-font">{label}</span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
);

// ── Dialog ────────────────────────────────────────────────────────────────────

const ICONS: Record<string, React.ReactNode> = {
  visa: <VisaIcon />,
  mastercard: <MastercardIcon />,
  momo: <MomoIcon />,
  airtel: <AirtelIcon />,
};

export const ChoosePaymentMethodDialog: React.FC<ChoosePaymentMethodDialogProps> = ({
  open,
  onBack,
  onNext,
  onClose,
  onSelect,
  onAddMomo,
  onAddCard,
  selectedId,
  cardMethods = [],
  momoMethods = [],
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="relative flex w-full max-w-sm flex-col gap-4 rounded-3xl bg-gray-50 px-6 pb-6 pt-5 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between">
          <button type="button" onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-gray-500 hover:text-gray-800 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-900 dmSans-font">Choose Payment Method</span>
          <button type="button" onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-gray-400 hover:text-gray-700 transition-colors text-base leading-none">
            ✕
          </button>
        </div>

        {/* Card methods section */}
        <div className="rounded-2xl bg-white px-4 py-1 shadow-sm">
          <p className="pb-2 pt-3 text-xs font-semibold text-gray-400 uppercase tracking-wider dmSans-font">
            Card Payment Methods
          </p>

          {cardMethods.length === 0 ? (
            <>
              <MethodRow icon={<VisaIcon />}       label="Card number" id="visa-placeholder"       selected={selectedId === "visa-placeholder"}       onSelect={onSelect} />
              <MethodRow icon={<MastercardIcon />} label="Card number" id="master-placeholder"     selected={selectedId === "master-placeholder"}     onSelect={onSelect} />
            </>
          ) : (
            cardMethods.map((m) => (
              <MethodRow
                key={m.id}
                icon={ICONS[m.id.split("-")[0]] ?? <VisaIcon />}
                label={m.label}
                id={m.id}
                selected={selectedId === m.id}
                onSelect={onSelect}
              />
            ))
          )}

          <AddRow label="Add New Card" onClick={onAddCard} />
        </div>

        {/* MoMo methods section */}
        <div className="rounded-2xl bg-white px-4 py-1 shadow-sm">
          <p className="pb-2 pt-3 text-xs font-semibold text-gray-400 uppercase tracking-wider dmSans-font">
            Momo Payment Methods
          </p>

          {momoMethods.length === 0 ? (
            <>
              <MethodRow icon={<MomoIcon />}   label="0241504054" id="momo-1" selected={selectedId === "momo-1"} onSelect={onSelect} />
              <MethodRow icon={<AirtelIcon />} label="0201456854" id="momo-2" selected={selectedId === "momo-2"} onSelect={onSelect} />
            </>
          ) : (
            momoMethods.map((m) => (
              <MethodRow
                key={m.id}
                icon={ICONS[m.id.split("-")[0]] ?? <MomoIcon />}
                label={m.label}
                id={m.id}
                selected={selectedId === m.id}
                onSelect={onSelect}
              />
            ))
          )}

          <AddRow label="Add New Momo" onClick={onAddMomo} />
        </div>
        <AddRow label='Next' onClick={onNext}/>
      </div>
    </div>
  );
};

export default ChoosePaymentMethodDialog;
