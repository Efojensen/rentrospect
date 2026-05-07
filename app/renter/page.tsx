import { assets } from "@/constants/assets";
import AssetTile from "@/components/AssetTile";
import HeroPicture from "@/components/HeroPicture";
import { arrivals } from "@/constants/otherAssets";
import ArrivalTile from "@/components/ArrivalTile";
import CategoryTile from "@/components/SectionTile";
import { categories } from "@/constants/categories";

export default function Home() {
    return (
        <main className='flex flex-col'>
            <div className='flex gap-3.25 md:gap-5.25 overflow-x-auto whitespace-nowrap mx-auto mb-4 md:mb-6 scrollbar-hide w-full md:justify-center'>
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
            <div className='flex justify-between items-center'>
                <h2 className='dmSans-font text-[1.25rem] font-medium capitalize text-sectionTitle p-2.5'>Assets Nearby</h2>
            </div>
            <div className='flex mt-7.5 gap-5 overflow-x-auto scrollbar-hide whitespace-nowrap'>
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
            <div className='flex mt-7.5 gap-5 overflow-x-auto whitespace-nowrap'>
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
        </main>
    );
}
