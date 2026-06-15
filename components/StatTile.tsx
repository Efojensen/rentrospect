import Image from 'next/image'

interface StatTileProps {
    icon: string
    main: string
    desc: string
}

const StatTile:React.FC<StatTileProps> = ({ icon, main, desc}) => {
    return (
        <div className='flex flex-col rounded-xl bg-[#F4F3F1] px-5 pb-4 flex-1'>
            <Image
                src={icon}
                alt={icon}
                width={16}
                height={20}
                className='mt-4.5 mb-2.5'
            />
            <h6 className='inter-font text-[.875rem] font-bold leading-5 text-[#1A1C1B]'>{main}</h6>
            <p className='inter-font text-[.75rem] leading-4 text-otherSmallText'>{desc}</p>
        </div>
    )
}

export default StatTile