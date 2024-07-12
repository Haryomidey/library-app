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

const token = getToken();


const GetAllSubjects = async () => {
  try {
    const res = await fetch(`${baseUrl}/subject/fetch?school_id=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error("Error fetching all subjects:", error);
    console.error(error);
  }
};

const GetAllTopicsUnderSubject = async (subject_id: string) => {
  try {
    const res = await fetch(`${baseUrl}/topic/fetch/${subject_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data.error);
    }
    return data;
  } catch (error) {
    console.error("Error fetching topics under subject:", error);
    console.error(error);
  }
};

const GetAllSubjectsAndGrades = async () => {
  try {
    const res = await fetch(`${baseUrl}/subject/fetch?school_id=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data.error);
    }
    return data;
  } catch (error) {
    console.error("Error fetching all subjects and grades:", error);
  }
};


const GetSingleTopic = async (topic_id: any) => {
  try {
    const res = await fetch(`${baseUrl}/topic/show/${topic_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(data.error);
    }
    return data;
  } catch (error) {
    console.error("Error fetching single topic:", error);
    throw error;
  }
};

export { 
  GetAllSubjects,
  GetAllTopicsUnderSubject,
  GetAllSubjectsAndGrades,
  GetSingleTopic
};
