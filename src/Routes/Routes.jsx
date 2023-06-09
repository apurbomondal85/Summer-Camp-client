import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../page/Home/Home/Home";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Instructors from "../page/Instructors/Instructors";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/instructors',
            element: <Instructors />
        },
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'singup',
            element: <Register />
        }
      ]
    },
  ]);