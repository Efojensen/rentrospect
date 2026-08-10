'use client'

import Image from 'next/image';
import { useEffect } from 'react';
import { Asset } from '@/types/asset';
import { useRef, useState } from 'react';
import AssetTile from "@/components/AssetTile";
import LoadingDialog from '../booking/loading';
import HeroPicture from "@/components/HeroPicture";
import { arrivals } from "@/constants/otherAssets";
import ArrivalTile from "@/components/ArrivalTile";
import { categories } from "@/constants/categories";
import CategoryOval from '@/components/CategoryOval';
import CategoryTile from '@/components/CategoryTile';
import { ovalCategories } from '@/constants/oval_categories';

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [assets, setAssets] = useState<Asset[]>([])
    const [categoryId, setCategoryId] = useState<string | null>(null)

    const fetchAssets = async () => {
        try {
            setLoading(true)

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}assets/getAssets`, {
                    method: 'GET'
                }
            )

            if (!res.ok) {
                throw new Error('Failed to fetch assets')
            }

            const data: Asset[] = await res.json()
            setAssets(data)
        } catch (error) {
            console.error(error)
            setAssets([])
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchAssets()
    }, [])

    const premierScrollRef = useRef<HTMLDivElement | null>(null)
    const secondthScrollRef = useRef<HTMLDivElement | null>(null)

    const premierScrollAmount = 320
    const secondthScrollAmount = 200

    const premierScrollLeft = () => {
        premierScrollRef.current?.scrollBy({
            left: -premierScrollAmount,
            behavior: 'smooth'
        })
    }

    const premierScrollRight = () => {
        premierScrollRef.current?.scrollBy({
            left: premierScrollAmount,
            behavior: 'smooth'
        })
    }

    const secondthScrollLeft = () => {
        secondthScrollRef.current?.scrollBy({
            left: -secondthScrollAmount,
            behavior: 'smooth'
        })
    }

    const secondthScrollRight = () => {
        secondthScrollRef.current?.scrollBy({
            left: secondthScrollAmount,
            behavior: 'smooth'
        })
    }

    return (
        <main className='flex flex-col gap-4 md:gap-6'>
            <div className='flex gap-3.25 md:gap-5.25 overflow-x-auto whitespace-nowrap mx-auto no-scrollbar w-full md:justify-center'>
                {categories.map((category) => (
                    <div key={category.id} className="shrink-0">
                        <CategoryTile
                            id={category.id}
                            label={category.label}
                            image={category.image}
                            onClick={() => setCategoryId(category.id)}
                        />
                    </div>
                ))}
            </div>
            <HeroPicture />

            {/* For rendering the title and arrows for moving the scrollbar */}
            <div className='flex justify-between items-center'>
                <h2 className='dmSans-font text-[1.25rem] font-medium capitalize text-sectionTitle p-2.5'>Assets Nearby</h2>
                <div className='flex gap-5'>
                    <button
                        onClick={premierScrollLeft}
                        className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center cursor-pointer'
                    >
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            src='/svgs/chevron_left.svg'
                            className='size-3'
                        />
                    </button>
                    <button
                        onClick={premierScrollRight}
                        className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center cursor-pointer'
                    >
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            className='size-3'
                            src='/svgs/chevron_right.svg'
                        />
                    </button>
                </div>
            </div>
            <div
                ref={premierScrollRef}
                className='flex gap-5 overflow-x-auto no-scrollbar whitespace-nowrap'
            >
                {loading ? <LoadingDialog open={loading} message='Loading assets' />
                    :
                    assets.map((asset, index) => (
                        <div key={index} className='shrink-0'>
                            <AssetTile
                                id={asset.id}
                                title={asset.name}
                                rate={asset.rate}
                                type={asset.category}
                                // remarks={asset.remarks}
                                // ratings={asset.ratings}
                                howOld={asset.condition}
                                location={asset.location}
                                // numReviews={asset.numReviews}
                                pricingUnit={asset.pricingUnit}
                                assetImage={asset.primaryImage}
                            />
                        </div>
                    ))
                }
            </div>

            {/* For rendering the title and arrows for moving the scrollbar */}
            <div className='flex justify-between items-center'>
                <h2 className='dmSans-font text-[1.25rem] font-medium capitalize text-sectionTitle p-2.5'>new arrivals</h2>
                <div className='flex gap-5'>
                    <button
                        onClick={secondthScrollLeft}
                        className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'
                    >
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            src='/svgs/chevron_left.svg'
                            className='size-3'
                        />
                    </button>
                    <button
                        onClick={secondthScrollRight}
                        className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'
                    >
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            className='size-3'
                            src='/svgs/chevron_right.svg'
                        />
                    </button>
                </div>
            </div>
            <div ref={secondthScrollRef} className='flex gap-5 overflow-x-auto whitespace-nowrap'>
                {arrivals.map((arrival, index) => (
                    <div key={index} className='shrink-0'>
                        <ArrivalTile
                            src={arrival.src}
                            qty={arrival.qty}
                            owner={arrival.owner}
                            assetType={arrival.assetType}
                            profileImg='/images/Avatar.png'
                        />
                    </div>
                ))}
            </div>
            {/* For rendering the title and arrows for moving the scrollbar */}
            <div className='flex justify-between items-center'>
                <h2 className='dmSans-font text-[1.25rem] font-medium capitalize text-sectionTitle p-2.5'>top selling categories</h2>
                <div className='flex gap-5'>
                    <div className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'>
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            src='/svgs/chevron_left.svg'
                            className='size-3'
                        />
                    </div>
                    <div className='flex size-10 bg-arrowBackground rounded-xl items-center justify-center'>
                        <Image
                            width={16}
                            height={16}
                            alt='left-arrow'
                            className='size-3'
                            src='/svgs/chevron_right.svg'
                        />
                    </div>
                </div>
            </div>
            <div className='flex overflow-x-auto whitespace-nowrap items-center gap-11.25 justify-center'>
                {ovalCategories.map((category, index) => (
                    <div key={index} className='shrink-0'>
                        <CategoryOval
                            src={category.src}
                            label={category.label}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}

// useEffect(() => {
//     const fetchAssets = async () => {
//         try {
//             setLoading(true)

//             const headers: HeadersInit = {}

//             if (categoryId) {
//                 headers['categoryId'] = categoryId
//             }

//             const res = await fetch(
//                 `${process.env.API_URL}/assets/getCategory`,
//                 {
//                     method: 'GET',
//                     headers,
//                 }
//             )

//             if (!res.ok) {
//                 throw new Error('Failed to fetch assets')
//             }

//             const data: Asset[] = await res.json()
//             setAssets(data)
//         } catch (error) {
//             console.error(error)
//             setAssets([])
//         } finally {
//             setLoading(false)
//         }
//     }

//     fetchAssets()
// }, [categoryId])