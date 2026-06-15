'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/Button';
import { AuthInput } from '@/components/AuthInput';
import OptionsTile from '@/components/OptionsTile';
import TimePicker from '@/components/TimePicker';

const LogisticsAvailability = () => {
    const [endTime, setEndTime] = useState('17:00')
    const [startTime, setStartTime] = useState('08:00')
    const [businessLocation, setBusinessLocation] = useState('')

    function returnActivated(location: string): boolean {
        if (location) {
            return true
        } else {
            return false
        }
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
                <h1 className='font-semibold leading-10.5 tracking-[-0.035rem] text-[1.75rem] montserrat-font mb-1 capitalize'>logistics availability</h1>
                <p className='text-smallGreyText text-[1rem] leading-6 tracking-[-0.015rem] mb-6'>Fill in with your details</p>

                <div className='flex flex-col gap-6 mb-30'>
                    <div className='flex flex-col gap-3'>
                        <AuthInput
                            label='Business Location'
                            textValue={businessLocation}
                            onChange={setBusinessLocation}
                            icon='/svgs/auth/map_point.svg'
                            hintText='Comm 5 traffic light'
                        />
                        <p className='montserrat-font text-sm font-semibold leading-4.5 capitalize'>operating hours</p>
                        <div className="flex gap-3">
                            <TimePicker value={startTime} onChange={setStartTime} />
                            <TimePicker value={endTime} onChange={setEndTime} />
                        </div>
                        <OptionsTile
                            main='offer delivery'
                            icon='/svgs/auth/scooter.svg'
                            subText='Available for door-to-door rentals'
                        />
                        <OptionsTile
                            main='accept in-person meetups'
                            icon='/svgs/auth/hand_shake.svg'
                            subText='Clients can pick up items directly'
                        />
                        <OptionsTile
                            main='accept in-app calls'
                            icon='/svgs/auth/scooter.svg'
                            subText='Enable video calls for item inspection'
                        />
                    </div>

                    <Button
                        label='submit application'
                        activated={returnActivated(businessLocation)}
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

export default LogisticsAvailability