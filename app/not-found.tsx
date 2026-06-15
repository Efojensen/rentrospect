import Image from 'next/image';

export default function NotFound() {
    return (
        <main className='flex items-center my-auto'>
            <Image
                height={900}
                width={1440}
                alt='not found picture'
                src='/svgs/not-found.svg'
                className='h-full w-full bg-nearWhiteBg'
            />
        </main>
    )
}