"use client";

import { VerifyPayment } from "@/types/payment";
import OrderReceiptDialog from "@/components/payments/OrderReceiptDialog";

const formatCurrency = (amount: number | string | null | undefined): string => {
    const num = Number(amount);
    return `GH¢ ${Number.isFinite(num) ? num.toFixed(2) : "0.00"}`;
};

export default function ConfirmPaymentClient({
    uuid,
    transactionData,
}: {
    uuid: string;
    transactionData: VerifyPayment;
}) {
    return (
        <OrderReceiptDialog
            open={true}
            orderStatus="Pending"
            paymentStatus="Processing"
            orderId={transactionData.transactionId}
            projectCost={formatCurrency(transactionData.amount)}
            totalSum={formatCurrency(transactionData.netAmount)}
            processingFee={formatCurrency(transactionData.azaFee)}
            platformFee={formatCurrency(transactionData.rentrospectFee)}
            onApplyDiscount={(code) => console.log("Discount code:", code)}
            onContinue={() => {
                console.log("Continue with payment for:", uuid);
                // TODO: Implement payment flow
            }}
            onClose={() => {
                window.history.back();
            }}
        />
    );
}