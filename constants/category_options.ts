import { CategoryId } from "@/types/asset"
import { Option } from "@/components/input/VendorSelectField"

export const categoryOptions: Option[] = [
    {
        label: 'Tools & Equipment',
        value: CategoryId.ToolsAndEquipment
    },
    {
        label: 'Furniture',
        value: CategoryId.Furniture
    },
    {
        label: 'Power',
        value: CategoryId.Power
    },
    {
        label: 'Photography & Videography',
        value: CategoryId.PhotographyAndVideography
    },
    {
        label: 'Electronics & Gadgets',
        value: CategoryId.ElectronicsAndGadgets
    },
    {
        label: 'Sports & Outdoor Gear',
        value: CategoryId.SportsAndOutdoorGear
    },
    {
        label: 'Party & Event Supplies',
        value: CategoryId.PartyAndEventSupplies
    },
    {
        label: 'Home & Garden',
        value: CategoryId.HomeAndGarden
    },
    {
        label: 'Vehicles & Transport',
        value: CategoryId.VehiclesAndTransport
    },
    {
        label: 'Clothing & Apparel',
        value: CategoryId.ClothingAndApparel
    },
    {
        label: 'Musical Instruments',
        value: CategoryId.MusicalInstruments
    },
    {
        label: 'Baby & Kids Gear',
        value: CategoryId.BabyAndKidsGear
    },
    {
        label: 'Fitness & Wellness',
        value: CategoryId.FitnessAndWellness
    },
    {
        label: 'Other / Miscellaneous',
        value: CategoryId.OtherMiscellaneous
    },
    {
        label: 'Catering',
        value: CategoryId.Catering
    },
]
export const pickupLocations: Option[] = [
    {
        label: 'Accra',
        value: 'accra',
    },
    {
        label: 'Kumasi',
        value: 'kumasi',
    },
]

export const conditions: Option[] = [
    {
        label: 'Brand New',
        value: 'brand_new',
    },
    {
        label: 'Barely Used',
        value: 'barely_used',
    },
    {
        label: 'Standard',
        value: 'standard',
    },
    {
        label: 'Fairly Used',
        value: 'fairly_used',
    },
    {
        label: 'Damaged',
        value: 'damaged',
    },
]