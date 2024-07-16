const { baseUrl } = require("../../config/host");
const Cookies = require('js-cookie')

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

const LoginUser = async (payload: { email: string; password: string }) => {
  const res = await fetch(`${baseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
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


const GetSingleTopic = async (topic_id: any) => {
  const res = await fetch(`${baseUrl}/topic/show/${topic_id}`, {
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


const CreateTopic = async (formData: FormData) => {
  try {
    const res = await fetch(`${baseUrl}/topic/store`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
    return null;
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
      console.log(data.error)
    }
    return data;
  } catch (error) {
    console.error('Error', error);
  }
};

const CreateSubject = async (formData: FormData) => {
  try {
    const res = await fetch(`${baseUrl}/subject/store`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });
    console.log(res)
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
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

const GetSingleStudent =  async (studentId: any) => {
  try{
    const res = await fetch(`${baseUrl}/students/profile/${studentId}`, {
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

const EditSingleStudent =  async (formData: any, studentId: any) => {
  try{
    const res = await fetch(`${baseUrl}/students/update/${studentId}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: formData
    })
    const data = await res.json();
    console.log(data);
    
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

const GetSingleTeacher =  async (teacherId: any) => {
  try{
    const res = await fetch(`${baseUrl}/teachers/profile/${teacherId}`, {
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


const EditSingleTeacher = async (formData: FormData, teacherId: any) => {
  try {
    const res = await fetch(`${baseUrl}/teachers/update/${teacherId}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error(data.message || 'Failed to update teacher');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


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

const GetAdminDashboard = async () => {
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

const PostNotification = async (form: any) => {
  try {
    let response = await fetch(`${baseUrl}/notifications/store`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Authorization": `Bearer ${token}`
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
}


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


const GetNotifications =  async () => {
  try{
    const res = await fetch(`${baseUrl}/notifications/fetch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json();
    if (!res.ok){
      return data.error;
    }
    return data
  } catch (error: any){
    console.log(error)
  }
}

const GetComments =  async (id: any) => {
  try{
    const res = await fetch(`${baseUrl}/comments/fetch/${id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    const data = await res.json();
    console.log(data)
    if (!res.ok){
      throw new Error(data.error);
    }
    return data
  } catch (error){
    console.error(error)
  }
}

const PostComment =  async (form: any) => {
  try {
    let res = await fetch(`${baseUrl}/comments/store`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: form,
    });
    const data = await res.json();
    console.log(data)
    if (!res.ok) {
      console.error('Error', data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

const CreateTeacher = async (formData: any) => {
  try {
    const res = await fetch(`${baseUrl}/teachers/create`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });


    if (!res.ok) {
      const errorData = await res.json();
      return errorData
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const CreateStudent = async (formData: any) => {
  try {
    const res = await fetch(`${baseUrl}/students/create`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });


    if (!res.ok) {
      const errorData = await res.json();
      return errorData
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const DeleteStudent = async (studentId: any) => {
  try {
    const res = await fetch(`${baseUrl}/students/delete/${studentId}`, {
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      return errorData;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const DeleteTeacher = async (teacherId: any) => {
  try {
    const res = await fetch(`${baseUrl}/teachers/delete/${teacherId}`, {
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Failed to delete:', errorData);
      return errorData;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

console.log(token)

export {
  GetSingleTopic,
  CreateTopic,
  CreateSubject,
  GetSubject,
  GetSubjects,
  GetAllStudents,
  GetSingleStudent,
  EditSingleStudent,
  GetAllTeachers,
  GetSingleTeacher,
  EditSingleTeacher,
  LoginUser,
  VerifyToken,
  RegisterAdmins,
  GetAdminDashboard,
  PostNotification,
  GetAllTopicsUnderSubject,
  GetNotifications,
  GetComments,
  PostComment,
  CreateTeacher,
  CreateStudent,
  DeleteStudent,
  DeleteTeacher
};
