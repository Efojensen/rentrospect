import RentalTile from '@/components/RentalTile'
import { rentals } from '@/constants/rentals'
import React from 'react'

const page = () => {
    return (
        <main className='flex flex-col gap-4 md:gap-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 md:gap-y-6 md:gap-x-5'>
                {rentals.map((rental, index) => (
                    <div key={index} className='shrink-0'>
                        <RentalTile
                            id={rental.id}
                            name={rental.name}
                            price={rental.price}
                            progress={rental.progress}
                            assetSrc={rental.assetSrc}
                            quantity={rental.quantity}
                        />
                    </div>
                ))}
            </div>
        </main>
    )
}

export default page