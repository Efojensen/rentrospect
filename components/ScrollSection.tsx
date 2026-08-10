'use client'

import Image from 'next/image';
import { useRef } from 'react';

interface ScrollSectionProps {
    title: string;
    scrollAmount: number;
    children: React.ReactNode;
}

export default function ScrollSection({ title, scrollAmount, children }: ScrollSectionProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='dmSans-font text-[1.25rem] font-medium capitalize text-sectionTitle p-2.5'>{title}</h2>
                <div className='flex gap-5'>
                    <button
                        onClick={scrollLeft}
                        className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center cursor-pointer'
                    >
                        <Image width={16} height={16} alt='left-arrow' src='/svgs/chevron_left.svg' className='size-3' />
                    </button>
                    <button
                        onClick={scrollRight}
                        className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center cursor-pointer'
                    >
                        <Image width={16} height={16} alt='right-arrow' src='/svgs/chevron_right.svg' className='size-3' />
                    </button>
                </div>
            </div>
            <div ref={scrollRef} className='flex gap-5 overflow-x-auto no-scrollbar whitespace-nowrap'>
                {children}
            </div>
        </>
    );
}