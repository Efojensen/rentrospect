import { assets } from "@/constants/assets";
import AssetTile from "@/components/AssetTile";
import HeroPicture from "@/components/HeroPicture";
import CategoryTile from "@/components/SectionTile";
import { categories } from "@/constants/categories";

export default function Home() {
    return (
        <main className='flex flex-col'>
            <div className='flex gap-3.25 md:gap-5.25 overflow-x-auto whitespace-nowrap mx-auto mb-4 md:mb-6 snap-x snap-mandatory'>
                {categories.map((category, index) => (
                    <CategoryTile
                        key={index}
                        label={category.label}
                        image={category.image}
                    />
                ))}
            </div>
            <HeroPicture/>
            <div className='flex mt-7.5 gap-5'>
                {assets.map((asset, index) => (
                    <AssetTile
                        key={index}
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
                ))}
            </div>
        </main>
    );
}
