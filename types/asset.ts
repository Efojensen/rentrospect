export interface Asset {
    rate: number
    name: string
    vendor: number
    category: string
    location: string
    condition: string
    pricingUnit: string
    primaryImage: string
}

interface AssetImagesRes {
    imageUrl: string
    isPrimary: boolean
}

export interface LoneAsset {
    rate: number
    vendor: string
    location: string
    category: string
    condition: string
    assetName: string
    pricingUnit: string
    description: string
    images: AssetImagesRes[]
}

export interface HeroAsset {
    asset: string
    vendor: string
    dateJoined: Date
    category: string
    profilePic: string
    description: string
    primaryImage: string
}
