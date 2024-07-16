import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AdminContainer } from "./components/admin/AdminContainer";
import Login from "./pages/Login";
import AdminComp from "./components/admin/AdminComp";
import DashboardBody from "./components/admin/dashboard/DashoardBody";
import StudentComp from "./components/students/StudentComp";
import StudentDashboard from "./components/students/dashboard/StudentDashboard";
import AllSubjects from "./components/students/subjects/AllSubjects";
import SingleSubject from "./components/students/subjects/SingleSubject";
import LessonDetails from "./components/students/subjects/lesson/LessonDetails";
import SingleMaterial from "./components/students/subjects/lesson/SingleMaterial";
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
import NewTopicContainer from "./components/students/subjects/NewtTopicContainer";
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
import NewTopicContainerTeacher from "./components/teachers/subjects/NewTopicContainerTeacher";

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
        path: 'all-notifications',
        element: <AdminNotifications />
      },
      {
        path: ":subject/",
        children: [
          {
            path: "",
            element: <SingleSubject />
          },
          {
            path: ":id/",
            children: [
              {
                path: ":subject_topic",
                element: <LessonDetailsAdmin />
              },
              {
                path: ":subject_topic/video",
                element: <SingleMaterialAdmin />
              }
            ]
          }
        ]
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
            element: <AddContainer />
          },
          {
            path: "new-topic/:id",
            element: <NewTopicContainer />
          },
          {
            path: "edit-subject/:id",
            element: <AddContainer />
          },
          {
            path: ":name",
            children: [
              {
                path: "/admin/subjects/:name",
                element: <OneSubject />
              },
              {
                path: ":grade",
                element: <SubjectForGrade />
              }
            ]
          }
        ]
      },
      {
        path: "user-management/",
        children: [
          {
            path: 'teacher',
            element: <UserManagementTeacher />
          },
          {
            path: 'new-teacher',
            element: <NewTeacher />
          },
          {
            path: 'edit-teacher/:teacherId',
            element: <EditTeacher />
          },
          {
            path: 'student',
            element: <UserManagementStudent />
          },
          {
            path: 'new-student',
            element: <NewStudent />
          },
          {
            path: 'edit-student/:studentId',
            element: <EditStudent />
          },
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
    path: '/teacher/',
    element: <TeacherComp element={null} />,
    children: [
      {
        path: '',
        element: <TeacherDashboard />
      },
      {
        path: ":subject/",
        children: [
          {
            path: "",
            element: <SingleSubject />
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
            path: "new-topic/:id",
            element: <NewTopicContainerTeacher />
          },
          {
            path: "edit-subject/:id",
            element: <AddContainerTeacher />
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
        path: 'messages',
        element: <Messages />
      },
      {
        path: 'settings',
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
        path: 'all-notifications',
        element: <StudentNotifications />
      },
      {
        path: "subjects",
        element: <AllSubjects />
      },
      {
        path: ":subject/",
        children: [
          {
            path: "",
            element: <SingleSubject />
          },
          {
            path: ":id/",
            children: [
              {
                path: ":subject_topic",
                element: <LessonDetails />
              },
              {
                path: ":subject_topic/video",
                element: <SingleMaterial />
              }
            ]
          }
        ]
      },
      {
        path: "library",
        element: <LibraryHome />
      },
      {
        path: "settings",
        element: <Settings />
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
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
