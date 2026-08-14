// useQrScanner.ts
// Listens for a hardware QR / barcode scanner on the window.
//
// Hardware scanners work by rapidly typing characters then pressing Enter.
// This hook buffers those keystrokes and fires onScan(result) when Enter arrives,
// but only if the burst came fast enough to be a scanner (not a human typing).
//
// Usage:
//   useQrScanner({ onScan: (data) => { ... } });
//
// Options:
//   onScan        – called with the scanned string
//   minLength     – ignore results shorter than this (default 3)
//   maxKeyGap     – ms between keystrokes before the buffer resets (default 50)

import { useEffect, useRef } from "react";

interface UseQrScannerOptions {
  onScan: (data: string) => void;
  minLength?: number;
  maxKeyGap?: number;
}

export function useQrScanner({
  onScan,
  minLength = 3,
  maxKeyGap = 50,
}: UseQrScannerOptions) {
  const buffer    = useRef("");
  const lastKeyAt = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();

      // If too long since last keystroke, the buffer belongs to a human — reset
      if (now - lastKeyAt.current > maxKeyGap) {
        buffer.current = "";
      }
      lastKeyAt.current = now;

      if (e.key === "Enter") {
        const result = buffer.current.trim();
        buffer.current = "";
        if (result.length >= minLength) {
          onScan(result);
        }
        return;
      }

      // Only accumulate printable single characters
      if (e.key.length === 1) {
        buffer.current += e.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onScan, minLength, maxKeyGap]);
}

export default useQrScanner;
