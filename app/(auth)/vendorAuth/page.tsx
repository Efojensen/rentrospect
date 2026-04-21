'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import UploadFile from '@/components/UploadFile';
import { AuthInput } from '@/components/AuthInput';

const VendorPage = () => {
    const router = useRouter()
    const [businessBio, setBusinessBio] = useState('')
    const [businessName, setBusinessName] = useState('')

    function returnActivated(name: string, bio: string): boolean {
        if (name && bio) {
            return true
        } else {
            return false
        }
    }

    const navigateToNextPage =() => {
        router.push('/vendor/logistics')
    }

    return (
        <main className='flex flex-col lg:flex-row px-5 lg:pl-0 lg:items-center'>
            <div className='bg-nearWhiteBg lg:h-screen mb-26.5 sm:mb-14 w-screen lg:w-1/2 lg:-mt-16.25'>
                <Image
                    width={832}
                    height={832}
                    loading='eager'
                    alt="rentrospect"
                    src='/images/rentrospect.png'
                    className='w-auto lg:object-contain bg-nearWhiteBg flex my-auto lg:mt-17.5'
                />
            </div>
            <div className='flex flex-col md:mt-12 lg:mt-2.5 md:flex-1 lg:pl-20'>
                <h1 className='font-semibold leading-10.5 tracking-[-0.035rem] text-[1.75rem] montserrat-font mb-1 capitalize'>business identity</h1>
                <p className='text-smallGreyText text-[1rem] leading-6 tracking-[-0.015rem] mb-6'>Fill in with your details</p>

                <div className='flex flex-col gap-6 mb-30'>
                    <div className='flex flex-col gap-3'>
                        <UploadFile
                            label='upload cover photo'
                            icon='/svgs/auth/cover.svg'
                        />
                        <UploadFile
                            label='add logo'
                            icon='/svgs/auth/logo.svg'
                        />
                        <AuthInput
                            label='Business Name'
                            textValue={businessName}
                            onChange={setBusinessName}
                            hintText="Em's emporium"
                        />
                        <AuthInput
                            label='Business Bio'
                            textValue={businessBio}
                            onChange={setBusinessBio}
                            hintText='Tell your story'
                        />
                    </div>

                    <Button
                        label='complete'
                        onClick={navigateToNextPage}
                        activated={returnActivated(businessName, businessBio)}
                    />
                    <Link className='flex gap-2 mx-auto items-center cursor-pointer' href='/vendor'>
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

export default VendorPage