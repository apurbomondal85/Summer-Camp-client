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
import ManageClass from "../page/Dashboard/Admin/ManageClass";
import ManageUsers from "../page/Dashboard/Admin/ManageUsers";
import Payment from "../page/Dashboard/Users/Payment";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import EnrollClass from "../page/Dashboard/Users/EnrollClass";

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
                element: <PrivateRoutes><SelectedClass /></PrivateRoutes>
            },
            {
                path: '/dashboard/enrollClass',
                element: <PrivateRoutes><EnrollClass /></PrivateRoutes>
            },
            {
                path: '/dashboard/addClass',
                element: <PrivateRoutes><AddClass /></PrivateRoutes>
            },
            {
                path: '/dashboard/myClass',
                element: <PrivateRoutes><MyClass /></PrivateRoutes>
            },
            {
                path: '/dashboard/manageClasses',
                element: <PrivateRoutes><ManageClass /></PrivateRoutes>
            },
            {
                path: '/dashboard/manageUsers',
                element: <PrivateRoutes><ManageUsers /></PrivateRoutes>
            },
            {
                path: '/dashboard/payment/:id',
                element: <PrivateRoutes><Payment /></PrivateRoutes>
            },
        ]
    }
]);