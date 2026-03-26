'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/Button';
import { AuthPasswordInput, AuthPasswordInput2 } from '@/components/AuthInput';

const ResetPwd = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function returnActivated(password_1: string, password_2: string): boolean {
        if (password_1.length > 7 && password_1 === password_2) {
            return true
        } else {
            return false
        }
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

                <h2 className='font-semibold leading-10.5 tracking-[-0.035rem] text-[1.75rem] montserrat-font mb-1 capitalize'>reset password</h2>
                <p className='text-smallGreyText text-[1rem] leading-6 tracking-[-0.015rem] mb-6'>Type in your new password</p>

                <div className='flex flex-col gap-6 mb-30'>
                    <div className='flex flex-col gap-3'>
                        <AuthPasswordInput
                            label='Password'
                            textValue={password}
                            onChange={setPassword}
                            hintText='Enter your password'
                            icon='/svgs/auth/password.svg'
                        />
                        <AuthPasswordInput2
                            textValue={confirmPassword}
                            label='Confirm New Password'
                            onChange={setConfirmPassword}
                            hintText='Enter your password'
                            icon='/svgs/auth/password.svg'
                        />
                    </div>

                    <Button
                        label='Finish'
                        activated={returnActivated(password, confirmPassword)}
                    />

                    <Link className='flex gap-2 mx-auto items-center cursor-pointer' href='/forgotPwd/code'>
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

export default ResetPwd