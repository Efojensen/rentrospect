// WalletPage.tsx — assembles WalletCard, WalletActionButton, TransactionRow
"use client";

import { useMediaQuery } from "react-responsive";
import { WalletCard } from "@/components/WalletCard";
import { TransactionRow } from "@/components/TransactionRow";
import { WalletActionButton } from "@/components/WalletActionButton";

// ── Static data ───────────────────────────────────────────────────────────────

const CARDS = [
  { balanceLabel: "Current Balance",   balance: "₵5,750.20", maskedNumber: "3854", expiry: "09/24", active: true  },
  { balanceLabel: "Available Balance", balance: "₵5,745.20", maskedNumber: "3854", expiry: "09/24", active: false },
  { balanceLabel: "Escrow Balance",    balance: "₵520.00",   maskedNumber: "3854", expiry: "09/24", active: false },
];

const TRANSACTIONS = [
  { avatarSrc: "/avatars/behance.png",  avatarAlt: "Behance",  name: "Behance",  date: "May 24, 2022", amount: "-₵80.59",   type: "debit"  as const },
  { avatarSrc: "/avatars/dribbble.png", avatarAlt: "Dribbble", name: "Dribbble", date: "May 12, 2022", amount: "-₵34.75",   type: "debit"  as const },
  { avatarSrc: "/avatars/kris.png",     avatarAlt: "Kris",     name: "Kris",     date: "May 9, 2022",  amount: "+₵1,000.97",type: "credit" as const },
  { avatarSrc: "/avatars/youtube.png",  avatarAlt: "YouTube",  name: "YouTube",  date: "May 8, 2022",  amount: "-₵20.37",   type: "debit"  as const },
  { avatarSrc: "/avatars/jessy.png",    avatarAlt: "Jessy",    name: "Jessy",    date: "May 8, 2022",  amount: "-₵1,085.00",type: "debit"  as const },
  { avatarSrc: "/avatars/nella.png",    avatarAlt: "Nella",    name: "Nella",    date: "May 8, 2022",  amount: "+₵500.00",  type: "credit" as const },
];

export const RenderWalletCards = () => {
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
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WalletPage() {
  return (
    <main className="bg-gray-50 pb-8">
      <div className='flex flex-col gap-6'>

        {/* ── Wallet cards + action buttons ── */}
        <div className="flex items-start gap-3">

          {/* Cards row */}
          {RenderWalletCards()}

          {/* Action buttons stacked vertically */}
          <div className="flex shrink-0 flex-col gap-4 pt-1">
            <WalletActionButton label="Top Up"   svgIcon={'/svgs/top_up.svg'}   onClick={() => {}} />
            <WalletActionButton label="Withdraw" svgIcon={'/svgs/withdraw.svg'} onClick={() => {}} />
          </div>
        </div>

        {/* ── Recent Transactions ── */}
        <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">

          {/* Section header */}
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

          {/* Rows */}
          {TRANSACTIONS.map((tx) => (
            <TransactionRow key={`${tx.name}-${tx.date}`} {...tx} />
          ))}
        </div>

      </div>
    </main>
  );
}

