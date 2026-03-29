'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AuthInput } from '@/components/AuthInput';
import OvalStatusTile from '@/components/OvalStatusTile';
import { FilledButton, GrayedButton } from '@/components/Button';

const IDVerification = () => {
    const router = useRouter()

    const navigateToNextPage =() => {
        router.push('/verification/code')
    }

    const navigateToPreviousPage =() => {
        router.push('/verification/natId')
    }
    return (
        <main className='flex flex-col lg:flex-row px-5 lg:pl-0 lg:items-center'>
            <div className='bg-[#F6FAFD] lg:h-screen mb-26.5 sm:mb-14 w-screen lg:w-1/2 lg:pt-22.5'>
                <Image
                    width={832}
                    height={832}
                    alt="user's profile"
                    src='/images/example_profile.png'
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
                <OvalStatusTile label='verified' textColor='#026571' bgColor='#0265711A'/>

                <h2 className='font-semibold leading-10.5 tracking-[-0.035rem] text-[1.75rem] montserrat-font mb-1'>Is this you?</h2>
                <p className='text-smallGreyText text-[1rem] leading-6 tracking-[-0.015rem] mb-6'>Verify your identity to build trust with clients</p>

                <div className='flex flex-col gap-6 mb-30'>
                    <div className='flex flex-col gap-3'>
                        <AuthInput
                            label='Full Name'
                            hintText='+233'
                            icon='/svgs/auth/name.svg'
                            // TODO: Fill in hint text with values returned from national database
                        />
                        <AuthInput
                            label='Gender'
                            hintText='+233'
                            icon='/svgs/auth/name.svg'
                            // TODO: Fill in hint text with values returned from national database
                        />
                        <AuthInput
                            label='Date of Birth'
                            hintText='+233'
                            icon='/svgs/auth/calender.svg'
                            // TODO: Fill in hint text with values returned from national database
                        />
                    </div>

                    <div className='flex gap-2.5'>
                        <GrayedButton
                            label='no, take me back.'
                            onClick={navigateToPreviousPage}
                        />
                        <FilledButton
                            label="yes, i'm sure."
                            onClick={navigateToNextPage}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default IDVerification