'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { verifySession } from '@/services/backend'
import LoadingDialog from '@/app/booking/loading'

// Landing spot for both /sign-in and /sign-up. Takes the real Clerk session
// token, has the backend verify it and report who the user is, then routes
// to /renter, /vendor, or /accountType for a user who hasn't picked a role
// yet.
const RedirectingPage = () => {
    const router = useRouter()
    const { isLoaded, isSignedIn, getToken } = useAuth()

    useEffect(() => {
        if (!isLoaded) return

        if (!isSignedIn) {
            router.replace('/sign-in')
            return
        }

        let cancelled = false

        const run = async () => {
            try {
                const token = await getToken()
                if (!token) {
                    router.replace('/sign-in')
                    return
                }

                const res = await verifySession(token)
                if (cancelled) return

                const role = res.data?.role
                if (role === 'vendor') {
                    router.replace('/vendor')
                } else if (role === 'renter') {
                    router.replace('/renter')
                } else {
                    router.replace('/accountType')
                }
            } catch (error) {
                console.error('Failed to verify session:', error)
                if (!cancelled) router.replace('/accountType')
            }
        }

        run()

        return () => {
            cancelled = true
        }
    }, [isLoaded, isSignedIn, getToken, router])

    return <LoadingDialog open message='Signing you in...' />
}

export default RedirectingPage
