import Image from 'next/image'
import type { VendorLogistics } from '@/types/profile'
import LogisticsAccordion from './LogisticsAccordion'

interface LogisticsPanelProps {
    logistics: VendorLogistics | null
}

const LogisticsPanel: React.FC<LogisticsPanelProps> = ({ logistics }) => {
    if (!logistics) {
        return (
            <p className='dmSans-font text-sm text-smallGreyText py-10 text-center'>
                Logistics details aren&apos;t available yet.
            </p>
        )
    }

    return (
        <div className='flex flex-col gap-4'>
            {/* Map placeholder — no map provider wired up yet, see the routes outline */}
            <div className='relative w-full h-52 md:h-64 rounded-2xl overflow-hidden bg-[#E7ECE9] flex items-center justify-center'>
                <div className='absolute inset-0 bg-[url("/svgs/designs.svg")] bg-cover bg-center opacity-30' />
                <div className='relative z-10 flex flex-col items-center gap-2'>
                    <Image width={28} height={28} alt='location pin' src='/svgs/profile/pin.svg' />
                    <p className='dmSans-font text-sm font-medium text-otherSmallText bg-white/80 backdrop-blur-sm rounded-full px-3 py-1'>
                        {logistics.address}
                    </p>
                </div>
                <div className='absolute bottom-3 left-3 flex flex-col gap-1.5'>
                    <button type='button' className='flex items-center justify-center size-8 rounded-full bg-white shadow-sm text-sm font-semibold cursor-pointer'>+</button>
                    <button type='button' className='flex items-center justify-center size-8 rounded-full bg-white shadow-sm text-sm font-semibold cursor-pointer'>−</button>
                </div>
            </div>

            <LogisticsAccordion
                title='Operating Hours'
                rows={logistics.operatingHours.map((row) => ({ label: row.day, value: row.hours }))}
            />

            <LogisticsAccordion
                title='Meeting Time Slots'
                rows={logistics.meetingSlots.map((slot) => ({ label: slot.label, value: slot.hours }))}
            />
        </div>
    )
}

export default LogisticsPanel
