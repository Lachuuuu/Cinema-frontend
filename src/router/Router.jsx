import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "../app/App";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../registerPage/RegisterPage";
import ConfirmAccountPage from "../confirmAccountPage/ConfirmAccountPage";

function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App/> // dodaj mainPage
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