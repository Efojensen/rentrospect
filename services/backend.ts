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

export async function verifySession(token: string): Promise<VerifiedSession> {
  const response = await fetch(`${BASE_URL}auth/verifySession`, {
    method: 'GET',
    cache: 'no-store', // per-user response — must never enter Next's shared fetch cache
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// Wallet Balance — works for both a renter and a vendor; the backend
// determines which based on who the verified token belongs to.
export interface WalletBalance {
  totalBalance: number;
  escrowBalance: number;
  availableBalance: number;
}

export async function getUserBalance(token: string): Promise<WalletBalance> {
  const response = await fetch(`${BASE_URL}client/userBalances`, {
    method: 'GET',
    cache: 'no-store', // per-user response — must never enter Next's shared fetch cache
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// Vendor Transaction History
export interface VendorTransaction {
  profilePic: string;
  name: string;
  startDate: string; // ISO timestamp — JSON has no Date type; parse with `new Date(date)` when displaying
  endDate: string; // ISO timestamp — JSON has no Date type; parse with `new Date(date)` when displaying
  amount: number;
  status: 'holding' | 'released' | 'refunded';
}

export async function getVendorTransactions(token: string): Promise<VendorTransaction[]> {
  const response = await fetch(`${BASE_URL}vendor/txsHist`, {
    method: 'GET',
    cache: 'no-store', // per-user response — must never enter Next's shared fetch cache
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// Vendor Dashboard Transactions — backing the "My rentals" table
export interface DashboardTransaction {
  name: string;
  amount: string; // Go's decimal.Decimal marshals as a quoted JSON string, not a number — parse before formatting
  status: string;
  profilePic: string;
  endDate?: string; // ISO timestamp — the backend omits this key entirely when the date is unset
  startDate?: string; // ISO timestamp — the backend omits this key entirely when the date is unset
  quantity: number;
  transactionId: string;
}

export async function getVendorDashboardTransactions(token: string): Promise<DashboardTransaction[]> {
  const response = await fetch(`${BASE_URL}vendor/transactions`, {
    method: 'GET',
    cache: 'no-store', // per-user response — must never enter Next's shared fetch cache
    headers: {
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

export interface VendorOnboardingImages {
  coverPhoto: File | null;
  businessLogo: File | null;
}

export async function completeVendorOnboarding(
  clerkId: string,
  payload: VendorOnboardingPayload,
  images: VendorOnboardingImages
): Promise<ApiResponse<void>> {
  const vendorDetails = {
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
  };

  const formData = new FormData();
  formData.append('vendorDetails', JSON.stringify(vendorDetails));
  if (images.coverPhoto) formData.append('cover_photo', images.coverPhoto);
  if (images.businessLogo) formData.append('business_logo', images.businessLogo);

  // No Content-Type header — the browser sets multipart/form-data with the
  // correct boundary itself when the body is a FormData instance.
  const response = await fetch(`${BASE_URL}vendor/updateDetails`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
}

// Upload Asset — `vendor` is the verified user_id from verifySession, not a
// client-trusted value. Up to 4 images ride under the repeated 'image' field;
// `primaryImage` is the index into that set (0 = first image).
export interface AssetUploadPayload {
  vendor: number;
  category: number;
  name: string;
  availability: string;
  description: string;
  rate: number;
  pricingUnit: string;
  location: string;
  condition: string;
  primaryImage: number;
  quantity: number;
}

export async function uploadAsset(
  token: string,
  assetDetails: AssetUploadPayload,
  images: File[]
): Promise<ApiResponse<void>> {
  const formData = new FormData();
  formData.append('assetDetails', JSON.stringify(assetDetails));
  images.forEach((file) => formData.append('image', file));

  // No Content-Type header — the browser sets multipart/form-data with the
  // correct boundary itself when the body is a FormData instance.
  const response = await fetch(`${BASE_URL}assets/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`Upload failed (${response.status}): ${errorBody}`);
  }

  return response.json();
}
