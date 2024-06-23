/* eslint-disable class-methods-use-this */
import axios from "axios";
import axiosInstance from "../intercerptors";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Authorization": ""
};

class GetHelper {
  async get(url: string) {
    const response = await axiosInstance.get(url, { headers });
    return response;
  }
}
export default new GetHelper();

