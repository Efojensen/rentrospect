// Vendor's own profile/storefront page (/profile) — cover, bio, tags and
// top-line stats shown in the header above the Catalog/Logistics/Reviews tabs.
export interface VendorProfile {
    vendorId: string
    name: string
    handle: string
    verified: boolean
    bio: string
    coverPhoto: string
    profilePic: string
    businessLogo: string
    tags: string[] // e.g. ["Entrepreneur", "Earth"] — free-form interest/role badges
    website?: string
    rating: number
    numReviews: number
    location: string
    operatingHoursSummary: string // e.g. "8 hours" — short label, full breakdown lives in VendorLogistics
    successfulRentals: number
    dateJoined: string // ISO timestamp — parse with `new Date(date)` when displaying
}

// Catalog tab — thumbnail grid of the vendor's listed assets
export interface CatalogAsset {
    assetId: string
    name: string
    rate: number
    pricingUnit: string
    image: string
}

export interface OperatingHoursRow {
    day: string
    hours: string // e.g. "8:30 AM - 5:30 PM", or "Closed"
}

export interface MeetingSlot {
    label: string // e.g. "Morning", "Afternoon", "Evening"
    hours: string
}

// Logistics tab — business location and availability windows
export interface VendorLogistics {
    address: string
    operatingHours: OperatingHoursRow[]
    meetingSlots: MeetingSlot[]
}

// Reviews tab — asset picker row; selecting one loads that asset's reviews
export interface ReviewableAsset {
    assetId: string
    name: string
    rate: number
    pricingUnit: string
    image: string
}

export interface ReviewReply {
    replyId: string
    author: string
    authorPic?: string
    comment: string
    submittedAt: string // ISO timestamp
}

export interface AssetReview {
    reviewId: string
    assetId: string
    author: string
    authorPic?: string
    rating: number
    comment: string
    submittedAt: string // ISO timestamp
    replies: ReviewReply[]
}
