'use client'

import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const AccountType = () => {
    const [accountType, setAccountType] = useState<'renter' | 'vendor' | null>(null)

    const router = useRouter()

    const activated = accountType !== null

    const handleAccountType = () => {
        if (activated) {
                router.push('/vendorAuth')
        }
    }
    return (
        <main className='flex flex-col lg:flex-row-reverse px-5 pb-8 items-center'>
            <Image
                width={832}
                height={832}
                alt='rentrospect logo'
                src='/images/rentrospect.png'
                className='mb-26.5 sm:mb-14 lg:object-contain'
            />
            <div className='flex flex-col md:mt-12 md:px-25 flex-1'>
                <div className='flex h-12 gap-2 mb-6'>
                    <Image
                        height={48}
                        width={62.03}
                        src='/svgs/rentrospect.svg'
                        alt='alternate rentrospect'
                    />
                    <Image
                        width={157}
                        height={22}
                        alt='rentrospect word'
                        src='/svgs/rentrospect_word.svg'
                    />
                </div>

                <h2 className='font-semibold leading-10.5 tracking-[-0.035rem] text-[1.75rem] montserrat-font mb-1 capitalize'>Select account type</h2>
                <p className='text-smallGreyText text-[1rem] leading-6 tracking-[-0.015rem] mb-6'>Choose the account type that best fits your needs.</p>

                <div className='flex justify-center gap-8 my-9'>
                    <div
                        onClick={() => setAccountType('renter')}
                        className={`flex flex-col items-center justify-center gap-2 size-[160px] rounded-full shadow-[0_12px_16px_-4px_rgba(10,13,18,0.10),0_4px_6px_-2px_rgba(10,13,18,0.05)] border-2 cursor-pointer transition
                            ${accountType === 'renter'
                                ? 'border-[#026571] bg-disabledBtnText'
                                : 'border-gray-200'
                            }`}
                    >
                        <Image
                            width={48}
                            height={48}
                            alt='renter-profile'
                            src='/svgs/renter-profile.svg'
                        />
                        <p className='text-[#5A5350] text-center montserrat-font text-[15px] leading-5 tracking-[-0.4px]'>Renter</p>
                    </div>
                    <div
                        onClick={() => setAccountType('vendor')}
                        className={`flex flex-col items-center justify-center gap-2 size-[160px] rounded-full shadow-[0_12px_16px_-4px_rgba(10,13,18,0.10),0_4px_6px_-2px_rgba(10,13,18,0.05)] border-2 cursor-pointer transition
                            ${accountType === 'vendor'
                                ? 'border-[#026571] bg-disabledBtnText'
                                : 'border-gray-200'
                            }`}
                    >
                        <Image
                            width={48}
                            height={48}
                            alt='renter-profile'
                            src='/svgs/vendor-profile.svg'
                        />
                        <p className='text-[#5A5350] text-center montserrat-font text-[15px] leading-5 tracking-[-0.4px]'>Vendor</p>
                    </div>
                </div>

                <Button
                    label='continue'
                    activated={activated}
                    onClick={handleAccountType}
                />
            </div>
        </main>
    )
}

export default AccountType