const { baseUrl } = require("../../config/host");
const Cookies = require("js-cookie");
const token = Cookies.get("token") || null;

console.log(token)

const GetTopics = async (subjectId: number) => {
  const res = await fetch(`${baseUrl}/topic/fetch/${subjectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};
const GetSubject = async (subjectId: number) => {
  const res = await fetch(`${baseUrl}/subject/show/${subjectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};
const LoginUser = async (payload: { email: string; password: string }) => {
  const res = await fetch(`${baseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

const VerifyToken = async () => {
  const res = await fetch(`${baseUrl}/user/verify-token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

const CreateTopic = async (formData: any) => {
  try {
    const res = await fetch(`${baseUrl}/topic/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

const GetSubjects = async () => {
  try {
    const res = await fetch(`${baseUrl}/subject/fetch?school_id=1`, {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const CreateSubject = async (formData: any) => {
  try {
    const res = await fetch(`${baseUrl}/subject/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};


const GetAllStudents =  async () => {
  try{
    const res = await fetch(`${baseUrl}/users/students/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json();
    if (!res.ok){
      throw new Error(data.error);
    }
    return data
  } catch (error){
    console.error(error)
  }
}

const GetAllTeachers =  async () => {
  try{
    const res = await fetch(`${baseUrl}/users/teachers/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json();
    if (!res.ok){
      throw new Error(data.error);
    }
    return data
  } catch (error){
    console.error(error)
  }
}

const RegisterAdmins = async (form: any) => {
  try {
    let response = await fetch(`${baseUrl}/user/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: form,
      redirect: 'follow'
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};


export {
  GetTopics,
  CreateTopic,
  CreateSubject,
  GetSubject,
  GetSubjects,
  GetAllStudents,
  GetAllTeachers,
  LoginUser,
  VerifyToken,
  RegisterAdmins
};
