import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../registerPage/RegisterPage";
import ConfirmAccountPage from "../confirmAccountPage/ConfirmAccountPage";
import MainPage from "../mainPage/MainPage";
import MoviePage from "../MoviePage/MoviePage";
import UserPanel from "../UserPanel/UserPanel";

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
        },
        {
            path: "/movie/:movieId",
            element: <MoviePage/>
        },
        {
            path: "/user/settings",
            element: <UserPanel/>
        }
    ])
    return <RouterProvider router={router}/>;
}

export default Router