import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "../app/App";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../registerPage/RegisterPage";

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
        }
    ])
    return <RouterProvider router={router}/>;
}

export default Router