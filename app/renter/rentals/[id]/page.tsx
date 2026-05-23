import Image from 'next/image'
import { rentals } from '@/constants/rentals'
import BottomSheet, { BottomSheetProps } from '@/components/BottomSheet'
import StatTile from '@/components/StatTile'

const AssetDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = Number((await params).id)
    const assetDetails: BottomSheetProps = rentals[id + 1]
    return (
        <main className='flex flex-col md:flex-row md:gap-3 items-center md:items-start'>
            <div className='flex flex-col gap-6'>
                <Image
                    width={430}
                    height={373}
                    alt='asset image'
                    src='/images/assets/speaker.png'
                />
                <div className='hidden md:flex gap-6 '>
                    <Image
                        height={103}
                        width={146.66}
                        alt='asset image'
                        src='/images/assets/speaker.png'
                    />
                    <Image
                        height={103}
                        width={146.66}
                        alt='asset image'
                        src='/images/assets/speaker.png'
                    />
                    <Image
                        height={103}
                        width={146.66}
                        alt='asset image'
                        src='/images/assets/speaker.png'
                    />
                </div>
            </div>
            <div className='hidden md:flex flex-col flex-1'>
                <div className='hidden md:flex flex-col bg-white pl-6 pr-3.5 py-6 flex-1 mb-4.5'>
                    <h4 className='montserrat-font text-[2rem] font-bold leading-12 tracking-[-0.06rem] mb-1.5'>{assetDetails.name}</h4>
                    <div className='flex mb-5 gap-2.5 items-center'>
                        {/* Rating stars */}
                        <p>{assetDetails.reviews} Reviews</p>
                        <div className='flex capitalize px-4 py-0.5 inter-font text-[#5C5F6A] border border-[#E6E7E8] rounded-[100px] text-[12px] font-medium leading-6'>IN STOCK</div>
                    </div>
                    <p className='dmSans-font text-[20px] leading-7.5 text-[#596780] mb-6'>{assetDetails.description}</p>
                    <div className='grid grid-cols-4 gap-y-4 gap-x-4 max-w-125 mb-11.5'>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] text-[#90A3BF]'>Category</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] font-semibold text-[#596780]'>Category</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] text-[#90A3BF]'>Weight</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] font-semibold text-[#596780]'>Category</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] text-[#90A3BF]'>Type</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] font-semibold text-[#596780]'>{assetDetails.category}</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] text-[#90A3BF]'>Location</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] font-semibold text-[#596780]'>Santasi</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[28px] font-bold dmSans-font text-[#1A202C]'>{assetDetails.price}</p>
                    </div>
                </div>
                {/* Owner details */}
                <div className='flex justify-between my-6.25 items-center bg-white py-6.25 px-7'>
                    <div className='flex gap-1.5 items-center'>
                        <Image
                            width={36}
                            height={36}
                            src={assetDetails.ownerSrc}
                            alt='business owner'
                            className='rounded-lg'
                        />

                        <div className='flex flex-col'>
                            <p className='capitalize dmSans-font text-[.5rem] font-medium leading-2 text-black'>Business Owner</p>
                            <p className='capitalize dmSans-font text-[.8125rem] font-bold leading-3.25 text-black'>{assetDetails.owner}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <div className='bg-nearWhiteBg p-2.5 rounded-lg flex cursor-pointer'>
                            <Image
                                width={16}
                                height={16}
                                alt='call_icon'
                                src='/svgs/auth/phone.svg'
                            />
                        </div>
                        <div className='bg-nearWhiteBg p-2.5 rounded-lg flex cursor-pointer'>
                            <Image
                                width={16}
                                height={16}
                                alt='messages_icon'
                                src='/svgs/messages.svg'
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col pt-8.25 px-6 bg-white mb-4'>
                    <h4 className='uppercase montserrat-font font-bold text-[16px] mb-6.25'>About vendor</h4>
                    <p className='text-otherSmallText inter-font text-[16px] leading-6.5 mb-7'>{assetDetails.about}</p>
                </div>
                {/* Stat Tiles */}
                <div className='flex bg-white px-6 gap-1.5 py-7'>
                    <StatTile
                        icon={'/svgs/verification_badge.svg'}
                        main={'Verified Vendor'}
                        desc={'Background checked by the Curator'}
                    />
                    <StatTile
                        icon={'/svgs/response_time.svg'}
                        main={'Fast Response'}
                        desc={'Usually replies within 30 minutes'}
                    />
                </div>
            </div>
            <BottomSheet
                progress={0}
                rate={assetDetails.rate}
                name={assetDetails.name}
                about={assetDetails.about}
                price={assetDetails.price}
                owner={assetDetails.owner}
                rating={assetDetails.rating}
                reviews={assetDetails.reviews}
                assetSrc={assetDetails.assetSrc}
                quantity={assetDetails.quantity}
                ownerSrc={assetDetails.ownerSrc}
                category={assetDetails.category}
                description={assetDetails.description}
            />
        </main>
    )
}

export default AssetDetails