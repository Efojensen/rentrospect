import HeroPicture from "@/components/HeroPicture";
import CategoryTile from "@/components/SectionTile";
import { categories } from "@/constants/categories";

export default function Home() {
    return (
        <main className='flex flex-col'>
            <div className='flex gap-5.25 mx-auto mb-4 md:mb-6'>
                {categories.map((category, index) => (
                    <CategoryTile
                        key={index}
                        label={category.label}
                        image={category.image}
                    />
                ))}
            </div>
            <HeroPicture/>
        </main>
    );
}
