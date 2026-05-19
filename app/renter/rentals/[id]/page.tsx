import Image from 'next/image'
import BottomSheet from '@/components/BottomSheet'

const AssetDetails = () => {
    return (
        <main className='flex flex-col'>
            <Image
                width={430}
                height={373}
                alt='asset image'
                src='/images/assets/speaker.png'
            />
            <BottomSheet
                rate={0}
                about={'Premier luxury event rentals in Accra. We specialize in high-end marquee tents, authentic Kente-themed decor, and international standard banquet seating for your most prestigious occasions.'}
                owner={'Scylla Kwofie'}
                rating={4.2}
                reviews={20}
                ownerSrc={'/images/Avatar.png'}
                category={'Electronic'}
                description={'Lorem ipsum dolor sit amet consectetur. Tincidunt diam molestie iaculis curabitur elementum sit. Luctus turpis nunc nunc mauris.  '}
            />
        </main>
    )
}

export default AssetDetails