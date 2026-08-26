import { auth } from '@clerk/nextjs/server'
import ProfileClient from '@/components/profile/ProfileClient'
import {
    getAssetReviews,
    getVendorProfile,
    getVendorCatalog,
    getVendorLogistics,
    getVendorReviewableAssets,
} from '@/services/backend'
import type { VendorProfile, CatalogAsset, VendorLogistics, ReviewableAsset, AssetReview } from '@/types/profile'

const page = async () => {
    const { getToken } = await auth()
    const token = await getToken()

    let profile: VendorProfile | null = null
    let catalog: CatalogAsset[] = []
    let logistics: VendorLogistics | null = null
    let reviewableAssets: ReviewableAsset[] = []
    let initialReviews: AssetReview[] = []

    if (token) {
        try {
            [profile, catalog, logistics, reviewableAssets] = await Promise.all([
                getVendorProfile(token),
                getVendorCatalog(token),
                getVendorLogistics(token),
                getVendorReviewableAssets(token),
            ])

            if (reviewableAssets[0]) {
                initialReviews = await getAssetReviews(token, reviewableAssets[0].assetId)
            }
        } catch (error) {
            console.error('Failed to load profile:', error)
        }
    }

    if (!profile) {
        return (
            <main className='flex items-center justify-center py-24'>
                <p className='dmSans-font text-sm text-otherSmallText'>We couldn&apos;t load your profile.</p>
            </main>
        )
    }

    return (
        <main className='flex flex-col md:pb-4'>
            <ProfileClient
                profile={profile}
                catalog={catalog}
                logistics={logistics}
                reviewableAssets={reviewableAssets}
                initialReviews={initialReviews}
            />
        </main>
    )
}

export default page
