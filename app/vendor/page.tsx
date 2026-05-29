import Image from 'next/image'
import { vendorStats } from '@/constants/statTileData'
import VendorStatTile from '@/components/vendor/StatTile'
import { rentalRows } from '@/constants/rentalRows'
import StatusCircle from '@/components/vendor/StatusCircle'

const page = () => {
    return (
        <main className='flex flex-col md:pb-4'>
            <div className='flex gap-6.25 mb-10'>
                {vendorStats.map((stat, index) => (
                    <div className='shrink-0' key={index}>
                        <VendorStatTile
                            desc={stat.desc}
                            title={stat.title}
                            change={stat.change}
                            subText={stat.subText}
                            changeDirection={stat.changeDirection}
                        />
                    </div>
                ))}
            </div>
            <h3 className='inter-font text-[.9375rem] font-semibold leading-3.75 tracking-[-0.2992px] mb-2.25 md:mb-4'>My rentals</h3>
            <div className='flex flex-col w-full h-full bg-white rounded-[20px] shadow-[0_.5rem_1.5rem_0_rgba(69,69,80,0.1)] pt-8 pb-6 px-7'>
                <div className='flex justify-between items-center'>
                    <h6 className='text-[#1A1919] inter-font font-semibold leading-6'>Rental Status</h6>
                    <button className='flex items-center gap-2 mx-4 cursor-pointer'>
                        <Image
                            width={16}
                            height={16}
                            alt='filter icon'
                            src='/svgs/filter.svg'
                        />
                        <p className='text-[#525256] inter-font text-[16px] font-medium leading-6'>Filter</p>
                    </button>
                </div>
                <table className='w-full h-full'>
                    <thead>
                        <tr className='border-b border-neutral-400/50 text-left'>

                            <th className='px-6 py-4 text-sm font-medium text-[#6B7280]'>
                                ID
                            </th>

                            <th className='px-6 py-4 text-sm font-medium text-[#6B7280]'>
                                Quantity
                            </th>

                            <th className='px-6 py-4 text-sm font-medium text-[#6B7280]'>
                                Renter Name
                            </th>

                            <th className='px-6 py-4 text-sm font-medium text-[#6B7280]'>
                                Status
                            </th>

                            <th className='px-6 py-4 text-sm font-medium text-[#6B7280]'>
                                Earning
                            </th>

                            <th className='px-6 py-4' />
                        </tr>
                    </thead>
                    <tbody>
                        {rentalRows.map((row) => (
                            <tr
                                key={row.id}
                                className='border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition'
                            >

                                {/* ID */}
                                <td className='px-6 py-4 text-sm text-[#374151]'>
                                    {row.id}
                                </td>

                                {/* Quantity */}
                                <td className='px-6 py-4'>
                                    <div className='inline-flex items-center justify-center min-w-11 h-7 rounded-md bg-[#F3F4F6] text-sm text-[#374151]'>
                                        {row.quantity}
                                    </div>
                                </td>

                                {/* Renter */}
                                <td className='px-6 py-4'>
                                    <div className='flex items-center gap-3'>

                                        <Image
                                            src={row.renterAvatar}
                                            alt={row.renterName}
                                            width={28}
                                            height={28}
                                            className='rounded-full'
                                        />

                                        <span className='text-sm text-[#374151]'>
                                            {row.renterName}
                                        </span>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className='px-6 py-4'>
                                    <div className='flex items-center gap-2'>

                                        <div
                                            className={`
                                            size-3 rounded-full
                                            ${[row.status]}
                                        `}
                                        />

                                        <span className='text-sm text-[#6B7280]'>
                                            {
                                                row.status === 'Completed' && (
                                                    <div className='flex items-center gap-4'>
                                                        <StatusCircle color='#52C93F' />
                                                        Completed
                                                    </div>
                                                )
                                            }

                                            {
                                                row.status === 'Active' && (
                                                    <div className='flex items-center gap-4'>
                                                        <StatusCircle color='#1657FF' />
                                                        Active
                                                    </div>
                                                )
                                            }

                                            {
                                                row.status === 'Pending' && (
                                                    <div className='flex items-center gap-4'>
                                                        <StatusCircle color='#3E4E50' />
                                                        Pending
                                                    </div>
                                                )
                                            }
                                        </span>
                                    </div>
                                </td>

                                {/* Earnings */}
                                <td className='px-6 py-4 text-sm text-[#6B7280]'>
                                    ₵ {row.earning.toFixed(2)}
                                </td>

                                {/* Action */}
                                <td className='px-6 py-4'>
                                    <button className='bg-[#334155] hover:bg-[#1E293B] transition text-white text-sm px-4 py-2 rounded-lg cursor-pointer'>
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </main>
    )
}

export default page