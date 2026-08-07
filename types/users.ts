export interface ClientBody {
    name: string
    email: string
    password: string
    profilePic?: string
    phoneNumber: string
}

export interface VendorBody extends ClientBody {
    natId: string
    about: string
    calls: boolean
    endTime: string
    meetups: boolean
    location: string
    startTime: string
    deliveries: boolean
}
