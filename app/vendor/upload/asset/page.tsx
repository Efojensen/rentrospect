'use client'

import { useState } from 'react'
import VendorInputField from '@/components/input/VendorInput'
import VendorSelectField from '@/components/input/VendorSelectField';
import { categoryOptions, conditions, pickupLocations } from '@/constants/category_options';
import VendorTextAreaField from '@/components/input/VendorTextArea';
import AssetImageUpload from '@/components/vendor/AssetImageUpload';

const VendorUploadPage = () => {
    const [asset, setAsset] = useState("");
    const [assetTags, setAssetTags] = useState("");
    const [dailyRate, setDailyRate] = useState("0.00")
    const [assetQuantity, setAssetQuantity] = useState("");
    const [assetCategory, setAssetCategory] = useState("");
    const [assetCondition, setAssetCondition] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [assetDescription, setAssetDescription] = useState("")
    return (
        <main className='flex flex-col md:flex-row gap-18.75 px-6 md:px-13.75 pb-6.5'>
            <div className='hidden md:flex flex-col flex-1 gap-2'>
                <p className="text-sm font-semibold leading-5 tracking-[-0.0088rem] dmSans-font">Asset Image</p>
                <AssetImageUpload/>
            </div>
            <div className='flex flex-col gap-4 w-full flex-1'>
                <VendorInputField
                    label='Asset Name'
                    value={asset}
                    onChange={setAsset}
                />
                <div className='flex flex-col my-3 md:hidden gap-2.5'>
                    <p className="text-sm font-semibold leading-5 tracking-[-0.0088rem] dmSans-font">Asset Image</p>
                    <AssetImageUpload/>
                </div>
                <VendorSelectField
                    label='Asset Category'
                    value={assetCategory}
                    options={categoryOptions}
                    onChange={setAssetCategory}
                />
                <VendorInputField
                    label='Asset Tags'
                    value={assetTags}
                    onChange={setAssetTags}
                />
                <VendorInputField
                    label='Asset Quantity'
                    value={assetQuantity}
                    onChange={setAssetQuantity}
                />
                <VendorSelectField
                    label='Pickup Location'
                    options={pickupLocations}
                    value={pickupLocation}
                    onChange={setPickupLocation}
                />
                <VendorInputField
                    label='Daily Rate (GH₵)'
                    value={dailyRate}
                    onChange={setDailyRate}
                />
                <VendorSelectField
                    label='Asset Condition'
                    options={conditions}
                    value={assetCondition}
                    onChange={setAssetCondition}
                />
                <VendorTextAreaField
                    label='Asset Description'
                    value={assetDescription}
                    onChange={setAssetDescription}
                />
                <div className='flex gap-5 items-center justify-end sticky'>
                    <button className='cursor-pointer w-51 py-4 px-5 dmSans-font text-[1rem] font-semibold leading-6 text-loginTextClr bg-[#F2F4F8] hover:bg-[#E6EBF2] rounded-2xl'>Cancel</button>
                    <button className='cursor-pointer w-51 py-4 px-5 dmSans-font text-[16px] font-semibold leading-6 text-white rounded-3xl bg-[#3E4E50] hover:bg-[#506668]'>Submit</button>
                </div>
            </div>
        </main>
    )
}

export default VendorUploadPage