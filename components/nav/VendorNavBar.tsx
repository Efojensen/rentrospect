'use client'

import Image from 'next/image'
import NavButtonLink from './NavButtonLink'
import { usePathname } from 'next/navigation'

const VendorNavBar = ({ location }: { location: string }) => {
    const pathname = usePathname()

    return (
        <nav className='flex justify-between my-6'>

            {/* Left */}
            <div className='flex gap-1 items-center'>

                <Image
                    width={44}
                    height={44}
                    alt='location svg'
                    src='/svgs/location.svg'
                    className='p-3'
                />

                <div className='flex flex-col'>
                    <p className='text-[#808493] dmSans-font text-[12px] leading-5.5'>
                        Your location
                    </p>

                    <p className='text-black dmSans-font text-sm'>
                        {location}
                    </p>
                </div>
            </div>

            {/* Right */}
            <div className='flex gap-4 items-center'>
                <Image
                    width={20}
                    height={20}
                    alt='bell icon'
                    src='/svgs/bell.svg'
                />
                <Image
                    width={48}
                    height={48}
                    alt='demo'
                    src='/images/demo.png'
                />
            </div>
        </nav>
    )
}

export default VendorNavBar