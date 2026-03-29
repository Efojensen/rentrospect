'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Oval from '@/components/RequiredOval';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { AuthInput } from '@/components/AuthInput';

const NationalIdVerificationScreen = () => {
    const router = useRouter()
    const [nationalID, setNationalID] = useState('');

    function returnActivated(personalID: string): boolean {
        if (personalID.length > 14) {
            return true
        } else {
            return false
        }
    }

    const navigateToNextPage =() => {
        router.push('/verification/code')
    }
    return (
        <main className='flex flex-col lg:flex-row px-5 lg:pl-0 lg:items-center'>
            <div className='bg-[#F6FAFD] lg:h-screen mb-26.5 sm:mb-14 w-screen lg:w-1/2 lg:pt-22.5'>
                <Image
                    width={832}
                    height={832}
                    alt='rentrospect logo'
                    src='/images/rentrospect.png'
                    className='lg:object-contain bg-[#F6FAFD]'
                />
            </div>
            <div className='flex flex-col md:mt-12 md:flex-1 lg:pl-20'>
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
                <Oval/>

                <h2 className='font-semibold leading-10.5 tracking-[-0.035rem] text-[1.75rem] montserrat-font mb-1'>Verify your identity</h2>
                <p className='text-smallGreyText text-[1rem] leading-6 tracking-[-0.015rem] mb-6'>Verify your identity to build trust with clients</p>

                <div className='flex flex-col gap-6 mb-30'>
                    <div className='flex flex-col gap-3'>
                        <AuthInput
                            label='National ID'
                            textValue={nationalID}
                            onChange={setNationalID}
                            hintText='GHA-XXXXXXXXX-X'
                            icon='/svgs/auth/card.svg'
                        />
                    </div>

                    <Button
                        label='Take Selfie'
                        onClick={navigateToNextPage}
                        activated={returnActivated(nationalID)}
                    />

                    <Link className='flex gap-2 mx-auto items-center cursor-pointer' href='/verification/code'>
                        <label htmlFor='return-arrow' className='dmSans-font text-sm text-loginTextClr leading-[1.225rem] tracking-[-0.0131rem]'>Return</label>
                        <Image
                            width={20}
                            height={20}
                            id='return-arrow'
                            alt='return arrow'
                            src='/svgs/auth/return_arrow.svg'
                        />
                    </Link>

                </div>
            </div>
        </main>
    )
}

export default NationalIdVerificationScreen