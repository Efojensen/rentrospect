'use client'

import { useState } from 'react'
import type { VendorProfile, CatalogAsset, VendorLogistics, ReviewableAsset, AssetReview } from '@/types/profile'
import ProfileHeader from './ProfileHeader'
import ProfileTabs, { ProfileTab } from './ProfileTabs'
import CatalogGrid from './CatalogGrid'
import LogisticsPanel from './LogisticsPanel'
import ReviewsPanel from './ReviewsPanel'

interface ProfileClientProps {
    profile: VendorProfile
    catalog: CatalogAsset[]
    logistics: VendorLogistics | null
    reviewableAssets: ReviewableAsset[]
    initialReviews: AssetReview[]
}

const ProfileClient: React.FC<ProfileClientProps> = ({ profile, catalog, logistics, reviewableAssets, initialReviews }) => {
    const [tab, setTab] = useState<ProfileTab>('Catalog')

    return (
        <div className='flex flex-col w-full pb-16'>
            <ProfileHeader profile={profile} />
            <ProfileTabs active={tab} onChange={setTab} />

            <div className='mt-6'>
                {tab === 'Catalog' && <CatalogGrid assets={catalog} />}
                {tab === 'Logistics' && <LogisticsPanel logistics={logistics} />}
                {tab === 'Reviews' && (
                    <ReviewsPanel
                        reviewableAssets={reviewableAssets}
                        initialAssetId={reviewableAssets[0]?.assetId ?? null}
                        initialReviews={initialReviews}
                    />
                )}
            </div>
        </div>
    )
}

export default ProfileClient
