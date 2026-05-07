import Image from 'next/image';
import { assets } from "@/constants/assets";
import AssetTile from "@/components/AssetTile";
import HeroPicture from "@/components/HeroPicture";
import { arrivals } from "@/constants/otherAssets";
import ArrivalTile from "@/components/ArrivalTile";
import CategoryTile from "@/components/SectionTile";
import { categories } from "@/constants/categories";

export default function Home() {
    return (
        <main className='flex flex-col gap-4 md:gap-6'>
            <div className='flex gap-3.25 md:gap-5.25 overflow-x-auto whitespace-nowrap mx-auto scrollbar-hide w-full md:justify-center'>
                {categories.map((category, index) => (
                    <div key={index} className='shrink-0'>
                        <CategoryTile
                            label={category.label}
                            image={category.image}
                        />
                    </div>
                ))}
            </div>
            <HeroPicture />

            {/* For rendering the title and arrows for moving the scrollbar */}
            <div className='flex justify-between items-center'>
                <h2 className='dmSans-font text-[1.25rem] font-medium capitalize text-sectionTitle p-2.5'>Assets Nearby</h2>
                <div className='flex gap-5'>
                    <div className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'>
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            src='/svgs/chevron_left.svg'
                            className='size-3'
                            />
                    </div>
                    <div className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'>
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            className='size-3'
                            src='/svgs/chevron_right.svg'
                        />
                    </div>
                </div>
            </div>
            <div className='flex gap-5 overflow-x-auto scrollbar-hide whitespace-nowrap'>
                {assets.map((asset, index) => (
                    <div key={index} className='shrink-0'>
                        <AssetTile
                            type={asset.type}
                            title={asset.title}
                            price={asset.price}
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

            {/* For rendering the title and arrows for moving the scrollbar */}
            <div className='flex justify-between items-center'>
                <h2 className='dmSans-font text-[1.25rem] font-medium capitalize text-sectionTitle p-2.5'>new arrivals</h2>
                <div className='flex gap-5'>
                    <div className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'>
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            src='/svgs/chevron_left.svg'
                            className='size-3'
                            />
                    </div>
                    <div className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'>
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            className='size-3'
                            src='/svgs/chevron_right.svg'
                        />
                    </div>
                </div>
            </div>
            <div className='flex gap-5 overflow-x-auto whitespace-nowrap'>
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
            </div>
            {/* For rendering the title and arrows for moving the scrollbar */}
            <div className='flex justify-between items-center'>
                <h2 className='dmSans-font text-[1.25rem] font-medium capitalize text-sectionTitle p-2.5'>top selling categories</h2>
                <div className='flex gap-5'>
                    <div className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'>
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            src='/svgs/chevron_left.svg'
                            className='size-3'
                            />
                    </div>
                    <div className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'>
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            className='size-3'
                            src='/svgs/chevron_right.svg'
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
