import Image from 'next/image'

export interface CategoryOvalProps {
    src: string
    label: string
}

const CategoryOval: React.FC<CategoryOvalProps> = ({ src, label }) => {
    return (
        <div className='flex flex-col gap-5 items-center justify-center w-33'>
            <Image
                src={src}
                width={60}
                height={98}
                alt='asset categories'
                className='bg-arrowBackground rounded-full'
            />
            <p className='text-center dmSans-font text-[1rem] font-medium text-[#222] capitalize'>{label}</p>
        </div>
    )
}

export default CategoryOval