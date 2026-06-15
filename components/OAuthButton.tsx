import Image from "next/image"

const OAuthButton = ({label, icon}: {label: string, icon: string}) => {
    return (
        <button className='flex flex-1 h-12 items-center gap-3 px-4 py-3 shadow-sm border border-disabledButton cursor-pointer bg-oAuthBackground hover:bg-gray-200'>
            <Image
                src={icon}
                alt={icon}
                width={24}
                height={24}
            />
            <p className='text-[1rem] font-medium leading-[1.55rem] plusJakartaSans-font'>{label}</p>
        </button>
    )
}

export default OAuthButton