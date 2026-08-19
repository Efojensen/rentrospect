const BASE_URL = process.env.NEXT_PUBLIC_MASTER || '';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Account Type Selection
export async function setAccountType(clerkId: string, accountType: 'renter' | 'vendor'): Promise<ApiResponse<void>> {
  const response = await fetch(`${BASE_URL}client/setAccountType`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clerk_id: clerkId, account_type: accountType }),
  });
  return response.json();
}

// Fetch the account type chosen at /accountType, used to route a signed-in
// user to the right home page (renter vs vendor).
export async function getAccountType(clerkId: string): Promise<ApiResponse<{ account_type: 'renter' | 'vendor' }>> {
  const response = await fetch(`${BASE_URL}client/getAccountType`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clerk_id: clerkId }),
  });
  return response.json();
}

// Phone Verification
export async function sendPhoneNumber(clerkId: string, phoneNumber: string): Promise<ApiResponse<void>> {
  const response = await fetch(`${BASE_URL}client/sendPhoneNumber`, {
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
  const response = await fetch(`${BASE_URL}client/completeVendorOnboarding`, {
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
