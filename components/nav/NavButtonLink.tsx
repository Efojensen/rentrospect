import Link from 'next/link'
import Image from 'next/image'

interface NavButtonProps {
    alt: string
    href: string
    icon: string
    label: string
    active: boolean
}

const NavButtonLink:React.FC<NavButtonProps> = ({ alt, href, icon, label, active }) => {
    return (
        <Link
            href={href}
            className={`flex items-center transition duration-300 ease-out opacity-100 z-10 ${active ? 'px-[1.0313rem] py-3 bg-white rounded-[3rem] ease-in' : 'p-3 rounded-full bg-[#FFFFFF33] border-[#00000033]'}`}
        >
            <div className={`flex items-center gap-4.25`}>
                <Image
                    alt={alt}
                    src={icon}
                    width={24}
                    height={24}
                />
                <p className={`${!active && 'hidden'} dmSans-font text-loginTextClr text-[1rem] font-semibold leading-[1.1rem]`}>{label}</p>
            </div>
        </Link>
    )
}

export default NavButtonLink