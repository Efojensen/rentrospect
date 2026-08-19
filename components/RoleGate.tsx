'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { getAccountType } from '@/services/backend'

const RENTER_HOME = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL || '/renter'
const VENDOR_HOME = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_VENDOR_FALLBACK_REDIRECT_URL || '/vendor'

// Wraps the renter/vendor layouts. Clerk always lands a signed-in user on
// RENTER_HOME after sign-in, so this checks the account's real role and
// bounces vendors on to VENDOR_HOME (and vice versa for direct navigation).
// If the role check fails or hasn't been built on the backend yet, it fails
// open and just shows the page the user was already on.
const RoleGate = ({ role, children }: { role: 'renter' | 'vendor'; children: React.ReactNode }) => {
    const router = useRouter()
    const { user, isLoaded } = useUser()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (!isLoaded || !user?.id) return

        let cancelled = false
        getAccountType(user.id)
            .then((res) => {
                if (cancelled) return
                const accountType = res.data?.account_type
                if (accountType && accountType !== role) {
                    router.replace(accountType === 'vendor' ? VENDOR_HOME : RENTER_HOME)
                } else {
                    setChecked(true)
                }
            })
            .catch(() => {
                if (!cancelled) setChecked(true)
            })

        return () => {
            cancelled = true
        }
    }, [isLoaded, user?.id, role, router])

    if (!isLoaded || (!checked && user?.id)) return null
    return <>{children}</>
}

export default RoleGate
