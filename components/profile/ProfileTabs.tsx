'use client'

import { motion } from 'framer-motion'

export const PROFILE_TABS = ['Catalog', 'Logistics', 'Reviews'] as const
export type ProfileTab = typeof PROFILE_TABS[number]

interface ProfileTabsProps {
    active: ProfileTab
    onChange: (tab: ProfileTab) => void
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ active, onChange }) => {
    return (
        <div className='flex gap-8 border-b border-[#E6E7E8]'>
            {PROFILE_TABS.map((tab) => (
                <button
                    key={tab}
                    type='button'
                    onClick={() => onChange(tab)}
                    className={`relative pb-3 dmSans-font text-sm md:text-base font-medium cursor-pointer transition-colors ${
                        active === tab ? 'text-black' : 'text-smallGreyText'
                    }`}
                >
                    {tab}
                    {active === tab && (
                        <motion.div
                            layoutId='profile-tab-underline'
                            className='absolute left-0 right-0 -bottom-px h-0.5 bg-black rounded-full'
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                    )}
                </button>
            ))}
        </div>
    )
}

export default ProfileTabs
