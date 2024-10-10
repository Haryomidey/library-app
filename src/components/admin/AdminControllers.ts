const { baseUrl } = require("../../config/host");

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

const VerifyToken = async (token: any) => {
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

const GetSingleTopic = async (topic_id: any, token: any) => {
  const res = await fetch(`${baseUrl}/topic/show/${topic_id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  console.log(res)
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

const GetSubject = async (subjectId: number, token: any) => {
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

const CreateTopic = async (formData: FormData, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/topic/store`, {
      method: "POST",
      headers: {
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
    return null;
  }
};

const GetSubjects = async (token: any) => {
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
      console.log(data.error);
    }
    return data;
  } catch (error) {
    console.error("Error", error);
  }
};

const EditSubject = async (formData: any, subjectId: any, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/subject/update/${subjectId}`, {
      method: "POST",
      headers: {
        "Accept": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const EditTopic = async (formData: any, topicId: any, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/topic/update/${topicId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const CreateSubject = async (formData: FormData, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/subject/store`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    console.log(res);
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

const GetAllStudents = async (token: any) => {
  try {
    const res = await fetch(`${baseUrl}/users/students/1`, {
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
  } catch (error) {
    console.error(error);
  }
};

const GetSingleStudent = async (studentId: any, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/students/profile/${studentId}`, {
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
  } catch (error) {
    console.error(error);
  }
};

const EditSingleStudent = async (formData: any, studentId: any, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/students/update/${studentId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const GetAllTeachers = async (token: any) => {
  try {
    const res = await fetch(`${baseUrl}/users/teachers/1`, {
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
  } catch (error) {
    console.error(error);
  }
};

const GetSingleTeacher = async (teacherId: any, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/teachers/profile/${teacherId}`, {
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
  } catch (error) {
    console.error(error);
  }
};

const EditSingleTeacher = async (
  formData: FormData,
  teacherId: any,
  token: any
) => {
  try {
    const res = await fetch(`${baseUrl}/teachers/update/${teacherId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to update teacher");
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
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: form,
      redirect: "follow"
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

const GetAdminDashboard = async (token: any) => {
  try {
    const res = await fetch(`${baseUrl}/dashboard/admin/1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data.error);
    }
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

const PostNotification = async (form: any, token: any) => {
  try {
    let response = await fetch(`${baseUrl}/notifications/store`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: form,
      redirect: "follow"
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

const GetAllTopicsUnderSubject = async (subject_id: string, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/topic/fetch/${subject_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ""
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

const GetNotifications = async (token: any) => {
  try {
    const res = await fetch(`${baseUrl}/notifications/fetch`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log("");
  }
};

// const GetNotifications = async (token: any) => {
//   try {
//     const res = await fetch(`${baseUrl}/notifications/fetch`, {
//       method: "GET",
//       headers: {
//         "Accept": "application/json",
//         "Authorization": `Bearer ${token}`
//       }
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }

//     const data = await res.json();
//     return data;
//   } catch (error: any) {
//     console.error('Failed to fetch notifications:', error);
//     return null;
//   }
// }

const GetComments = async (id: any, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/comments/fetch/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const PostComment = async (form: any, token: any) => {
  try {
    let res = await fetch(`${baseUrl}/comments/store`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: form
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      console.error("Error", data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const CreateTeacher = async (formData: any, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/teachers/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!res.ok) {
      const errorData = await res.json();
      return errorData;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const CreateStudent = async (formData: any, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/students/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!res.ok) {
      const errorData = await res.json();
      return errorData;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const DeleteStudent = async (studentId: any, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/students/delete/${studentId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      return errorData;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const DeleteTeacher = async (teacherId: any, token: any) => {
  try {
    const res = await fetch(`${baseUrl}/teachers/delete/${teacherId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Failed to delete:", errorData);
      return errorData;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export {
  GetSingleTopic,
  CreateTopic,
  CreateSubject,
  GetSubject,
  GetSubjects,
  EditTopic,
  EditSubject,
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
