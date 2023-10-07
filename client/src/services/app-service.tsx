import axios from "axios";
const SERVER_API_URL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000/api";
console.log("Using: " + process.env.NODE_SERVER_URL);

export interface Filter {
  city: string[];
  state: string[];
  zip: string;
  pwbd: boolean;
}

export const search = async (filter: Filter) => {
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
