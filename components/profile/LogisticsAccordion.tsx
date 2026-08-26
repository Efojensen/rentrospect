'use client'

import Image from 'next/image'
import { useState } from 'react'

interface LogisticsAccordionProps {
    title: string
    rows: { label: string; value: string }[]
    defaultOpen?: boolean
}

const LogisticsAccordion: React.FC<LogisticsAccordionProps> = ({ title, rows, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className='w-full rounded-2xl bg-white overflow-hidden'>
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className='flex w-full items-center justify-between bg-[#1B1B1B] rounded-2xl px-5 py-3.5 cursor-pointer'
            >
                <span className='dmSans-font text-xs md:text-sm font-semibold uppercase tracking-wide text-white'>
                    {title}
                </span>
                <Image
                    width={16}
                    height={16}
                    alt='chevron-down'
                    src='/svgs/chevron-down.svg'
                    className={`invert transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className='overflow-hidden'>
                    <div className='flex flex-col divide-y divide-[#F1F5F9]'>
                        {rows.map((row) => (
                            <div key={row.label} className='flex items-center justify-between px-5 py-3.5'>
                                <p className='dmSans-font text-sm text-otherSmallText'>{row.label}</p>
                                <p className='dmSans-font text-sm font-medium text-black'>{row.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogisticsAccordion
