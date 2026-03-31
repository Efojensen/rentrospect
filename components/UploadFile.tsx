'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

interface UploadFileProps {
    icon: string
    label: string
    onFileSelect?: (file: File | null) => void
}

const UploadFile: React.FC<UploadFileProps> = ({ icon, label, onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null

        if (file) {
            // Create preview URL
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
            setFileName(file.name)
        } else {
            setPreviewUrl(null)
            setFileName(null)
        }

        onFileSelect?.(file)
    }

    return (
        <div
            className='flex flex-col rounded-xl bg-nearWhiteBg w-full items-center justify-center gap-2 h-47 cursor-pointer p-4'
            onClick={handleClick}
        >
            {previewUrl ? (
                <>
                    {/* Image Preview */}
                    <Image
                        width={280}
                        height={188}
                        alt="preview"
                        src={previewUrl}
                        className="h-24 w-24 object-cover rounded-md"
                    />

                    {/* File Name */}
                    <p className='text-xs text-gray-600 text-center break-all'>
                        {fileName}
                    </p>
                </>
            ) : (
                <>
                    <Image
                        src={icon}
                        width={25}
                        height={25}
                        className='w-auto'
                        alt='icon to upload photo'
                    />
                    <p className='dmSans-font text-sm uppercase leading-5 tracking-[.0437rem] font-semibold text-[#3F484A] text-center'>
                        {label}
                    </p>
                </>
            )}

            {/* Hidden input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
            />
        </div>
    )
}

export default UploadFile