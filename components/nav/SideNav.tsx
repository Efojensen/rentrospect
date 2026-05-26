// components/nav/SideNav.tsx

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    {
        href: '/vendor',
        icon: '/svgs/sideNav/home.svg',
    },
    {
        href: '/vendor/wallet',
        icon: '/svgs/sideNav/wallet.svg',
    },
    {
        href: '/vendor/upload',
        icon: '/svgs/sideNav/upload.svg',
    },
    {
        href: '/messages',
        icon: '/svgs/sideNav/message.svg',
    },
    {
        href: '/profile',
        icon: '/svgs/sideNav/user.svg'
    },
]

const SideNav = () => {
    const pathname = usePathname()

    return (
        <aside className='hidden md:flex fixed left-0 top-0 h-screen w-20 flex-col items-center py-4'>

            {/* Logo */}
            <div className='mt-4.5 mb-10'>
                <Image
                    src='/svgs/rentrospect.svg'
                    alt='rentrospect logo'
                    width={44}
                    height={44}
                />
            </div>

            {/* Main Navigation */}
            <div className='relative flex flex-col items-center gap-8'>

                {navItems.map((item, index) => {
                    const Icon = item.icon
                    const active = pathname === item.href

                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className='relative'
                        >
                            {/* Active Background Bubble */}
                            {active && (
                                <div className='absolute inset-0 scale-[2.1] rounded-full bg-[#2E3A3B]' />
                            )}

                            {/* Icon */}
                            <div className='relative z-10 flex items-center justify-center'>
                                <Image
                                    width={18}
                                    height={18}
                                    alt='sidebar-icon'
                                    src={Icon}
                                    className={
                                        active
                                            ? 'text-white'
                                            : 'text-[#94A3B8]'
                                    }
                                />
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Bottom Icon */}
            {/* <div className='mt-auto mb-4'>
                <button className='flex items-center justify-center'>
                    <Info
                        size={18}
                        className='text-[#94A3B8]'
                    />
                </button>
            </div> */}
        </aside>
    )
}

export default SideNav