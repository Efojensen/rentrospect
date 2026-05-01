import Image from 'next/image'

const HeroPicture = () => {
    return (
        <div className='flex rounded-2xl relative h-31.25 md:h-100 isolate bg-linear-to-r from-[#B9EFFF] to-[#B9EFFFAA] pb-1.5'>
            <div className="absolute inset-0 -z-10 bg-[url('/svgs/designs.svg')] bg-cover bg-center"></div>
            <div className='flex flex-col z-3 my-auto ml-[1.17rem] md:ml-14.5'>
                <h3 className='montserrat-font text-5xl font-bold leading-15.5 text-[#1B1B1BE5] capitalize mb-2'>new furniture deals</h3>
                <p className='text-[#1B1B1BE5] text-[1rem] leading-6 dmSans-font mb-10'>Checkout the comfiest couch you&apos;ll ever experience.</p>
                <button className='rounded-[1.125rem] px-6 py-3 bg-white plusJakartaSans-font text-[1.25rem] font-bold leading-6.5 text-[#1B1B1BE5] w-33 md:w-53.5'>Explore Furniture</button>
            </div>
            <div className='flex flex-col-reverse ml-43.5'>
                <Image
                    width={658}
                    height={400}
                    src='/images/sofa.png'
                    alt='new item on sale'
                    className='absolute'
                />
                <div className='backdrop-blur-2xl absolute w-159.5 flex items-center ml-5 bg-linear-to-b from-[#000000] to-[#00000000]'>
                    <Image
                        width={56}
                        height={56}
                        alt='profile'
                        src='/images/pic.png'
                        className='border-4 rounded-full border-white hidden md:flex mr-3.75'
                    />
                    <div className='flex flex-col'>
                        <p className='capitalize dmSans-font text-[1rem] font-bold leading-5.25 text-white'>best bet company limited</p>
                        <p className='capitalize dmSans-font text-sm font-bold leading-4.5 text-white'>outdoor furniture</p>
                    </div>
                    <div className='ml-auto flex flex-col'>
                        <p className='capitalize dmSans-font text-right text-[1rem] font-bold leading-5.25 text-white'>new addition</p>
                        <p className='dmSans-font text-right text-[1rem] font-bold leading-5.25 text-white'>Joined since 2026</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroPicture