import Image from 'next/image'

export interface CategoryTileProps {
    id: string
    image: string
    label: string
    onClick?: () => void
}

const CategoryTile:React.FC<CategoryTileProps> = ({ image, label, onClick }) => {
    return (
        <div
            onClick={onClick}
            className='flex gap-1 items-center min-h-15 p-2 cursor-pointer'
        >
            <Image
                alt={label}
                width={44}
                height={44}
                src={image}
            />
            <p className='dmSans-font tracking-[-0.0192rem] leading-[1.0557rem] text-[.971rem] capitalize'>{label}</p>
        </div>
    )
}

export default CategoryTile