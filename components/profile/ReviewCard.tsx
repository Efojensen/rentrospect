'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { AssetReview } from '@/types/profile'

interface ReviewCardProps {
    review: AssetReview
    onReply: (reviewId: string, comment: string) => Promise<boolean>
}

const formatDate = (iso: string) => {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const StarRow: React.FC<{ rating: number }> = ({ rating }) => (
    <div className='flex items-center gap-0.5'>
        {Array.from({ length: 5 }).map((_, index) => (
            <Image
                key={index}
                width={14}
                height={14}
                alt='star'
                src={index < rating ? '/svgs/rating-star.svg' : '/svgs/rating-star-.svg'}
            />
        ))}
    </div>
)

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onReply }) => {
    const [showReplies, setShowReplies] = useState(false)
    const [replyDraft, setReplyDraft] = useState('')
    const [posting, setPosting] = useState(false)

    const handleSubmitReply = async () => {
        if (!replyDraft.trim()) return
        setPosting(true)
        const success = await onReply(review.reviewId, replyDraft.trim())
        setPosting(false)
        if (success) setReplyDraft('')
    }

    return (
        <div className='flex flex-col py-5 border-b border-[#F1F5F9] last:border-b-0'>
            <StarRow rating={review.rating} />
            <p className='dmSans-font text-sm text-otherSmallText leading-relaxed mt-2 mb-2'>{review.comment}</p>
            <p className='dmSans-font text-xs text-smallGreyText mb-3'>
                {review.author} &middot; Submitted {formatDate(review.submittedAt)}
            </p>

            {review.replies.length > 0 && (
                <button
                    type='button'
                    onClick={() => setShowReplies(!showReplies)}
                    className='dmSans-font text-xs font-semibold text-black mb-3 w-fit cursor-pointer'
                >
                    {showReplies ? 'Hide replies' : `${review.replies.length} ${review.replies.length === 1 ? 'Reply' : 'Replies'}`}
                </button>
            )}

            {showReplies && (
                <div className='flex flex-col gap-3 pl-4 border-l-2 border-[#F1F5F9] mb-3'>
                    {review.replies.map((reply) => (
                        <div key={reply.replyId} className='flex flex-col'>
                            <p className='dmSans-font text-sm text-otherSmallText leading-relaxed'>{reply.comment}</p>
                            <p className='dmSans-font text-xs text-smallGreyText mt-1'>
                                {reply.author} &middot; Submitted {formatDate(reply.submittedAt)}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <div className='flex items-center gap-2 mt-1'>
                <input
                    value={replyDraft}
                    onChange={(event) => setReplyDraft(event.target.value)}
                    placeholder='Reply...'
                    className='flex-1 dmSans-font text-sm bg-arrowBackground rounded-full px-4 py-2 outline-none'
                />
                <button
                    type='button'
                    onClick={handleSubmitReply}
                    disabled={posting || !replyDraft.trim()}
                    aria-label='send reply'
                    className='flex items-center justify-center size-9 rounded-full bg-arrowBackground disabled:opacity-40 cursor-pointer'
                >
                    <Image width={16} height={16} alt='send' src='/svgs/profile/send.svg' />
                </button>
            </div>
        </div>
    )
}

export default ReviewCard
