import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../page/Home/Home/Home";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Instructors from "../page/Instructors/Instructors";
import Dashboard from "../Layout/Dashboard";
import Classes from "../page/Classes/Classes";
import SelectedClass from "../page/Dashboard/Users/SelectedClass";
import AddClass from "../page/Dashboard/Instructors/AddClass";
import MyClass from "../page/Dashboard/Instructors/MyClass";

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
                path: '/classes',
                element: <Classes />
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
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: '/dashboard/selected',
                element: <SelectedClass />
            },
            {
                path: '/dashboard/addClass',
                element: <AddClass />
            },
            {
                path: '/dashboard/myClass',
                element: <MyClass />
            },
        ]
    }
]);