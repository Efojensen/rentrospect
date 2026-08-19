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
