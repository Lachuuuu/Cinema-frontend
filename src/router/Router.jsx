import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../registerPage/RegisterPage";
import ConfirmAccountPage from "../confirmAccountPage/ConfirmAccountPage";
import MainPage from "../mainPage/MainPage";
import MoviePage from "../MoviePage/MoviePage";
import UserPanel from "../UserPanel/UserPanel";
import ChangeEmail from "../UserPanel/updatePages/ChangeEmail";
import ChangePassword from "../UserPanel/updatePages/ChangePassword";
import ChangeFirstName from "../UserPanel/updatePages/ChangeFirstName";
import ChangeLastName from "../UserPanel/updatePages/ChangeLastName";
import ChangePhoneNumber from "../UserPanel/updatePages/ChangePhoneNumber";

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
        },
        {
            path: "/user/settings/change/email",
            element: <ChangeEmail/>
        },
        {
            path: "/user/settings/change/password",
            element: <ChangePassword/>
        },
        {
            path: "/user/settings/change/first_name",
            element: <ChangeFirstName/>
        },
        {
            path: "/user/settings/change/last_name",
            element: <ChangeLastName/>
        },
        {
            path: "/user/settings/change/phone_number",
            element: <ChangePhoneNumber/>
        },

    ])
    return <RouterProvider router={router}/>;
}

export default Router