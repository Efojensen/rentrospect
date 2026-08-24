import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { verifySession } from '@/services/backend'

// Landing spot for both /sign-in and /sign-up. Takes the real Clerk session
// token, has the backend verify it and report who the user is, then routes
// to /renter, /vendor, or /accountType for a user who hasn't picked a role
// yet. Middleware (proxy.ts) already guarantees a signed-in session before
// this page runs.
const RedirectingPage = async () => {
    const { getToken } = await auth()
    const token = await getToken()

    if (!token) {
        redirect('/sign-in')
    }

    // `redirect()` throws internally, so it must never run inside this
    // try/catch — otherwise the catch below would swallow it.
    let role: 'renter' | 'vendor' | null = null
    try {
        const res = await verifySession(token)
        role = res.role
    } catch (error) {
        console.error('Failed to verify session:', error)
    }

    if (role === 'vendor') {
        redirect('/vendor')
    } else if (role === 'renter') {
        redirect('/renter')
    } else {
        redirect('/accountType')
    }
}

export default RedirectingPage
