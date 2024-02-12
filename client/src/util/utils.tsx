const facilityTypeMap = new Map<string, string>();
facilityTypeMap.set("SU", "Substance Use");
facilityTypeMap.set("MH", "Mental Health");

export function facilityTypeToFriendlyName(type: string): string {
    return facilityTypeMap.get(type) ?? ''; // if none exist, return empty string
}
