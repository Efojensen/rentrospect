'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { verifySession } from '@/services/backend'

// Wraps the renter/vendor layouts as a direct-navigation guard — the normal
// path already lands on the right page via /redirecting, but this catches a
// signed-in user typing/bookmarking the wrong section directly and bounces
// them to their actual role's home. Verifies the real session token rather
// than trusting a client-supplied id. Fails open if the check errors out.
const RoleGate = ({ role, children }: { role: 'renter' | 'vendor'; children: React.ReactNode }) => {
    const router = useRouter()
    const { isLoaded, isSignedIn, getToken } = useAuth()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (!isLoaded || !isSignedIn) return

        let cancelled = false

        const run = async () => {
            try {
                const token = await getToken()
                if (!token) {
                    if (!cancelled) setChecked(true)
                    return
                }

                const res = await verifySession(token)
                if (cancelled) return

                const actualRole = res.data?.role
                if (actualRole && actualRole !== role) {
                    router.replace(actualRole === 'vendor' ? '/vendor' : '/renter')
                } else {
                    setChecked(true)
                }
            } catch {
                if (!cancelled) setChecked(true)
            }
        }

        run()

        return () => {
            cancelled = true
        }
    }, [isLoaded, isSignedIn, getToken, role, router])

    if (!isLoaded || (isSignedIn && !checked)) return null
    return <>{children}</>
}

export default RoleGate
