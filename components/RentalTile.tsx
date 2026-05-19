import Link from 'next/link'
import Image from 'next/image'
import ProgressBar from './ProgressBar'

export interface RentalTileProps {
    id?: string
    uid?: string
    name: string
    price: string
    assetSrc: string
    quantity: string
    progress: number
}

const RentalTile:React.FC<RentalTileProps> = ({ id, name, price, assetSrc, quantity, progress, uid }) => {
    return (
        <Link
            href={`/renter/rentals/${id}`}
            className='flex flex-col rounded-4xl w-95.5 h-59.5 py-[27.5008px] px-6 shadow-md bg-white'
        >
            <div className='flex gap-6.75 mb-4.25'>
                <Image
                    width={131}
                    height={112}
                    src={assetSrc}
                    alt='asset image'
                    className='object-cover rounded-[20px]'
                />
                <div className='flex flex-col'>
                    <p className='poppins-font text-[12px] text-black'>ID:&nbsp;<span className='font-semibold'>{uid}{id}</span></p>
                    <p className='poppins-font text-[12px] text-black'>Name:&nbsp;<span className='font-semibold'>{name}</span></p>
                    <p className='poppins-font text-[12px] text-black'>Quantity:&nbsp;<span className='font-semibold'>{quantity}</span></p>
                    <p className='poppins-font text-[12px] text-black'>Cost:&nbsp;<span className='font-semibold'>{price}</span></p>
                </div>
            </div>
            <ProgressBar
                total={100}
                progress={progress}
            />
            <div className='flex items-center'>
                <Image
                    height={17.5}
                    alt='calender'
                    width={17.917}
                    className='mr-1.5'
                    src='/svgs/auth/calender.svg'
                />
                <p className='poppins-font text-[.75rem] text-loginTextClr font-medium mr-auto'>Jan 20 - Mar 10, 2026</p>
                <Image
                    width={8}
                    height={8}
                    alt='chevron-right'
                    src='/svgs/chevron_right.svg'
                />
            </div>
        </Link>
    )
}

export default RentalTile