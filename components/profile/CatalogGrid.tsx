import Link from 'next/link'
import Image from 'next/image'
import type { CatalogAsset } from '@/types/profile'

interface CatalogGridProps {
    assets: CatalogAsset[]
}

const CatalogGrid: React.FC<CatalogGridProps> = ({ assets }) => {
    if (assets.length === 0) {
        return (
            <p className='dmSans-font text-sm text-smallGreyText py-10 text-center'>
                No assets listed yet.
            </p>
        )
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4'>
            {assets.map((asset) => (
                <Link
                    key={asset.assetId}
                    href={`/vendor/upload/asset/preview/${asset.assetId}`}
                    className='group relative flex flex-col aspect-square rounded-2xl overflow-hidden bg-arrowBackground'
                >
                    <Image
                        fill
                        alt={asset.name}
                        src={asset.image}
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                    <div className='absolute top-2 right-2 flex items-center justify-center size-7 rounded-full bg-white/85'>
                        <Image width={14} height={14} alt='options' src='/svgs/profile/kebab.svg' />
                    </div>
                    <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-3 py-3'>
                        <p className='dmSans-font text-white text-xs font-semibold line-clamp-1'>{asset.name}</p>
                        <p className='dmSans-font text-white/90 text-xs'>
                            ₵{asset.rate}/{asset.pricingUnit}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CatalogGrid
