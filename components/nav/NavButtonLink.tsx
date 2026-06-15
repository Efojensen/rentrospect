'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface NavButtonProps {
    alt: string
    href: string
    icon: string
    label: string
    active: boolean
    inactiveIcon: string
}

const NavButtonLink: React.FC<NavButtonProps> = ({
    alt,
    href,
    icon,
    label,
    active,
    inactiveIcon
}) => {
    return (
        <Link href={href}>
            <motion.div
                layout
                transition={{
                    layout: {
                        duration: 0.35,
                        type: 'spring',
                        stiffness: 250,
                        damping: 22,
                    },
                }}
                className={`
                    relative flex items-center overflow-hidden
                    ${active
                        ? 'bg-white px-[1.0313rem] py-3 rounded-[3rem]'
                        : 'bg-[#FFFFFF33] p-3 rounded-full'}
                `}
            >
                <div className='flex items-center gap-4.25'>
                    <Image
                        alt={alt}
                        src={active ? icon : inactiveIcon}
                        width={24}
                        height={24}
                    />

                    <AnimatePresence>
                        {active && (
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    width: 0,
                                    x: -10,
                                }}
                                animate={{
                                    opacity: 1,
                                    width: 'auto',
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    width: 0,
                                    x: -10,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                                className='overflow-hidden whitespace-nowrap dmSans-font text-loginTextClr text-[1rem] font-semibold leading-[1.1rem]'
                            >
                                {label}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </Link>
    )
}

export default NavButtonLink