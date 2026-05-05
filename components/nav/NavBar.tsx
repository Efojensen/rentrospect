import Image from 'next/image'
import NavButtonLink from './NavButtonLink'

const NavBar = ({location}: {location: string}) => {
    return (
        <nav className='flex justify-between my-6'>
            <div className='flex gap-1 items-center'>
                <Image
                    height={48}
                    width={62.03}
                    alt='rentrospect logo'
                    src='/svgs/rentrospect.svg'
                />
                <Image
                    width={44}
                    height={44}
                    alt='location svg'
                    src='/svgs/location.svg'
                    className='p-3'
                />
                <div className='flex flex-col'>
                    <p className='text-[#808493] dmSans-font text-[12px] leading-5.5'>Your location</p>
                    <p className='text-black dmSans-font text-sm'>{location}</p>
                </div>
            </div>
            <div className='hidden md:flex p-2 gap-4 bg-[#00000033] z-2 rounded-[2.5rem]'>
                <NavButtonLink
                    href='/'
                    active={true}
                    alt='home icon'
                    label='Dashboard'
                    icon='/svgs/nav/home.svg'
                />
                <NavButtonLink
                    href='/assets'
                    active={false}
                    label='Assets'
                    alt='folder icon'
                    icon='/svgs/nav/folder.svg'
                />
                <NavButtonLink
                    href='/wallet'
                    active={false}
                    label='Wallet'
                    alt='wallet icon'
                    icon='/svgs/nav/wallet.svg'
                />
                <NavButtonLink
                    active={false}
                    href='/messages'
                    label='Messages'
                    alt='messages icon'
                    icon='/svgs/nav/messages.svg'
                />
                <NavButtonLink
                    active={false}
                    href='/profile'
                    alt='user icon'
                    label='Profile'
                    icon='/svgs/nav/user.svg'
                />
            </div>
            <div className='flex gap-4 items-center'>
                <Image
                    width={20}
                    height={20}
                    alt='search icon'
                    src='/svgs/search.svg'
                    className='hidden md:flex'
                />
                <Image
                    width={20}
                    height={20}
                    alt='bell icon'
                    src='/svgs/bell.svg'
                />
                <Image
                    width={20}
                    height={20}
                    alt='heart icon'
                    src='/svgs/heart.svg'
                />
                <Image
                    width={48}
                    height={48}
                    alt='demo'
                    src='/images/demo.png'
                />
            </div>
        </nav>
    )
}

export default NavBar