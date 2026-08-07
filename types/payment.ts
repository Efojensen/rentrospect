export interface EscrowPayment {
    endDate: Date
    amount: number
    userId: string
    assetId: string
    startDate: Date
    consultationMode: number
}