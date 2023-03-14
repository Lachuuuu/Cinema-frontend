import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../registerPage/RegisterPage";
import ConfirmAccountPage from "../confirmAccountPage/ConfirmAccountPage";
import MainPage from "../mainPage/MainPage";

function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage/> // dodaj mainPage
        },
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/register",
            element: <RegisterPage/>
        },
        {
            path: "/confirm-account",
            element: <ConfirmAccountPage/>
        }
    ])
    return <RouterProvider router={router}/>;
}

export default Router