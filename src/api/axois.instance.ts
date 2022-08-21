import axios from "axios";

export const axiosInstance = (responseType: any = "json") => {
  return axios.create({
    baseURL: "http://localhost:3004/",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: responseType,
  });
};
