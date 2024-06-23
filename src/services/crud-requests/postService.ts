/* eslint-disable class-methods-use-this */
import axios from "axios";
import axiosInstance from "../intercerptors";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Content-Type": "application/json",
};

class PostService {
  async post(url: string, data: {}) {
    const response = await axiosInstance.post(url, data, { headers });
    return response;
  }
}
export default new PostService();
