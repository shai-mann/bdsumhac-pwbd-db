import Facility from "../models/Facility";

const treatmentTypeMap = new Map<string, string>();
treatmentTypeMap.set("SU", "Substance Use");
treatmentTypeMap.set("MH", "Mental Health");

const facilityTypeMap = new Map<FacilityType, string>();
facilityTypeMap.set("inpatient", "Inpatient");
facilityTypeMap.set("outpatient", "Outpatient");
facilityTypeMap.set("partial_hospitalization", "Partial Hospitalization");
facilityTypeMap.set("residential", "Residential");

type FacilityType =
  | "inpatient"
  | "outpatient"
  | "partial_hospitalization"
  | "residential";

export function treatmentTypeToFriendlyName(type: string): string {
  return treatmentTypeMap.get(type) ?? ""; // if none exist, return empty string
}

export function facilityTypeToFriendlyString(f: Facility): string {
  let out = "";
  for (const key of Array.from(facilityTypeMap.keys())) {
    if (f[key]) {
      out += facilityTypeMap.get(key) + ", ";
    }
  }
  return out.substring(0, out.length - 2);
}
