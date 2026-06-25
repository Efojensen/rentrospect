// Numpad.tsx
// Reusable numpad shared by DepositAmountDialog and PinEntryDialog.
// Props:
//   onKey – called with the key pressed: "0"-"9", ".", ",", "backspace", "enter"

import React from "react";

interface NumpadProps {
  onKey: (key: string) => void;
}

// const ROWS = [
//   ["1", "2", "3", "-"],
//   ["4", "5", "6", "⌫"],
//   ["7", "8", "0", "⌫"],   // row 3: backspace icon lives here in the screenshot
//   [".", "0", ",", "→"],
// ];

// The screenshot layout (4 columns × 4 rows):
// 1  2  3  –
// 4  5  6  ⌫ (long backspace icon)
// 7  8  0  ⌫ (filled backspace)
// .  0  ,  →

const ACTUAL_ROWS = [
  [
    { label: "1", key: "1" },
    { label: "2", key: "2" },
    { label: "3", key: "3" },
    { label: "–", key: "-", muted: true },
  ],
  [
    { label: "4", key: "4" },
    { label: "5", key: "5" },
    { label: "6", key: "6" },
    { label: "⌫", key: "backspace", icon: "backspace-outline" },
  ],
  [
    { label: "7", key: "7" },
    { label: "8", key: "8" },
    { label: "0", key: "0" },
    { label: "⌫", key: "backspace", icon: "backspace-filled" },
  ],
  [
    { label: ".", key: "." },
    { label: "0", key: "0" },
    { label: ",", key: "," },
    { label: "→", key: "enter", icon: "enter" },
  ],
];

const BackspaceOutlineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
    <line x1="18" y1="9" x2="12" y2="15" />
    <line x1="12" y1="9" x2="18" y2="15" />
  </svg>
);

const BackspaceFilledIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
    <path d="M18 9l-6 6M12 9l6 6" stroke="white" strokeWidth="1.8"
      strokeLinecap="round" fill="none" />
  </svg>
);

const EnterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const Numpad: React.FC<NumpadProps> = ({ onKey }) => {
  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {ACTUAL_ROWS.map((row, ri) =>
        row.map((cell) => {
          const isMuted = "muted" in cell && cell.muted;
          const isIcon  = "icon" in cell && !!cell.icon;

          return (
            <button
              key={`${ri}-${cell.key}-${cell.label}`}
              type="button"
              onClick={() => onKey(cell.key)}
              className={[
                "flex h-14 w-full items-center justify-center rounded-2xl",
                "text-lg font-semibold transition-colors active:scale-95",
                "dmSans-font",
                isMuted
                  ? "text-gray-300 bg-white hover:bg-gray-50"
                  : isIcon
                  ? "bg-white text-gray-500 hover:bg-gray-100"
                  : "bg-white text-gray-900 hover:bg-gray-100 shadow-sm",
              ].join(" ")}
              aria-label={cell.key === "backspace" ? "Backspace" : cell.label}
            >
              {cell.icon === "backspace-outline" && <BackspaceOutlineIcon />}
              {cell.icon === "backspace-filled"  && <BackspaceFilledIcon />}
              {cell.icon === "enter"             && <EnterIcon />}
              {!isIcon && cell.label}
            </button>
          );
        })
      )}
    </div>
  );
};

export default Numpad;
