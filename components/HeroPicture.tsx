import Image from 'next/image'

const HeroPicture = () => {
    return (
        <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#B9EFFF] to-[#B9EFFFAA] min-h-80 md:min-h-105 w-full mb-4 md:mb-6">
            <div className="absolute inset-0 bg-[url('/svgs/designs.svg')] bg-cover bg-center opacity-40" />

            {/* Main Content */}
            <div className="relative z-10 grid grid-cols-2 h-full">

                {/* Left Side */}
                <div className="flex flex-col justify-center px-6 md:px-14 py-10">

                    <h3 className="montserrat-font text-4xl md:text-6xl font-bold leading-tight text-[#1B1B1B] capitalize">
                        New Furniture Deals
                    </h3>

                    <p className="mt-4 text-sm md:text-lg text-[#1B1B1BE5] dmSans-font max-w-105">
                        Checkout the comfiest couch you&apos;ll ever experience.
                    </p>

                    <button className="mt-8 bg-white rounded-xl md:rounded-2xl px-6 py-3 w-fit text-sm md:text-xl font-bold text-[#1B1B1BE5] plusJakartaSans-font shadow-md">
                        Explore Furniture
                    </button>
                </div>

                {/* Right Side */}
                <div className="relative flex items-center justify-center">
                    <Image
                        width={700}
                        height={450}
                        src="/images/sofa.png"
                        alt="new item on sale"
                        className="w-full max-w-175 object-contain"
                    />

                    {/* Bottom Glass Card */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] md:w-[95%] backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-4">
                        <Image
                            width={56}
                            height={56}
                            alt="profile"
                            src="/images/pic.png"
                            className="rounded-full border-4 border-white"
                        />

                        <div>
                            <p className="text-white font-bold text-sm md:text-base dmSans-font">
                                Best Bet Company Limited.
                            </p>

                            <p className="text-white/90 text-xs md:text-sm dmSans-font">
                                Outdoor Furniture
                            </p>
                        </div>

                        <div className="ml-auto text-right hidden md:block">
                            <p className="text-white font-medium text-sm">
                                New Addition
                            </p>

                            <p className="text-white/90 text-sm">
                                Joined since 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroPicture