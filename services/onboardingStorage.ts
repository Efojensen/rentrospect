const STORAGE_KEY = 'vendorOnboardingDraft';

export interface VendorOnboardingDraft {
    nationalId?: string;
    fullName?: string;
    businessName?: string;
    businessBio?: string;
    businessLocation?: string;
    startTime?: string;
    endTime?: string;
    offerDelivery?: boolean;
    acceptInPerson?: boolean;
    acceptInAppCalls?: boolean;
}

export function readVendorDraft(): VendorOnboardingDraft {
    if (typeof window === 'undefined') return {};
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
}

export function saveVendorDraft(patch: VendorOnboardingDraft) {
    const merged = { ...readVendorDraft(), ...patch };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export function clearVendorDraft() {
    localStorage.removeItem(STORAGE_KEY);
}

// Files can't go in localStorage (not JSON-serializable, and shouldn't be
// persisted anyway), so these live in a plain module-level variable. That's
// enough to survive the client-side navigation from /vendorAuth to
// /vendorAuth/logistics, which is all the happy path needs.
export interface VendorImageDraft {
    coverPhoto?: File | null;
    businessLogo?: File | null;
}

let vendorImages: VendorImageDraft = {};

export function saveVendorImages(patch: VendorImageDraft) {
    vendorImages = { ...vendorImages, ...patch };
}

export function readVendorImages(): VendorImageDraft {
    return vendorImages;
}

export function clearVendorImages() {
    vendorImages = {};
}
