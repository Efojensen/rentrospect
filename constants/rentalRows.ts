interface RentalRow {
    id: string
    quantity: number
    renterName: string
    renterAvatar: string
    status: 'Completed' | 'Active' | 'Pending'
    earning: number
}

export const rentalRows: RentalRow[] = [
    {
        id: '02',
        quantity: 10,
        renterName: 'Jensen Asafo-Adjei',
        renterAvatar: '/images/demo.png',
        status: 'Active',
        earning: 0,
    },
    {
        id: '03',
        quantity: 10,
        renterName: 'Joyce Smith',
        renterAvatar: '/images/Avatar.png',
        status: 'Pending',
        earning: 0,
    },
    {
        id: '01',
        quantity: 200,
        renterName: 'Priscilla Anvobak Kwofie',
        renterAvatar: '/images/Avatar.png',
        status: 'Completed',
        earning: 35.44,
    },
]