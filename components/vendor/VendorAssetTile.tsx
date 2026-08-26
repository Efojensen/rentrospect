import Link from 'next/link'
import Image from 'next/image'

export interface VendorAssetTileProps {
    assetId: string
    title: string
    price: number
    pricingUnit: string
    category: string
    location: string
    quantity: number
    assetImage: string
    howOld: string
    status: 'available' | 'paused'
}

const formatCondition = (condition: string) => condition.replace(/_/g, ' ')

const VendorAssetTile: React.FC<VendorAssetTileProps> = ({ assetId, title, assetImage, howOld, category, location, quantity, price, pricingUnit, status }) => {
    const truncate = (text: string, maxLength: number) =>
        text?.length > maxLength
            ? `${text.slice(0, maxLength)}...`
            : text;
    return (
        <Link
            href={`/vendor/upload/asset/preview/${assetId}`}
            className='flex flex-col p-4 bg-white rounded-4xl max-w-94 w-fit'>
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
                        ${status === "available"
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
                        <p className='text-[.625rem] leading-4 capitalize inter-font line-clamp-1'>{truncate(formatCondition(howOld), 15)}</p>
                    </div>
                    <div className='flex gap-1 p-2'>
                        <Image
                            width={16}
                            height={16}
                            alt='clipboard'
                            src='/svgs/clipboard.svg'
                        />
                        <p className='text-[.625rem] leading-4 capitalize inter-font line-clamp-1'>{truncate(category, 13)}</p>
                    </div>
                    <div className='flex gap-1 p-2'>
                        <Image
                            width={16}
                            height={16}
                            alt='quantity'
                            src='/svgs/id-card.svg'
                        />
                        <p className='text-[.625rem] leading-4 inter-font line-clamp-1'>Qty: {quantity}</p>
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
            <div className='flex items-center justify-end'>
                <p className='poppins-font text-[1.25rem] font-bold text-black'>
                    ₵{price}
                    <span className='text-xs font-normal text-loginTextClr'>/{pricingUnit}</span>
                </p>
            </div>
        </Link>
    )
}

export default VendorAssetTile
