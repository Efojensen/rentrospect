import { auth } from '@clerk/nextjs/server'
import WalletClient from './walletClient'
import { getUserBalance, getVendorTransactions } from '@/services/backend'
import type { WalletBalance, VendorTransaction } from '@/services/backend'

export default async function WalletPage() {
    const { getToken } = await auth()
    const token = await getToken()

    let balance: WalletBalance | null = null
    let transactions: VendorTransaction[] = []

    if (token) {
        try {
            [balance, transactions] = await Promise.all([
                getUserBalance(token),
                getVendorTransactions(token),
            ])
        } catch (error) {
            console.error('Failed to load wallet data:', error)
        }
    }

    return <WalletClient balance={balance} transactions={transactions} />
}
