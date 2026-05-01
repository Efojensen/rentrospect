import CategoryTile from "@/components/SectionTile";
import { categories } from "@/constants/categories";

export default function Home() {
    return (
        <main className='flex flex-col'>
            <div className='flex gap-5.25 mx-auto'>
                {categories.map((category, index) => (
                    <CategoryTile
                        key={index}
                        label={category.label}
                        image={category.image}
                    />
                ))}
            </div>
        </main>
    );
}
