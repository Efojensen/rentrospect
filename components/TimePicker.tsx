'use client'

import { useRef } from 'react'
import Image from 'next/image'

interface TimePickerProps {
    value: string
    onChange: (value: string) => void
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleClick = () => {
        inputRef.current?.showPicker?.() || inputRef.current?.focus()
    }

    return (
        <div
            onClick={handleClick}
            className="flex items-center justify-between gap-3 bg-gray-100 rounded-xl px-3 py-4 cursor-pointer w-48 flex-1"
        >
            {/* Left side (icon + time) */}
            <div className="flex items-center gap-4">
                <Image
                    width={16}
                    alt="clock"
                    height={16}
                    src="/svgs/auth/clock.svg"
                />
                <span className="text-sm text-[#1A1C1B] dmSans-font">
                    {formatTime(value)}
                </span>
            </div>

            {/* Dropdown arrow */}
            <Image
                alt="open"
                width={16}
                height={16}
                src="/svgs/auth/chevron_down.svg"
            />

            {/* Hidden native input */}
            <input
                type="time"
                value={value}
                ref={inputRef}
                onChange={(e) => onChange(e.target.value)}
                className="absolute opacity-0 pointer-events-none"
            />
        </div>
    )
}

export default TimePicker

// Helper: convert "13:00" → "01:00 PM"
function formatTime(time: string) {
    if (!time) return 'Select time'

    const [hour, minute] = time.split(':')
    const h = Number(hour)

    const suffix = h >= 12 ? 'PM' : 'AM'
    const formattedHour = h % 12 === 0 ? 12 : h % 12

    return `${formattedHour.toString().padStart(2, '0')}:${minute} ${suffix}`
}