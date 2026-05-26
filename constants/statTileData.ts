import { VendorStatTileProps } from "@/components/vendor/StatTile";

export const vendorStats: VendorStatTileProps[] = [
    {
        title: 'Conversion Rate',
        change: '10.0%',
        changeDirection: true,
        subText: '20 Requests',
        desc: 'Out of 2000 views',
    },
    {
        title: 'Idle Assets',
        change: '3.0%',
        changeDirection: false,
        subText: '5 Items',
        desc: 'In 30+ days',
    },
    {
        title: 'Avg Response Time',
        change: '3.2%',
        changeDirection: true,
        subText: '2 Hours',
        desc: 'Within the past Week',
    },
    {
        title: 'Avg Item Rating',
        change: '8.3%',
        changeDirection: true,
        subText: '3.7 Stars',
        desc: '4,500 Total Ratings',
    },
]