import Link from 'next/link'
import Image from 'next/image'

export interface AssetTileProps {
    id: string
    title: string
    price: string
    remarks: string
    ratings: number
    location: string
    assetImage: string
    numReviews: number
    type: 'business' | 'individual'
    howOld: 'brand new' | 'barely used' | 'standard' | 'fairly used' | 'damaged'
}

const AssetTile:React.FC<AssetTileProps> = ({ title, assetImage, howOld, remarks, type, location, ratings, numReviews, price, id }) => {
    return (
        <Link
            href={`/renter/rentals/${id}`}
            className='flex flex-col p-4 bg-white rounded-4xl w-fit'
        >
            <Image
                width={355}
                height={149}
                src={assetImage}
                alt='asset image'
                className='mb-4 h-45 object-cover rounded-2xl'
            />
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
                        <p className='text-[.625rem] leading-4 capitalize inter-font line-clamp-1'>{howOld}</p>
                    </div>
                    <div className='flex gap-1 p-2'>
                        <Image
                            width={16}
                            height={16}
                            alt='clipboard'
                            src='/svgs/clipboard.svg'
                        />
                        <p className='text-[.625rem] leading-4 capitalize inter-font line-clamp-1'>{remarks}</p>
                    </div>
                    <div className='flex gap-1 p-2'>
                        <Image
                            width={16}
                            height={16}
                            alt='verification'
                            src='/svgs/id-card.svg'
                        />
                        <p className='text-[.625rem] leading-4 capitalize inter-font line-clamp-1'>{type}</p>
                    </div>
                    <div className='flex gap-1 p-2'>
                        <Image
                            width={16}
                            height={16}
                            alt='map point'
                            src='/svgs/map-point.svg'
                        />
                        <p className='text-[.625rem] leading-4 capitalize inter-font line-clamp-1'>{location}</p>
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
        </Link>
    )
}

export default AssetTile