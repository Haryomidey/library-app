const { baseUrl } = require("../../config/host");
const Cookies = require("js-cookie");

const getToken = () => {
  const token = Cookies.get("token");
  if (token) {
    try {
      return JSON.parse(token);
    } catch (error) {
      console.error("Invalid token format:", error);
      return '';
    }
  }
  return '';
};

const token = getToken()


export {
    
}