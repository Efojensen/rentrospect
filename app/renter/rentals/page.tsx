import { rentals } from '@/constants/rentals'
import RentalTile from '@/components/RentalTile'

const page = () => {
    return (
        <main className='flex flex-col px-6 md:px-0'>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {rentals.map((rental, index) => (
                    <div key={index}>
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