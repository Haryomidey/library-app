const { baseUrl } = require("../../config/host");


const GetTeacherDashboard = async (token: any) => {
  try {
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
  GetTeacherDashboard
}