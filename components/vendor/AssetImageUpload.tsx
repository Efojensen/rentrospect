'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

interface AssetImageUploadProps {
    onImagesChange?: (files: File[]) => void
}

export default function AssetImageUpload({
    onImagesChange,
}: AssetImageUploadProps) {
    const [images, setImages] = useState<string[]>([])
    const [files, setFiles] = useState<File[]>([])

    const inputRef = useRef<HTMLInputElement>(null)

    const handleUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles = Array.from(event.target.files || [])

        if (!selectedFiles.length) return

        const remainingSlots = 4 - files.length

        const acceptedFiles = selectedFiles.slice(
            0,
            remainingSlots
        )

        const newPreviews = acceptedFiles.map((file) =>
            URL.createObjectURL(file)
        )

        const updatedFiles = [...files, ...acceptedFiles]

        setFiles(updatedFiles)
        setImages((prev) => [...prev, ...newPreviews])

        onImagesChange?.(updatedFiles)

        event.target.value = ''
    }

    const openPicker = () => {
        inputRef.current?.click()
    }

    return (
        <div className='flex flex-col gap-4'>
            {/* Main Image */}
            <div className='w-117.5 h-100.25 rounded-4xl overflow-hidden border border-[#3e4e50]/40 bg-[#FFF]'>

                {images.length > 0 ? (
                    <Image
                        src={images[0]}
                        alt='Main asset image'
                        width={1000}
                        height={1000}
                        className='w-full h-full object-cover'
                    />
                ) : null}
            </div>

            {/* Additional Images */}
            <div className='flex gap-4 flex-wrap'>

                {images.slice(1).map((image, index) => (
                    <div
                        key={index}
                        className='w-21 h-21 rounded-2xl overflow-hidden border border-[#B8BEC5]'
                    >
                        <Image
                            src={image}
                            alt={`Asset image ${index + 2}`}
                            width={100}
                            height={100}
                            className='w-full h-full object-cover'
                        />
                    </div>
                ))}

                {/* Upload Button */}
                {images.length < 4 && (
                    <button
                        type='button'
                        onClick={openPicker}
                        className='
                            w-21
                            h-21
                            rounded-2xl
                            border-2
                            border-dashed
                            border-[#8C959F]
                            flex
                            items-center
                            cursor-pointer
                            justify-center
                            text-3xl
                            text-[#5B6773]
                            hover:bg-[#F4F6F8]
                            transition
                        '
                    >
                        +
                    </button>
                )}
            </div>

            <input
                ref={inputRef}
                type='file'
                accept='image/*'
                multiple
                onChange={handleUpload}
                className='hidden'
            />
        </div>
    )
}