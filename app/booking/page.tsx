"use client";

import { useState } from "react";
import BookingInputField from "@/components/BookingInputField";
import { RentalAssetCard } from "@/components/RentalAssetCard";
import { DiscountCodeInput } from "@/components/DiscountCodeInput";
import { PaymentMethodTile, PaymentMethodType } from "@/components/PaymentMethodTile";
import LoadingDialog from "./loading";
import PaymentSuccessDialog from "@/components/PaymentSuccessDialog";

// ── Example SVG icons ────────────────────────────────────────────────────────

const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const TagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

// ── Mock data ────────────────────────────────────────────────────────────────

const PAYMENT_METHODS: { id: string; maskedNumber: string; methodType: PaymentMethodType }[] = [
  { id: "visa-8304", maskedNumber: "8304", methodType: "card" },
  { id: "momo-8304", maskedNumber: "8304", methodType: "momo" },
];

const ORDER_ITEMS = [
  { id: "1", src: "/images/assets/speaker.png", title: "M&K Sound S300 Speaker S...", price: "€180.00", quantity: 1, rate: "GH¢90/day" },
  { id: "2", src: "/images/chair.jpg", title: "Mesa de jantar Garbo – Hou...", price: "€200.00", quantity: 3, rate: "GH¢100/day" },
];

const SUMMARY_ROWS = [
  ["Subtotal", "€380.00"],
  ["Platform Service Fee", "€5.00"],
  ["Security Deposit", "€100.00"],
  ["Delivery Fee", "€0.00"],
  ["Discount (10%)", "-€48.50"],
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [email, setEmail] = useState('');
  const [endDate, setEndDate] = useState(Date);
  const [duration, setDuration] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [startDate, setStartDate] = useState(Date);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentResult, setPaymentResult] = useState<null | {
    amount: string;
    refNumber: string;
    paymentTime: string;
    paymentMethod: string;
    senderName: string;
    totalAmount: string;
  }>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState("visa-8304");

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const processPayment = async () => {
    await delay(4000);

    return {
      amount: "GHC 87.98",
      refNumber: "930345",
      paymentTime: "12:03AM",
      paymentMethod: "MOMO",
      senderName: "Priscilla",
      totalAmount: "GHC 436.50",
    };
  };

  const handlePay = async () => {
    setIsPaying(true);

    try {
      const result = await processPayment();

      setPaymentResult(result);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      <LoadingDialog open={isPaying} message='Checking balances' />
      <PaymentSuccessDialog
        open={paymentResult !== null}
        amount={paymentResult?.amount ?? ""}
        refNumber={paymentResult?.refNumber ?? ""}
        paymentTime={paymentResult?.paymentTime ?? ""}
        paymentMethod={paymentResult?.paymentMethod ?? ""}
        senderName={paymentResult?.senderName ?? ""}
        totalAmount={paymentResult?.totalAmount ?? ""}
        onContinue={() => setPaymentResult(null)} // or router.push("/") etc.
      />
      <main className="flex flex-col md:flex-row min-h-screen">

        {/* Left dark panel */}
        <div className="w-full md:w-1/2 bg-greenBookingBg px-5 md:px-29 md:py-10">
          <h2 className="mb-6 text-[24px] font-semibold text-white montserrat-font">Your Order</h2>

          {ORDER_ITEMS.map((item) => (
            <RentalAssetCard key={item.id} {...item} />
          ))}

          <DiscountCodeInput
            label="Discount Code"
            SvgIcon={TagIcon}
            value={discountCode}
            onChange={setDiscountCode}
            onApply={(code) => setAppliedCode(code)}
          />

          {appliedCode && (
            <p className="mt-2 text-xs text-emerald-400 dmSans-font">
              ✓ Code &quot;{appliedCode}&quot; applied
            </p>
          )}

          <hr className="my-1 border-t border-white/8" />

          <div className="mt-7 flex flex-col gap-2.5 text-sm mb-3">
            {SUMMARY_ROWS.map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-gray-400 dmSans-font">{k}</span>
                <span className="text-gray-200 dmSans-font">{v}</span>
              </div>
            ))}
            <hr className="my-1 border-t border-white/8" />
            <div className="flex justify-between text-base font-semibold text-white dmSans-font">
              <span>Total</span>
              <span>€436.50</span>
            </div>
          </div>
        </div>

        {/* Right light panel */}
        <div className="flex flex-1 px-12 py-10 bg-white justify-center items-center">
          <div className="flex w-full max-w-120 flex-col gap-9">

            <BookingInputField
              type='text'
              label="Email"
              value={email}
              SvgIcon={EmailIcon}
              onChange={setEmail}
              placeholder='someone@example.com'
            />
            <BookingInputField
              type='text'
              placeholder='+233-559-892-202'
              label='Phone Number'
              value={phoneNumber}
              SvgIcon={PhoneIcon}
              onChange={setPhoneNumber}
            />
            {/* Payment methods */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dmSans-font">Payment method</span>
                <button type="button" className="text-sm text-gray-400 hover:text-gray-700 transition-colors dmSans-font">
                  + Change
                </button>
              </div>
              <div className="flex gap-3">
                {PAYMENT_METHODS.map((pm) => (
                  <PaymentMethodTile
                    key={pm.id}
                    maskedNumber={pm.maskedNumber}
                    methodType={pm.methodType}
                    editLabel="Edit"
                    selected={selectedPaymentId === pm.id}
                    onSelect={() => setSelectedPaymentId(pm.id)}
                  />
                ))}
              </div>
            </div>

            <BookingInputField
              type='date'
              label="Duration"
              value={duration}
              SvgIcon={EmailIcon}
              onChange={setDuration}
            />
            <div className='flex gap-3'>
              <BookingInputField
                type='date'
                label="Start Date"
                value={startDate}
                SvgIcon={EmailIcon}
                onChange={setStartDate}
              />
              <BookingInputField
                type='date'
                label='End Date'
                value={endDate}
                SvgIcon={PhoneIcon}
                onChange={setEndDate}
              />

            </div>


            <button
              type="button"
              onClick={handlePay}
              className='mt-2 h-12 w-full rounded-2xl bg-gray-900 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dmSans-font cursor-pointer'
            >
              Pay €436.50
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
