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
import type { WalletBalance, VendorTransaction } from "@/services/backend";

// ── Types & helpers ────────────────────────────────────────────────────────────

type FlowStep = "idle" | "amount" | "method" | "pin" | "processing";

interface Props {
  balance: WalletBalance | null;
  transactions: VendorTransaction[];
}

const formatCurrency = (amount: number) =>
  `₵${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// ── Wallet cards (responsive) ─────────────────────────────────────────────────

const RenderWalletCards = ({ balance }: { balance: WalletBalance | null }) => {
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const cards = [
    { balanceLabel: "Current Balance", balance: formatCurrency(balance?.totalBalance ?? 0), maskedNumber: "", expiry: "", active: true },
    { balanceLabel: "Available Balance", balance: formatCurrency(balance?.availableBalance ?? 0), maskedNumber: "", expiry: "", active: false },
    { balanceLabel: "Escrow Balance", balance: formatCurrency(balance?.escrowBalance ?? 0), maskedNumber: "", expiry: "", active: false },
  ];
  const cardsToRender = isMobile ? cards.slice(0, 1) : cards;

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

const WalletClient = ({ balance, transactions }: Props) => {
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
      <main className="bg-gray-50 pb-8 p-3">
        <div className="flex flex-col gap-6">

          {/* Wallet cards + action buttons */}
          <div className="flex items-start gap-3">
            <RenderWalletCards balance={balance} />

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

            {transactions.map((tx) => (
              <TransactionRow
                key={`${tx.name}-${tx.startDate}`}
                avatarSrc={tx.profilePic}
                avatarAlt={tx.name}
                name={tx.name}
                date={formatDate(tx.endDate)}
                amount={`${tx.status === "released" ? "+" : "-"}${formatCurrency(tx.amount)}`}
                type={tx.status === "released" ? "credit" : "debit"}
              />
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
        activeBalance={formatCurrency(balance?.availableBalance ?? 0)}
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

export default WalletClient
