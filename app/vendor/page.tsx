import VendorStatTile from '@/components/vendor/StatTile'
import { vendorStats } from '@/constants/statTileData'
import React from 'react'

const page = () => {
    return (
        <main className='flex flex-col'>
            <div className='flex gap-6.25'>
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
        </main>
    )
}

export default page