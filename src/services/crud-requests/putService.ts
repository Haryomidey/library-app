/* eslint-disable class-methods-use-this */
import axios from "axios";
import axiosInstance from "../intercerptors";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PUT",
  "Content-Type": "application/json",
};

class PutHelper {
  async put(url: string, data: {}) {
    const response = await axiosInstance.put(url, data, { headers });
    return response;
  }
}
export default new PutHelper();
