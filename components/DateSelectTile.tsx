'use client'

import { useState } from 'react'

interface DateSelectProps {
    value?: string
    onChange?: (value: string) => void
}

const DateSelect: React.FC<DateSelectProps> = ({
    value,
    onChange,
}) => {
    const [selected, setSelected] = useState(value || '')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(e.target.value)
        onChange?.(e.target.value)
    }

    return (
        <div className='relative w-45'>
            <input
                type='date'
                value={selected}
                onChange={handleChange}
                className='appearance-none w-full rounded-xl border border-[#D4D4D8] bg-arrowBackground
                    px-4 py-3 pr-10 text-sm text-[#71717A] outline-none cursor-pointer
                    [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0
                    [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full
                    [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer'
            />
        </div>
    )
}

export default DateSelect