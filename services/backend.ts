const BASE_URL = process.env.NEXT_PUBLIC_MASTER || '';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Verify a Clerk session token server-side and get back who the user is.
// `role` is null for a user who hasn't finished /accountType yet.
export interface VerifiedSession {
  user_id: string;
  role: 'renter' | 'vendor' | null;
}

export async function verifySession(token: string): Promise<ApiResponse<VerifiedSession>> {
  const response = await fetch(`${BASE_URL}auth/verifySession`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// Phone Verification
export async function sendPhoneNumber(clerkId: string, phoneNumber: string): Promise<ApiResponse<void>> {
  const response = await fetch(`${BASE_URL}webhooks/client/sendPhoneNumber`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clerk_id: clerkId, phone_number: phoneNumber }),
  });
  return response.json();
}

// SMS Code Verification
export async function verifySmsCode(clerkId: string, code: string): Promise<ApiResponse<void>> {
  const response = await fetch(`${BASE_URL}client/verifySmsCode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clerk_id: clerkId, code }),
  });
  return response.json();
}

// Complete Vendor Onboarding — the vendor detail screens (national ID,
// identity confirmation, business identity, logistics) only accumulate their
// answers in localStorage (see services/onboardingStorage.ts); this is the
// single call that sends everything to the backend at once, fired from the
// last screen in the flow.
export interface VendorOnboardingPayload {
  nationalId: string;
  fullName: string;
  businessName: string;
  businessBio: string;
  businessLocation: string;
  startTime: string;
  endTime: string;
  offerDelivery: boolean;
  acceptInPerson: boolean;
  acceptInAppCalls: boolean;
}

export async function completeVendorOnboarding(clerkId: string, payload: VendorOnboardingPayload): Promise<ApiResponse<void>> {
  const response = await fetch(`${BASE_URL}vendor/updateDetails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clerk_id: clerkId,
      national_id: payload.nationalId,
      full_name: payload.fullName,
      business_name: payload.businessName,
      business_bio: payload.businessBio,
      business_location: payload.businessLocation,
      start_time: payload.startTime,
      end_time: payload.endTime,
      offer_delivery: payload.offerDelivery,
      accept_in_person: payload.acceptInPerson,
      accept_in_app_calls: payload.acceptInAppCalls,
    }),
  });
  return response.json();
}
