import Image from 'next/image'

export interface ArrivalTileProps {
    src: string
    qty: number
    owner: string
    assetType: string
    profileImg: string
}

const ArrivalTile: React.FC<ArrivalTileProps> = ({
    src,
    qty,
    owner,
    profileImg,
    assetType
}) => {
    return (
        <div className='flex flex-col w-fit'>

            {/* Image Container */}
            <div className='relative mb-4 overflow-hidden rounded-4xl'>

                {/* Main Image */}
                <Image
                    src={src}
                    width={285}
                    height={260}
                    alt='asset image'
                    className='object-cover w-71.25 h-65'
                />

                {/* Top Tag */}
                <div className='absolute top-3 left-3 bg-white rounded-full px-3 py-1'>
                    <p className='dmSans-font text-[10px] font-medium text-black'>
                        {assetType}
                    </p>
                </div>

                {/* Bottom Glass Container */}
                <div className='absolute bottom-3 left-1/2 -translate-x-1/2 w-[92%] rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 shadow-lg'>
                    <div className='relative z-10 flex items-center justify-between px-4 py-3'>
                        <p className='dmSans-font text-white text-sm font-medium'>Qty: {qty}</p>
                        <button className='bg-[#016D7A] rounded-xl px-4 py-2 dmSans-font text-sm font-medium text-black'>Order Now</button>
                    </div>
                </div>
            </div>

            {/* Owner Section */}
            <div className='flex gap-1.5 items-center'>
                <Image
                    width={36}
                    height={36}
                    src={profileImg}
                    alt='business owner'
                    className='rounded-lg'
                />

                <div className='flex flex-col'>
                    <p className='capitalize dmSans-font text-[8px] font-medium leading-2 text-black'>Business Owner</p>
                    <p className='capitalize dmSans-font text-[13px] font-bold leading-3.25 text-black'>{owner}</p>
                </div>
            </div>
        </div>
    )
}

export default ArrivalTile