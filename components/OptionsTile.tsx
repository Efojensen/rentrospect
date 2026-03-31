import Image from 'next/image'
import { useState } from 'react'
import ToggleSwitch from './ToggleSwitch'

interface OptionsTileProps {
    icon: string
    main: string
    subText: string
}

const OptionsTile:React.FC<OptionsTileProps> = ({ icon, main, subText }) => {
    const [isOn, setIsOn] = useState(false)
    return (
        <div className='flex p-6 self-stretch items-center rounded-2xl shadow-[0_.25rem_.5rem_-0.125rem_rgba(10,13,18,0.10),0_.125rem_.25rem_-0.125rem_rgba(10,13,18,0.06)] justify-between'>
            <div className='flex gap-4'>
                <Image
                    alt={icon}
                    width={20}
                    height={20}
                    src={icon}
                />
                <div className='flex flex-col w-43.25'>
                    <p className='montserrat-font text-[1rem font-semibold leading-[1.5rem]] text-[#1A1C1B] capitalize'>{main}</p>
                    <p className='dmSans-font text-sm leading-5 text-otherSmallText'>{subText}</p>
                </div>
            </div>
            <ToggleSwitch on={isOn} onToggle={setIsOn}/>
        </div>
    )
}

export default OptionsTile