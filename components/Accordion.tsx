'use client'

import Image from 'next/image'
import { useState } from 'react'

interface AccordionProps {
    title: string
    defaultOpen?: boolean
    children: React.ReactNode
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    children,
    defaultOpen = false,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className='w-full rounded-xl py-6.25 px-7 bg-white overflow-hidden'>
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className='flex w-full items-center justify-between px-4 py-3 cursor-pointer'
            >
                <span className='montserrat-font text-[14px] md:text-[16px] font-bold uppercase tracking-wide text-black'>
                    {title}
                </span>

                <Image
                    width={24}
                    height={24}
                    alt='chevron-down'
                    src='/svgs/chevron-down.svg'
                    className={`transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                        ? 'grid-rows-[1fr]'
                        : 'grid-rows-[0fr]'
                }`}
            >
                <div className='overflow-hidden'>
                    <div className='px-4 pb-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accordion