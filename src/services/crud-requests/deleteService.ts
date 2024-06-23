/* eslint-disable class-methods-use-this */
import axios from "axios";
import axiosInstance from "../intercerptors";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE",
};

class DeleteHelper {
  async delete(url: string) {
    const response = await axiosInstance.delete(url, { headers });
    return response;
  }
}
export default new DeleteHelper();
