import Image from 'next/image'

export interface VendorAssetTileProps {
    title: string
    price: string
    remarks: string
    ratings: number
    location: string
    assetImage: string
    numReviews: number
    status: 'listed' | 'paused'
    type: 'business' | 'individual'
    howOld: 'brand new' | 'barely used' | 'standard' | 'fairly used' | 'damaged'
}

const VendorAssetTile: React.FC<VendorAssetTileProps> = ({ title, assetImage, howOld, remarks, type, location, ratings, numReviews, price, status }) => {
    const truncate = (text: string, maxLength: number) =>
        text?.length > maxLength
            ? `${text.slice(0, maxLength)}...`
            : text;
    return (
        <div className='flex flex-col p-4 bg-white rounded-4xl max-w-94 w-fit'>
            <div className="relative flex">
                <Image
                    width={355}
                    height={149}
                    src={assetImage}
                    alt="asset image"
                    className="mb-4 h-45 object-cover rounded-2xl"
                />

                <div
                    className={`absolute top-2 right-2 backdrop-blur-xs flex items-center rounded-full
                        px-3 py-1 capitalize tracking-[-0.24px] poppins-font text-[12px]
                        ${status === "listed"
                            ? "bg-[#45826180] text-[#6EE7B7]"
                            : "bg-[#99999980] text-[#32302B]"
                        }`}
                >
                    {status}
                </div>
            </div>
            <div className='flex flex-col gap-1.5'>
                <h5 className='text-sm font-semibold text-black line-clamp-1'>{title}</h5>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-1 p-2'>
                        <Image
                            width={16}
                            height={16}
                            alt='hourglass'
                            src='/svgs/hourglass.svg'
                        />
                        <p className='text-[.625rem] leading-4 capitalize inter-font line-clamp-1'>{truncate(howOld, 15)}</p>
                    </div>
                    <div className='flex gap-1 p-2'>
                        <Image
                            width={16}
                            height={16}
                            alt='clipboard'
                            src='/svgs/clipboard.svg'
                        />
                        <p className='text-[.625rem] leading-4 capitalize inter-font line-clamp-1'>{truncate(remarks, 13)}</p>
                    </div>
                    <div className='flex gap-1 p-2'>
                        <Image
                            width={16}
                            height={16}
                            alt='verification'
                            src='/svgs/id-card.svg'
                        />
                        <p className='text-[.625rem] leading-4 capitalize inter-font line-clamp-1'>{truncate(type, 13)}</p>
                    </div>
                    <div className='flex gap-1 p-2'>
                        <Image
                            width={16}
                            height={16}
                            alt='map point'
                            src='/svgs/map-point.svg'
                        />
                        <p className='text-[.625rem] leading-4 capitalize inter-font line-clamp-1'>{truncate(location, 14)}</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <Image
                    width={20}
                    height={20}
                    alt='rating'
                    src='/svgs/star.svg'
                    className='mr-1.5'
                />
                <p className='text-loginTextClr poppins-font text-[.75rem] mr-auto'>{ratings}&nbsp;({numReviews} Reviews)</p>
                <p className='poppins-font text-[1.25rem] font-bold text-black'>₵{price}</p>
            </div>
        </div>
    )
}

export default VendorAssetTile