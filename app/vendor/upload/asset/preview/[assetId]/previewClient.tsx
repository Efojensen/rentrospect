'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Accordion from '@/components/Accordion'
import { categoryMap, type LoneAsset } from '@/types/asset'
import { getAssetById, updateAsset, verifySession } from '@/services/backend'
import { readAssetDraft, saveAssetDraft } from '@/services/assetDraftStorage'

interface Props {
    assetId: string
}

// Backend condition values are snake_case IDs — turn them into something
// readable; the `capitalize` Tailwind class handles casing.
const formatCondition = (condition: string) => condition.replace(/_/g, ' ')

const PreviewClient = ({ assetId }: Props) => {
    const router = useRouter()
    const { getToken } = useAuth()

    const [asset, setAsset] = useState<LoneAsset | null>(null)
    const [loading, setLoading] = useState(true)
    const [tags, setTags] = useState('')
    const [availability, setAvailability] = useState<'available' | 'paused'>('paused')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        let cancelled = false

        getAssetById(assetId).then((fetched) => {
            if (!cancelled) {
                setAsset(fetched)
                setLoading(false)
            }
        })

        // The backend doesn't store tags, and getAsset doesn't return
        // availability — pull those from the local draft saved at submit
        // time, if this browser has one.
        const draft = readAssetDraft(assetId)
        if (draft) {
            setTags(draft.tags)
            setAvailability(draft.availability)
        }

        return () => {
            cancelled = true
        }
    }, [assetId])

    const handleSaveChanges = async () => {
        if (!asset) return

        try {
            setSaving(true)

            const token = await getToken()
            if (!token) throw new Error('Not signed in')

            // The update route expects the full asset payload every time,
            // not a partial patch — the same shape assets/upload takes.
            const session = await verifySession(token)

            await updateAsset(token, {
                assetId,
                vendor: Number(session.user_id),
                category: categoryMap[asset.category] ?? 0,
                name: asset.assetName,
                availability,
                description: asset.description,
                rate: asset.rate,
                pricingUnit: asset.pricingUnit,
                location: asset.location,
                condition: asset.condition,
                quantity: asset.quantity,
                primaryImage: 0,
            })

            const draft = readAssetDraft(assetId)
            if (draft) saveAssetDraft({ ...draft, availability })

            router.push('/vendor/upload')
        } catch (error) {
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    const handleEditPost = () => {
        router.push(`/vendor/upload/asset?assetId=${assetId}`)
    }

    if (loading) {
        return (
            <main className='flex items-center justify-center py-24'>
                <p className='dmSans-font text-sm text-otherSmallText'>Loading listing...</p>
            </main>
        )
    }

    if (!asset) {
        return (
            <main className='flex flex-col items-center justify-center gap-3 py-24 px-6 text-center'>
                <p className='dmSans-font text-lg font-semibold'>We couldn&apos;t load this listing.</p>
                <p className='text-sm text-otherSmallText'>It may not exist, or something went wrong fetching it.</p>
            </main>
        )
    }

    const primaryImage = asset.images.find((image) => image.isPrimary) ?? asset.images[0]
    const otherImages = asset.images.filter((image) => !image.isPrimary)

    return (
        <main className='flex flex-col md:flex-row md:gap-3 items-center md:items-start md:px-8 pb-14 md:pt-5 md:pb-28.5 bg-nearWhiteBg'>
            <div className='flex flex-col gap-6'>
                <Image
                    width={430}
                    height={373}
                    alt={asset.assetName}
                    src={primaryImage.imageUrl}
                    className='rounded-md'
                />
                {otherImages.length > 0 && (
                    <div className='flex gap-6'>
                        {otherImages.map((image, index) => (
                            <Image
                                key={index}
                                height={103}
                                width={146.66}
                                alt={`${asset.assetName} ${index + 2}`}
                                src={image.imageUrl}
                                className='rounded-md'
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex flex-col bg-white pl-6 pr-3.5 py-6 flex-1 mb-4.5'>
                    <h4 className='montserrat-font text-[2rem] font-bold leading-12 tracking-[-0.06rem] mb-1.5'>{asset.assetName}</h4>
                    <div className='flex mb-5 gap-2.5 items-center'>
                        <button
                            type='button'
                            onClick={() => setAvailability((current) => (current === 'available' ? 'paused' : 'available'))}
                            className={`flex capitalize px-4 py-0.5 inter-font rounded-[100px] text-[12px] font-medium leading-6 cursor-pointer ${availability === 'available'
                                ? 'bg-[#45826180] text-[#0F5132]'
                                : 'bg-[#99999980] text-[#32302B]'
                                }`}
                        >
                            {availability}
                        </button>
                    </div>
                    <p className='dmSans-font text-[20px] leading-7.5 text-[#596780] mb-6'>{asset.description}</p>
                    <div className='grid grid-cols-4 gap-y-4 gap-x-4 max-w-125 mb-11.5'>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] text-[#90A3BF]'>Category</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] font-semibold text-[#596780] capitalize'>{asset.category}</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] text-[#90A3BF]'>Quantity</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] font-semibold text-[#596780]'>{asset.quantity}</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] text-[#90A3BF]'>Condition</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] font-semibold text-[#596780] capitalize'>{formatCondition(asset.condition)}</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] text-[#90A3BF]'>Location</p>
                        <p className='plusJakartaSans-font text-[20px] leading-7.5 tracking-[-0.4px] font-semibold text-[#596780]'>{asset.location}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[28px] font-bold dmSans-font text-[#1A202C]'>
                            ₵{asset.rate}
                            <span className='text-base font-normal text-[#90A3BF]'>/{asset.pricingUnit}</span>
                        </p>
                    </div>
                </div>
                {/* Owner details */}
                <div className='flex justify-between my-6.25 items-center bg-white py-6.25 px-7'>
                    <div className='flex gap-1.5 items-center'>
                        <Image
                            width={36}
                            height={36}
                            src={asset.vendorSrc || '/images/Avatar.png'}
                            alt={asset.vendor}
                            className='rounded-lg'
                        />
                        <div className='flex flex-col'>
                            <p className='capitalize dmSans-font text-[.5rem] font-medium leading-2 text-black'>Business Owner</p>
                            <p className='capitalize dmSans-font text-[.8125rem] font-bold leading-3.25 text-black'>{asset.vendor}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col pt-8.25 px-6 bg-white mb-4'>
                    <h4 className='uppercase montserrat-font font-bold text-[16px] mb-6.25'>About vendor</h4>
                    <p className='text-otherSmallText inter-font text-[16px] leading-6.5 mb-7'>{asset.aboutVendor}</p>
                </div>
                {tags && (
                    <div className='flex flex-col gap-4 mt-4'>
                        <Accordion title='asset tags'>
                            <p className='dmSans-font text-sm text-[#596780]'>{tags}</p>
                        </Accordion>
                    </div>
                )}
                <div className='flex gap-15 items-center justify-end sticky mt-4'>
                    <button
                        onClick={handleEditPost}
                        className='cursor-pointer w-51 py-4 px-5 dmSans-font text-[1rem] font-semibold leading-6 text-loginTextClr bg-[#F2F4F8] hover:bg-[#E6EBF2] rounded-2xl'
                    >
                        Edit Post
                    </button>
                    <button
                        onClick={handleSaveChanges}
                        disabled={saving}
                        className='cursor-pointer w-51 py-4 px-5 dmSans-font text-[16px] font-semibold leading-6 text-white rounded-2xl bg-[#3E4E50] hover:bg-[#506668] disabled:opacity-60'
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default PreviewClient
