export interface VendorStatTileProps {
    desc: string
    title: string
    change: string
    subText: string
    changeDirection: boolean
}

const VendorStatTile: React.FC<VendorStatTileProps> = ({ desc, title, change, subText, changeDirection }) => {
    return (
        <div className='flex flex-col min-w-75 gap-2.5 px-10.75 py-9.25 border-2 border-[#ECEEF6] rounded-xl bg-white shadow-[0_20px_50px_0_rgba(220,224,249,0.5)]'>
            <div className='flex justify-between items-center'>
                <h5 className='dmSans-font text-[1rem] tracking-[.01rem] text-black'>{title}</h5>
                <ChangeOval
                    change={change}
                    changeDirection={changeDirection}
                />
            </div>
            <p className='dmSans-font text-[1.75rem] font-bold text-[#026571] tracking-[.0175rem]'>{subText}</p>
            <p className='text-[#071148] text-[.875rem] tracking-[.0088rem] dmSans-font'>{desc}</p>
        </div>
    )
}

export default VendorStatTile

import Image from 'next/image'
import React from 'react'

const ChangeOval = ({change, changeDirection}: {change: string, changeDirection: boolean}) => {
    return (
        <div className={`flex items-center rounded-[3.125rem] gap-0.75 ${changeDirection ? 'bg-[##F4F6F6]' : 'bg-[##FF00001A]'}`}>
            <Image
                width={10}
                height={10}
                alt='arrow up or down'
                src={changeDirection ? '/svgs/bi_arrow-up.svg' : '/svgs/bi_arrow-down.svg'}
            />
            <p className={changeDirection ? 'text-black' : 'text-[#F00]'}>{change}</p>
        </div>
    )
}
