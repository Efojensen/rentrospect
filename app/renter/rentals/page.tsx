import { rentals } from '@/constants/rentals'
import RentalTile from '@/components/RentalTile'

const page = () => {
    return (
        <main className='flex flex-col gap-4 md:gap-6 px-6 md:px-22'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 md:gap-y-6'>
                {rentals.map((rental, index) => (
                    <div key={index} className=''>
                        <RentalTile
                            id={rental.id}
                            uid={rental.uid}
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