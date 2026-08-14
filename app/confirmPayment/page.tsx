// QrReceiptPage.example.tsx
// Shows how to handle a hardware QR scan that contains a UUID.
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import useQrScanner from "@/utils/useQrScanner";

// Shape of data encoded in your QR code
interface QrPayload {
  uuid: string;
}

function parseQr(raw: string): QrPayload | null {
  try {
    // QR contains JSON → { uuid }
    return JSON.parse(raw) as QrPayload;
  } catch {
    // QR contains just a UUID string
    return { uuid: raw };
  }
}

export default function QrReceiptPage() {
  const router = useRouter();

  // Called automatically whenever the scanner fires
  const handleScan = useCallback((raw: string) => {
    const payload = parseQr(raw);
    if (payload?.uuid) {
      // Redirect to the UUID-based page which will fetch transaction details
      router.push(`/confirmPayment/${payload.uuid}`);
    } else {
      console.warn("Unrecognised QR payload:", raw);
    }
  }, [router]);

  useQrScanner({ onScan: handleScan });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <p className="text-sm text-gray-500 dmSans-font">
        Point the scanner at a project QR code to begin.
      </p>
    </main>
  );
}
