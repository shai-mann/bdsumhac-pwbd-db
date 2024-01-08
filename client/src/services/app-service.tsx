import axios from "axios";
const SERVER_API_URL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000/api";
console.log("Using: " + SERVER_API_URL);

export const PWBD_BOTH = "Both"
export const PWBD_TRUE = "True"
export const PWBD_FALSE = "False"
export const PWBD_UNKNOWN = "Unknown"

export interface Filter {
  name: string;
  city: string[];
  state: string[];
  zip: string;
  pwbd: boolean | undefined;
}

interface KeyValue {
  [propName: string]: String
}

export const search = async (filter: Filter) => {
  if (filter.pwbd === undefined) {
    delete filter.pwbd
  }
  try {
    const response = await axios.post(`${SERVER_API_URL}/facilities`, filter);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCities = async () => {
  try {
    const response = await axios.get(`${SERVER_API_URL}/cities`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStates = async () => {
  try {
    const response = await axios.get(`${SERVER_API_URL}/states`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateFacilities = async (email: string, edits: [String, String][]) => {
  try {
    var body: KeyValue = {}
    for (let [id, pwbd] of edits) {
      body = {
        ...body,
        [id as string]: pwbd
      }
    }
    const response = await axios.post(`${SERVER_API_URL}/facilities/edit?email=${email}`, body)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
