import Image from 'next/image'
import { rentals } from '@/constants/rentals'
import BottomSheet, { BottomSheetProps } from '@/components/BottomSheet'

const AssetDetails = async({ params }: { params: Promise<{ id: string }>}) => {
    const id = Number((await params).id)
    const assetDetails: BottomSheetProps = rentals[id + 1]
    return (
        <main className='flex flex-col items-center'>
            <Image
                width={430}
                height={373}
                alt='asset image'
                src='/images/assets/speaker.png'
                />
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