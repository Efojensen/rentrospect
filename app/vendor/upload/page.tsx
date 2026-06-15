import { vendorAssets } from '@/constants/assets'
import VendorAssetTile from '@/components/vendor/VendorAssetTile'
import Link from 'next/link'

const page = () => {
    return (
        <main className='flex flex-col md:px-15 h-full bg-nearWhiteBg items-center'>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 overflow-x-auto no-scrollbar gap-x-3 md:gap-x-6 gap-y-6 whitespace-nowrap mt-3 md:mt-3.5'>
                {vendorAssets.map((asset, index) => (
                    <div key={index} className='shrink-0'>
                        <VendorAssetTile
                            type={asset.type}
                            title={asset.title}
                            price={asset.price}
                            status={asset.status}
                            howOld={asset.howOld}
                            remarks={asset.remarks}
                            ratings={asset.ratings}
                            location={asset.location}
                            assetImage={asset.assetImage}
                            numReviews={asset.numReviews}
                        />
                    </div>
                ))}
            </div>
            <Link
                href='/vendor/upload/asset'
                className='flex size-30 p-2.5 rounded-full shadow-[0_20px_24px_-4px_rgba(10,13,18,0.10),0_8px_8px_-4px_rgba(10,13,18,0.04)] items-center justify-center fixed bottom-5 right-5 bg-white'
            >
                <p className='text-[26.667px] text-[#3E4E50] stroke-[1.5px]'>+</p>
            </Link>
        </main>
    )
}

export default page