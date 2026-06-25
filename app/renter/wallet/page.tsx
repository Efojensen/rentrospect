"use client";

import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { WalletCard } from "@/components/WalletCard";
import PinEntryDialog from "@/components/PinEntryDialog";
import { TransactionRow } from "@/components/TransactionRow";
import ProcessingDialog from "@/components/ProcessingDialog";
import DepositAmountDialog from "@/components/DepositAmountDialog";
import { WalletActionButton } from "@/components/WalletActionButton";
import ChoosePaymentMethodDialog from "@/components/ChoosePaymentMethodDialog";

// ── Types & static data ───────────────────────────────────────────────────────

type FlowStep = "idle" | "amount" | "method" | "pin" | "processing";

const CARDS = [
  { balanceLabel: "Current Balance", balance: "₵5,750.20", maskedNumber: "3854", expiry: "09/24", active: true },
  { balanceLabel: "Available Balance", balance: "₵5,745.20", maskedNumber: "3854", expiry: "09/24", active: false },
  { balanceLabel: "Escrow Balance", balance: "₵520.00", maskedNumber: "3854", expiry: "09/24", active: false },
];

const TRANSACTIONS = [
  { avatarSrc: "/avatars/behance.png", avatarAlt: "Behance", name: "Behance", date: "May 24, 2022", amount: "-₵80.59", type: "debit" as const },
  { avatarSrc: "/avatars/dribbble.png", avatarAlt: "Dribbble", name: "Dribbble", date: "May 12, 2022", amount: "-₵34.75", type: "debit" as const },
  { avatarSrc: "/avatars/kris.png", avatarAlt: "Kris", name: "Kris", date: "May 9, 2022", amount: "+₵1,000.97", type: "credit" as const },
  { avatarSrc: "/avatars/youtube.png", avatarAlt: "YouTube", name: "YouTube", date: "May 8, 2022", amount: "-₵20.37", type: "debit" as const },
  { avatarSrc: "/avatars/jessy.png", avatarAlt: "Jessy", name: "Jessy", date: "May 8, 2022", amount: "-₵1,085.00", type: "debit" as const },
  { avatarSrc: "/avatars/nella.png", avatarAlt: "Nella", name: "Nella", date: "May 8, 2022", amount: "+₵500.00", type: "credit" as const },
];

// ── Wallet cards (responsive) ─────────────────────────────────────────────────

const RenderWalletCards = () => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const cardsToRender = isMobile ? CARDS.slice(0, 1) : CARDS;

  return (
    <div className="flex flex-1 gap-6 overflow-x-auto pb-1 scrollbar-hide">
      {cardsToRender.map((card) => (
        <div key={card.balanceLabel} className="min-w-43.75 flex-1">
          <WalletCard {...card} />
        </div>
      ))}
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WalletPage() {
  const [step, setStep] = useState<FlowStep>("idle");
  const [methodId, setMethodId] = useState("momo-1");
  const [isWithdraw, setIsWithdraw] = useState<boolean>(false)

  const close = () => setStep("idle");

  // Step 1 → 2: save the entered amount, open method picker
  const handleAmountNext = () => {
    setStep("method");
  };

  // Step 2 → 3: method chosen, open PIN entry
  const handleMethodNext = () => setStep("pin");

  // Step 3 → 4: PIN confirmed, start processing
  const handlePinConfirm = async () => {
    setStep("processing");
    await new Promise((r) => setTimeout(r, 3000)); // replace with real API call
    close();
  };

  return (
    <>
      <main className="bg-gray-50 pb-8">
        <div className="flex flex-col gap-6">

          {/* Wallet cards + action buttons */}
          <div className="flex items-start gap-3">
            <RenderWalletCards />

            <div className="flex shrink-0 flex-col gap-4 pt-1">
              {/* ↓ Top Up → opens amount screen */}
              <WalletActionButton
                label="Top Up"
                svgIcon="/svgs/top_up.svg"
                onClick={() => {
                  setStep("amount")
                  setIsWithdraw(false)
                }}
              />
              {/* ↓ Withdraw → also opens amount screen (same flow, different action) */}
              <WalletActionButton
                label="Withdraw"
                svgIcon="/svgs/withdraw.svg"
                onClick={() => {
                  setStep("amount")
                  setIsWithdraw(true)}
                }
              />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900 dmSans-font">
                Recent Transactions
              </span>
              <button
                type="button"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors dmSans-font"
              >
                See All
              </button>
            </div>

            {TRANSACTIONS.map((tx) => (
              <TransactionRow key={`${tx.name}-${tx.date}`} {...tx} />
            ))}
          </div>
        </div>
      </main>

      {/* ── Dialog stack ── rendered outside <main> so they overlay everything ── */}

      {/* Screen 1: enter amount */}
      <DepositAmountDialog
        onBack={close}
        onClose={close}
        title={isWithdraw? 'Withdraw' : 'Deposit'}
        activeBalance="₵5,580"
        open={step === "amount"}
        onNext={handleAmountNext}         //{/* amount entered → go to method */}
      />

      {/* Screen 2: choose payment method */}
      <ChoosePaymentMethodDialog
        onClose={close}
        selectedId={methodId}
        onSelect={setMethodId}
        open={step === "method"}
        onNext={handleMethodNext}         //{/* Continue → go to PIN */}
        onBack={() => setStep("amount")}  //{/* ‹ back to amount */}
        onAddCard={() => console.log("add card")}
        onAddMomo={() => console.log("add momo")}
      />

      {/* Screen 3: PIN entry */}
      <PinEntryDialog
        onClose={close}
        open={step === "pin"}
        onConfirm={handlePinConfirm}      //{/* PIN confirmed → start processing */}
        onBack={() => setStep("method")}  //{/* ‹ back to method */}
        onCancel={() => setStep("method")}//{/* Cancel → back to method */}
      />

      {/* Screen 4: processing spinner */}
      <ProcessingDialog
        onCancel={close}
        open={step === "processing"}
        message="Processing transaction..."
      />
    </>
  );
}
