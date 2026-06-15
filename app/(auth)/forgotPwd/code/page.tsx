'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { AuthInput } from '@/components/AuthInput';

const CodeForPwd = () => {
    const router = useRouter()
    const params = useSearchParams()
    const [code, setCode] = useState('');
    const hashedMail = params.get('hashedMail')

    function returnActivated(theCode: string): boolean {
        if (theCode.length > 7) {
            return true
        } else {
            return false
        }
    }

    const navigateToNextPage =() => {
        router.push('/forgotPwd/reset')
    }
    return (
        <main className='flex flex-col lg:flex-row-reverse px-5'>
            <Image
                width={832}
                height={832}
                alt='rentrospect logo'
                src='/images/rentrospect.png'
                className='mb-26.5 sm:mb-14 lg:object-contain'
            />
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

                <h2 className='font-semibold leading-10.5 tracking-[-0.035rem] text-[1.75rem] montserrat-font mb-1 capitalize'>code verification</h2>
                <p className='text-smallGreyText text-[1rem] leading-6 tracking-[-0.015rem] mb-6'>We&apos;ve sent a code to {hashedMail}</p>

                <div className='flex flex-col gap-6 mb-30'>
                    <div className='flex flex-col gap-3'>
                        <AuthInput
                            label='Code'
                            textValue={code}
                            onChange={setCode}
                            hintText='2358hdgy'
                            icon='/svgs/auth/code.svg'
                        />
                    </div>

                    <Button
                        label='Continue'
                        onClick={navigateToNextPage}
                        activated={returnActivated(code)}
                    />

                    <Link className='flex gap-2 mx-auto items-center cursor-pointer' href='/forgotPwd'>
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

export default CodeForPwd