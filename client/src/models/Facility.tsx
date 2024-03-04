/**
 * A model to store data about a given facility.
 */
interface Facility {
  _id: string;
  name1: string;
  name2: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  zip4: string;
  county: string;
  phone: string;
  website: string;
  latitude: number;
  longitude: number;
  treatment_type: string,
  inpatient: boolean,
  outpatient: boolean,
  partial_hospitalization: boolean,
  residential: boolean,
  pwbd: string;
}

export default Facility;
