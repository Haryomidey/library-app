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


const GetATeacherDashboard = async () => {
  try {
    if (!token) {
      console.error('Token is not provided');
      return;
    }

    const res = await fetch(`${baseUrl}/dashboard/admin/1`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data.error);
    }
    return data;
  } catch (error: any) {
    console.error('Error:', error.message);
  }
};


export {
  GetATeacherDashboard
}