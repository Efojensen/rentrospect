'use client'

import Image from 'next/image'
import { useState } from 'react'

interface DateSelectProps {
    value?: string
    options: string[]
    onChange?: (value: string) => void
}

const DateSelect: React.FC<DateSelectProps> = ({
    value,
    options,
    onChange,
}) => {
    const [selected, setSelected] = useState(value || options[0])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value)
        onChange?.(e.target.value)
    }

    return (
        <div className='relative w-45'>

            <select
                value={selected}
                onChange={handleChange}
                className='appearance-none w-full rounded-xl border border-[#D4D4D8] bg-arrowBackground
                    px-4 py-3 pr-10 text-sm text-[#71717A] outline-none cursor-pointer'
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <Image
                width={20}
                height={20}
                alt='chevron arrow down'
                src='/svgs/chevron-down.svg'
                className='absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none'
            />
        </div>
    )
}

export default DateSelect