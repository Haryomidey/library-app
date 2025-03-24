import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AdminContainer } from "./components/admin/AdminContainer";
import Login from "./pages/Login";
import AdminComp from "./components/admin/AdminComp";
import DashboardBody from "./components/admin/dashboard/DashoardBody";
import StudentComp from "./components/students/StudentComp";
import StudentDashboard from "./components/students/dashboard/StudentDashboard";
import AllSubjects from "./components/students/subjects/AllSubjects";
import LibraryHome from "./components/students/library/LibraryHome";
import Settings from "./components/students/settings/Settings";
import UserManagementTeacher from "./components/admin/user management/userManagementTeacher";
import UserManagementStudent from "./components/admin/user management/userManagementStudent";
import Announcement from "./components/admin/announcement/Announcement";
import HelpAndSupport from "./components/admin/help and support/HelpAndSupport";
import Library from "./components/admin/library/Library";
import AdminSettings from "./components/admin/settings/AdminSettings";
import SubjectsBody from "./components/admin/subjects/SubjectsBody";
import SubjectsDisplay from "./components/admin/subjects/SubjectsDisplay";
import AddContainer from "./components/admin/subjects/AddContainer";
import OneSubject from "./components/admin/subjects/OneSubject";
import SubjectForGrade from "./components/admin/subjects/SubjectForGrade";
import Register from "./pages/Register";
import TeacherComp from "./components/teachers/TeacherComp";
import TeacherDashboard from "./components/teachers/dashboard/TeacherDashboard";
import NewTeacher from "./components/admin/user management/NewTeacher";
import LessonDetailsAdmin from "./components/admin/subjects/lesson/LessonDetailsAdmin";
import SingleMaterialAdmin from "./components/admin/subjects/lesson/SingleMaterialAdmin";
import AdminNotifications from "./components/admin/AdminNotifications";
import StudentNotifications from "./components/students/StudentNotifications";
import NewStudent from "./components/admin/user management/NewStudent";
import TeacherSettings from "./components/teachers/settings/TeacherSettings";
import EditTeacher from "./components/admin/user management/EditTeacher";
import EditStudent from "./components/admin/user management/EditStudent";
import Messages from "./components/teachers/messages/Messages";
import SubjectForGradeTeacher from "./components/teachers/subjects/SubjectForGradeTeacher";
import OneSubjectTeacher from "./components/teachers/subjects/OneSubjectTeacher";
import AddContainerTeacher from "./components/teachers/subjects/AddContainerTeacher";
import SubjectsDisplayTeacher from "./components/teachers/subjects/SubjectsDisplayTeacher";
import SubjectsBodyTeacher from "./components/teachers/subjects/SubjectsBodyTeacher";
import SingleMaterialTeacher from "./components/teachers/subjects/lesson/SingleMaterialTeacher";
import LessonDetailsTeacher from "./components/teachers/subjects/lesson/LessonDetailsTeacher";
import TeacherNotifications from "./components/teachers/TeacherNotifications";
import EditContainer from "./components/admin/subjects/EditContainer";
import EditContainerTeacher from "./components/teachers/subjects/EditContainerTeacher";
import FileViewer from "./components/FileViewer";
import StudentOneSubject from "./components/students/subjects/StudentOneSubject";
import StudentSubjectForGrade from "./components/students/subjects/StudentSubjectForGrade";
import LessonDetailsStudent from "./components/students/subjects/lesson/LessonDetailsStudent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin/",
    element: <AdminComp element={null} />,
    children: [
      {
        path: "/admin/",
        element: <DashboardBody />
      },
      {
        path: "all-notifications",
        element: <AdminNotifications />
      },
      {
        path: "subjects",
        element: <SubjectsBody element={null} />,
        children: [
          {
            path: "/admin/subjects/",
            element: <SubjectsDisplay />
          },
          {
            path: "new",
            element: <AddContainer content="subject" />
          },
          {
            path: "new-topic/:subjectId",
            element: <AddContainer content="topic" />
          },
          {
            path: "edit-subject/:subjectId",
            element: <EditContainer content="subject" />
          },
          {
            path: ":subjectId",
            children: [
              {
                path: "/admin/subjects/:subjectId",
                element: <OneSubject/>
              },
              {
                path: ":grade",
                children: [
                  {
                    path: "/admin/subjects/:subjectId/:grade",
                    element: <SubjectForGrade />
                  },
                  {
                    path: "edit/:topicId",
                    element: <EditContainer content="topic" />
                  },
                  {
                    path: ":topicId",
                    children: [
                      {
                        path: "/admin/subjects/:subjectId/:grade/:topicId",
                        element: <LessonDetailsAdmin />
                      },
                      {
                        path: "video",
                        element: <SingleMaterialAdmin />
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: "user-management/",
        children: [
          {
            path: "teacher",
            element: <UserManagementTeacher />
          },
          {
            path: "new-teacher",
            element: <NewTeacher />
          },
          {
            path: "edit-teacher/:teacherId",
            element: <EditTeacher />
          },
          {
            path: "student",
            element: <UserManagementStudent />
          },
          {
            path: "new-student",
            element: <NewStudent />
          },
          {
            path: "edit-student/:studentId",
            element: <EditStudent />
          }
        ]
      },
      {
        path: "announcement",
        element: <Announcement />
      },
      {
        path: "help-and-support",
        element: <HelpAndSupport />
      },
      {
        path: "library",
        element: <Library />
      },
      {
        path: "settings",
        element: <AdminSettings />
      }
    ]
  },
  {
    path: "/teacher/",
    element: <TeacherComp element={null} />,
    children: [
      {
        path: "",
        element: <TeacherDashboard />
      },
      {
        path: "all-notifications",
        element: <TeacherNotifications />
      },
      {
        path: ":subject/",
        children: [
          {
            path: "",
            element: <StudentOneSubject />
          },
          {
            path: ":id/",
            children: [
              {
                path: ":subject_topic",
                element: <LessonDetailsTeacher />
              },
              {
                path: ":subject_topic/video",
                element: <SingleMaterialTeacher />
              }
            ]
          }
        ]
      },
      {
        path: "subjects",
        element: <SubjectsBodyTeacher element={null} />,
        children: [
          {
            path: "/teacher/subjects/",
            element: <SubjectsDisplayTeacher />
          },
          {
            path: "new",
            element: <AddContainerTeacher />
          },
          {
            path: "edit-subject/:id",
            element: <EditContainerTeacher />
          },
          {
            path: ":name",
            children: [
              {
                path: "/teacher/subjects/:name",
                element: <OneSubjectTeacher />
              },
              {
                path: ":grade",
                element: <SubjectForGradeTeacher />
              }
            ]
          }
        ]
      },
      {
        path: "messages",
        element: <Messages />
      },
      {
        path: "settings",
        element: <TeacherSettings />
      }
    ]
  },
  {
    path: "/student/",
    element: <StudentComp element={null} />,
    children: [
      {
        path: "",
        element: <StudentDashboard />
      },
      {
        path: "all-notifications",
        element: <StudentNotifications />
      },
      {
        path: "library",
        element: <LibraryHome />
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "subjects",
        children: [
          {
            path: "/student/subjects",
            element: <AllSubjects />
          },
          {
            path: ":subjectId",
            children: [
              {
                path: "/student/subjects/:subjectId",
                element: <StudentOneSubject />
              },
              {
                path: ":grade",
                children: [
                  {
                    path: "/student/subjects/:subjectId/:grade",
                    element: <StudentSubjectForGrade />
                  },
                  {
                    path: ":topicId",
                    children: [
                      {
                        path: "/student/subjects/:subjectId/:grade/:topicId",
                        element: <LessonDetailsStudent />
                      },
                      {
                        path: "video",
                        element: <SingleMaterialAdmin />
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/library/",
    element: <AdminContainer />,
    children: [
      {
        path: "/library/",
        element: <div>hello</div>
      }
    ]
  },
  {
    path: "/file-viewer",
    element: <FileViewer />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
