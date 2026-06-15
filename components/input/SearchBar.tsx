'use client'

import Image from 'next/image'

const SearchBar = () => {
    return (
        <div className='flex md:hidden items-center justify-between w-full rounded-xl bg-nearWhiteBg p-4'>

            {/* Left Side */}
            <div className='flex items-center flex-1 gap-5'>

                {/* Search Icon */}
                <div className='flex items-center justify-center'>
                    <Image
                        width={19}
                        height={19}
                        alt='search icon'
                        src='/svgs/search_.svg'
                        className='stroke-[#8696BB]'
                    />
                </div>

                {/* Input */}
                <input
                    type='text'
                    placeholder='What would you like to look for?'
                    className='
                        w-full
                        bg-transparent
                        outline-none
                        placeholder:text-[#7F91C2]
                        text-[#7F91C2]
                        text-[.9375rem]
                        font-medium
                    '
                />
            </div>

            {/* Filter Icon */}
            <button className='ml-4'>
                <Image
                    width={19}
                    height={19}
                    alt='search icon'
                    src='/svgs/slider.svg'
                />
                {/* <SlidersHorizontal
                    size={34}
                    strokeWidth={1.8}
                    className='text-[#7F91C2]'
                /> */}
            </button>
        </div>
    )
}

export default SearchBar