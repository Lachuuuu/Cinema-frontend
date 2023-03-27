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
import {useEffect} from "react";
import {getUserByTokenApi} from "../api/Api";
import SearchPage from "../searchPage/SearchPage";
import ReservationPage from "../reservationPage/ReservationPage";

function Router(props) {

    const user = props.user
    const setUser = props.setUser

    useEffect(() => {
        getUserDetails()
    }, [])


    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage user={user} setUser={setUser}/>

        },
        {
            path: "/login",
            element: <LoginPage user={user} setUser={setUser}/>
        },
        {
            path: "/register",
            element: <RegisterPage user={user} setUser={setUser}/>
        },
        {
            path: "/confirm-account",
            element: <ConfirmAccountPage user={user} setUser={setUser}/>
        },
        {
            path: "/movie/:movieId",
            element: <MoviePage user={user} setUser={setUser}/>
        },
        {
            path: "/user/settings",
            element: <UserPanel user={user} setUser={setUser}/>
        },
        {
            path: "/user/settings/change/email",
            element: <ChangeEmail user={user} setUser={setUser}/>
        },
        {
            path: "/user/settings/change/password",
            element: <ChangePassword user={user} setUser={setUser}/>
        },
        {
            path: "/user/settings/change/first_name",
            element: <ChangeFirstName user={user} setUser={setUser}/>
        },
        {
            path: "/user/settings/change/last_name",
            element: <ChangeLastName user={user} setUser={setUser}/>
        },
        {
            path: "/user/settings/change/phone_number",
            element: <ChangePhoneNumber user={user} setUser={setUser}/>
        },
        {
            path: "/search/:searchQuery",
            element: <SearchPage user={user} setUser={setUser}/>
        },
        {
            path: "/user/reservations",
            element: <ReservationPage user={user} setUser={setUser}/>
        },

    ])
    return <RouterProvider router={router}/>;

    async function getUserDetails() {
        getUserByTokenApi().then(response => {
            response.json().then((message) => {
                setUser(message)
            })
        })
    }

}


export default Router