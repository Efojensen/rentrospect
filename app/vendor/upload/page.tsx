import { vendorAssets } from '@/constants/assets'
import VendorAssetTile from '@/components/vendor/VendorAssetTile'

const page = () => {
    return (
        <main className='flex flex-col md:px-15 h-full bg-nearWhiteBg'>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 overflow-x-auto no-scrollbar gap-y-6 whitespace-nowrap mt-3 md:mt-3.5'>
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
        </main>
    )
}

export default page