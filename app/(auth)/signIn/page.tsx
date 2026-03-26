'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/Button';
import OAuthButton from '@/components/OAuthButton';
import { AuthInput, AuthPasswordInput } from '@/components/AuthInput';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function returnActivated(theEmail: string, thePwd: string): boolean {
        if (theEmail.length > 0 && thePwd.length > 7) {
            return true
        } else {
            return false
        }
    }
    return (
        <main className='flex flex-col lg:flex-row-reverse px-5'>
            <Image
                src='/images/rentrospect.png'
                alt='rentrospect logo'
                width={832}
                height={832}
                className='mb-26.5 sm:mb-14 lg:object-contain'
            />
            <div className='flex flex-col md:mt-12 md:px-25 lg:px-30'>
                <div className='flex h-12 gap-2 mb-6'>
                    <Image
                        src='/svgs/rentrospect.svg'
                        alt='alternate rentrospect'
                        height={48}
                        width={62.03}
                    />
                    <Image
                        src='/svgs/rentrospect_word.svg'
                        alt='rentrospect word'
                        width={157}
                        height={22}
                    />
                </div>

                <h2 className='font-semibold leading-10.5 tracking-[-0.035rem] text-[1.75rem] montserrat-font mb-1 capitalize'>Hi, welcome</h2>
                <p className='text-smallGreyText text-[1rem] leading-6 tracking-[-0.015rem] mb-6'>Please login to your account</p>

                <div className='flex flex-col gap-6 mb-30'>
                    <div className='flex flex-col gap-3'>
                        <AuthInput
                            label='Email'
                            textValue={email}
                            onChange={setEmail}
                            hintText='example@email.com'
                            icon='/svgs/auth/mail_box.svg'
                        />
                        <AuthPasswordInput
                            label='Password'
                            textValue={password}
                            onChange={setPassword}
                            hintText='Enter your password'
                            icon='/svgs/auth/password.svg'
                        />
                    </div>

                    <Button
                        label='login'
                        activated={returnActivated(email, password)}
                    />

                    <div className='flex items-center justify-between'>
                        <div className='flex gap-1 items-center'>
                            <input
                                type='checkbox'
                                value='true'
                                id='remember_me'
                            />
                            <label htmlFor='remember_me' className='dmSans-font text-sm text-smallGreyText leading-[1.225rem] tracking-[-0.0131rem]'>Remember me</label>
                        </div>
                        <Link href='/forgotPwd' className='text-sm leading-[19.6px] tracking-[-0.0131rem] underline text-smallGreyText dmSans-font'>Forgot password?</Link>
                    </div>

                    <div className='flex w-full items-center gap-3'>
                        <hr className='flex h-0.5 flex-1 text-disabledButton' />
                        <p className='dmSans-font text-sm leading-[1.225rem] tracking-[-0.0131rem] text-smallGreyText'>Or login with</p>
                        <hr className='flex h-0.5 flex-1 text-disabledButton' />
                    </div>

                    <div className='flex w-full gap-4'>
                        <OAuthButton
                            label='Sign in with Google'
                            icon='/svgs/auth/google.svg'
                        />
                        <OAuthButton
                            label='Sign in with Apple'
                            icon='/svgs/auth/apple.svg'
                        />
                    </div>

                    <p className='text-smallGreyText dmSans-font text-sm leading-[1.225rem] tracking-[-0.0131rem] mx-auto'>Don&apos;t have an account?&nbsp;&nbsp;<Link href='/signUp' className='font-medium underline text-loginTextClr'>Register</Link></p>

                </div>
            </div>
        </main>
    )
}

export default SignIn