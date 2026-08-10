import Image from 'next/image';
import { Asset } from '@/types/asset';
import AssetTile from "@/components/AssetTile";
import HeroPicture from "@/components/HeroPicture";
import { arrivals } from "@/constants/otherAssets";
import ArrivalTile from "@/components/ArrivalTile";
import { categories } from "@/constants/categories";
import CategoryOval from '@/components/CategoryOval';
import CategoryTile from '@/components/CategoryTile';
import { ovalCategories } from '@/constants/oval_categories';
import ScrollSection from '@/components/ScrollSection';

async function getAssets(): Promise<Asset[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_MASTER}assets/getAssets`, {
            method: 'GET',
            cache: 'no-store', // fetch fresh data on every request; use next: { revalidate: N } instead if you want caching
        });

        if (!res.ok) {
            throw new Error('Failed to fetch assets');
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function Home() {
    const assets = await getAssets();

    return (
        <main className='flex flex-col gap-4 md:gap-6'>
            <div className='flex gap-3.25 md:gap-5.25 overflow-x-auto whitespace-nowrap mx-auto no-scrollbar w-full md:justify-center'>
                {categories.map((category) => (
                    <div key={category.id} className="shrink-0">
                        <CategoryTile
                            id={category.id}
                            label={category.label}
                            image={category.image}
                        />
                    </div>
                ))}
            </div>
            <HeroPicture />

            <ScrollSection title="Assets Nearby" scrollAmount={320}>
                {assets.map((asset, index) => (
                    <div key={index} className='shrink-0'>
                        <AssetTile
                            id={asset.id}
                            title={asset.name}
                            rate={asset.rate}
                            type={asset.category}
                            howOld={asset.condition}
                            location={asset.location}
                            pricingUnit={asset.pricingUnit}
                            assetImage={asset.primaryImage}
                        />
                    </div>
                ))}
            </ScrollSection>

            <ScrollSection title="new arrivals" scrollAmount={200}>
                {arrivals.map((arrival, index) => (
                    <div key={index} className='shrink-0'>
                        <ArrivalTile
                            src={arrival.src}
                            qty={arrival.qty}
                            owner={arrival.owner}
                            assetType={arrival.assetType}
                            profileImg='/images/Avatar.png'
                        />
                    </div>
                ))}
            </ScrollSection>

            <div className='flex justify-between items-center'>
                <h2 className='dmSans-font text-[1.25rem] font-medium capitalize text-sectionTitle p-2.5'>top selling categories</h2>
                <div className='flex gap-5'>
                    <div className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'>
                        <Image width={16} height={16} alt='left-arrow' src='/svgs/chevron_left.svg' className='size-3' />
                    </div>
                    <div className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'>
                        <Image width={16} height={16} alt='right-arrow' src='/svgs/chevron_right.svg' className='size-3' />
                    </div>
                </div>
            </div>
            <div className='flex overflow-x-auto whitespace-nowrap items-center gap-11.25 justify-center'>
                {ovalCategories.map((category, index) => (
                    <div key={index} className='shrink-0'>
                        <CategoryOval src={category.src} label={category.label} />
                    </div>
                ))}
            </div>
        </main>
    );
}