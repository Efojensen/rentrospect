import VendorStatTile from '@/components/vendor/StatTile'
import { vendorStats } from '@/constants/statTileData'
import React from 'react'

const page = () => {
    return (
        <main className='flex flex-col'>
            <div className='flex gap-6.25 mb-10'>
                {vendorStats.map((stat, index) => (
                    <div className='shrink-0' key={index}>
                        <VendorStatTile
                            desc={stat.desc}
                            title={stat.title}
                            change={stat.change}
                            subText={stat.subText}
                            changeDirection={stat.changeDirection}
                        />
                    </div>
                ))}
            </div>
            <h3 className='inter-font text-[15px] font-medium leading-3.75 tracking-[-0.0187rem] mb-4'>My rentals</h3>
        </main>
    )
}

export default page