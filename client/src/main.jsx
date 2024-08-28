import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import { UserProvider } from "./components/UserContext";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
// Lazy load the components
const Home = lazy(() => import("./layout/Home"));
const SignUp = lazy(() => import("./pages/Login/SignUp"));
const Login = lazy(() => import("./pages/Login/Login"));
const Coching = lazy(() => import("./pages/coching/Coching"));
const Cochings = lazy(() => import("./pages/coching/Cochings"));
const NotFound = lazy(() => import("./pages/404Page"));
const Tutor = lazy(() => import("./pages/tutor/Tutor"));
const AddTutor = lazy(() => import("./pages/tutor/AddTutor"));
const AddCoching = lazy(() => import("./pages/coching/AddCoching"));
const Tutors = lazy(() => import("./pages/tutor/Tutors"));
const Teachers = lazy(() => import("./pages/teacher/Teachers"));
const Teacher = lazy(() => import("./pages/teacher/Teacher"));
const AddTeacher = lazy(() => import("./pages/teacher/AddTeacher"));
const Structure = lazy(() => import("./dashboard/Structure"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const AddStudents = lazy(() => import("./dashboard/students/AddStudents"));
const ViewStudents = lazy(() => import("./dashboard/students/ViewStudents"));
const AddNotes = lazy(() => import("./dashboard/notes/AddNotes"));
const ViewNotes = lazy(() => import("./dashboard/notes/ViewNotes"));
const AddModules = lazy(() => import("./dashboard/modules/AddModules"));
const ViewModules = lazy(() => import("./dashboard/modules/ViewModules"));
const AddDpp = lazy(() => import("./dashboard/dpp/AddDpp"));
const ViewDpp = lazy(() => import("./dashboard/dpp/ViewDpp"));
const AddResults = lazy(() => import("./dashboard/results/AddResults"));
const ViewResults = lazy(() => import("./dashboard/results/ViewResults"));
const Students = lazy(() => import("./students/Students"));
const StudentNotes = lazy(() => import("./students/StudentNotes"));
const StudentDpp = lazy(() => import("./students/StudentDpp"));
const StudentModules = lazy(() => import("./students/StudentModules"));
const StudentResults = lazy(() => import("./students/StudentResults"));
const AddVideos = lazy(() => import("./dashboard/videos/AddVideos"));
const ViewVideos = lazy(() => import("./dashboard/videos/ViewVideos"));
const StudentVideos = lazy(() => import("./students/StudentVideos"));

const StudendViewVideo = lazy(()=> import ("./students/ViewVideo"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout component as the wrapper
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Cochings />,
          },
          {
            path: "/tutors",
            element: <Tutors />,
          },
          {
            path: "/teachers",
            element: <Teachers />,
          },
        ],
      },
      {
        path: "signUP",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "coching/:id",
        element: <Coching />,
      },
      {
        path: "tutor/:id",
        element: <Tutor />,
      },
      {
        path: "teacher/:id",
        element: <Teacher />,
      },
      {
        path: "/addCoching",
        element: <AddCoching />,
      },
      {
        path: "/addTutor",
        element: <AddTutor />,
      },
      {
        path: "/addTeacher",
        element: <AddTeacher />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Structure />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/addStudent",
        element: <AddStudents />,
      },
      {
        path: "/dashboard/viewStudent",
        element: <ViewStudents />,
      },
      {
        path: "/dashboard/addNotes",
        element: <AddNotes />,
      },
      {
        path: "/dashboard/viewNotes",
        element: <ViewNotes />,
      },
      {
        path: "/dashboard/addModules",
        element: <AddModules />,
      },
      {
        path: "/dashboard/viewModules",
        element: <ViewModules />,
      },
      {
        path: "/dashboard/addDpp",
        element: <AddDpp />,
      },
      {
        path: "/dashboard/viewDpp",
        element: <ViewDpp />,
      },
      {
        path: "/dashboard/addResults",
        element: <AddResults />,
      },
      {
        path: "/dashboard/viewResults",
        element: <ViewResults />,
      },
      {
        path: "/dashboard/addVideos",
        element: <AddVideos />,
      },
      {
        path: "/dashboard/viewVideos",
        element: <ViewVideos />,
      },
    ],
  },
  {
    path: "/student",
    element: <Students />,
    children: [
      {
        path: "", // This will match "/notes"
        element: <StudentNotes />,
      },
      {
        path: "/student/dpp", // This will match "/notes/dpp"
        element: <StudentDpp />,
      },
      {
        path: "/student/modules", // This will match "/notes/modules"
        element: <StudentModules />,
      },
      {
        path: "/student/results", // This will match "/notes/results"
        element: <StudentResults />,
      },
      {
        path: "/student/videos", // This will match "/notes/results"
        element: <StudentVideos />,
      },
      {
        path: "/student/viewvideos", // This will match "/notes/results"
        element: <StudendViewVideo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <UserProvider>
        <RouterProvider router={router}>
          <ScrollToTop />
        </RouterProvider>
      </UserProvider>
    </Suspense>
  </React.StrictMode>
);
