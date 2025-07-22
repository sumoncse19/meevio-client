import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProfileDetails from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import EditProfile from "../pages/Profile/EditProfile";
import MeetingLayoutes from "../pages/Meeting/MeetingLayouts/MeetingLayoutes";
import MeetingNavbar from "../pages/Meeting/MeetingNavbar/MeetingNavbar";
import MeetingFunctionpage from "../pages/Meeting/MeetingFunctionPages/MeetingFunctionpage";
import ChatHistory from "../pages/ChatHistory/ChatHistory";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import VideoCall from "../pages/Video/VideoCall";
import PaymentPage from "../payment/PaymentPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfileDetails />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "/editProfile",
      //   element: <PrivateRoute>
      //     <EditProfile />
      //   </PrivateRoute>
      // },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      // {
      //   path: '/video-call',
      //   element: <PrivateRoute><VideoCall /></PrivateRoute>
      // }
      // payment
      {
        path: "/payment",
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: "/meeting",
    element: (
      <PrivateRoute>
        <MeetingLayoutes></MeetingLayoutes>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/meeting",
        element: <MeetingFunctionpage />,
      },
      {
        path: "/meeting/chat-history",
        element: <ChatHistory />,
      },
      {
        path: "/meeting/video-call",
        element: <VideoCall />,
      },
    ],
  },
]);

export default Routes;
