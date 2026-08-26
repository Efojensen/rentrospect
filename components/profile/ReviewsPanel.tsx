'use client'

import Image from 'next/image'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import type { AssetReview, ReviewableAsset } from '@/types/profile'
import { getAssetReviews, postReviewReply } from '@/services/backend'
import ReviewCard from './ReviewCard'

interface ReviewsPanelProps {
    reviewableAssets: ReviewableAsset[]
    initialAssetId: string | null
    initialReviews: AssetReview[]
}

const ReviewsPanel: React.FC<ReviewsPanelProps> = ({ reviewableAssets, initialAssetId, initialReviews }) => {
    const { getToken } = useAuth()
    const [selectedAssetId, setSelectedAssetId] = useState<string | null>(initialAssetId)
    const [reviews, setReviews] = useState<AssetReview[]>(initialReviews)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!selectedAssetId || selectedAssetId === initialAssetId) return

        let cancelled = false
        setLoading(true)

        getToken().then(async (token) => {
            if (!token) return
            const fetched = await getAssetReviews(token, selectedAssetId)
            if (!cancelled) {
                setReviews(fetched)
                setLoading(false)
            }
        })

        return () => {
            cancelled = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAssetId])

    const handleReply = async (reviewId: string, comment: string): Promise<boolean> => {
        const token = await getToken()
        if (!token) return false

        const reply = await postReviewReply(token, reviewId, comment)
        if (!reply) return false

        setReviews((current) =>
            current.map((review) =>
                review.reviewId === reviewId
                    ? { ...review, replies: [...review.replies, reply] }
                    : review
            )
        )
        return true
    }

    if (reviewableAssets.length === 0) {
        return (
            <p className='dmSans-font text-sm text-smallGreyText py-10 text-center'>
                No reviewed assets yet.
            </p>
        )
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex gap-3 overflow-x-auto no-scrollbar'>
                {reviewableAssets.map((asset) => (
                    <button
                        key={asset.assetId}
                        type='button'
                        onClick={() => setSelectedAssetId(asset.assetId)}
                        className={`flex items-center gap-2.5 shrink-0 rounded-2xl p-2 pr-4 cursor-pointer border transition-colors ${
                            selectedAssetId === asset.assetId ? 'border-black bg-white' : 'border-transparent bg-arrowBackground'
                        }`}
                    >
                        <Image
                            width={44}
                            height={44}
                            alt={asset.name}
                            src={asset.image}
                            className='size-11 rounded-xl object-cover'
                        />
                        <div className='flex flex-col items-start'>
                            <p className='dmSans-font text-xs font-semibold text-black line-clamp-1'>{asset.name}</p>
                            <p className='dmSans-font text-xs text-smallGreyText'>
                                ₵{asset.rate}/{asset.pricingUnit}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            <div className='flex flex-col bg-white rounded-2xl px-5'>
                {loading ? (
                    <p className='dmSans-font text-sm text-smallGreyText py-10 text-center'>Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p className='dmSans-font text-sm text-smallGreyText py-10 text-center'>No reviews for this asset yet.</p>
                ) : (
                    reviews.map((review) => (
                        <ReviewCard key={review.reviewId} review={review} onReply={handleReply} />
                    ))
                )}
            </div>
        </div>
    )
}

export default ReviewsPanel
