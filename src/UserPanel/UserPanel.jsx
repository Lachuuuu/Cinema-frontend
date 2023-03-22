import Styles from "./UserPanel.module.css"
import {useEffect, useState} from "react";
import TopBar from "../components/topBar/TopBar";
import getApiUrl from "../api/ApiUrl";
import 'react-awesome-slider/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import GlassBox from "../components/GlassBox";
import {Divider} from "@mui/material";
import UserDetailsHeader from "../components/UserDetailsHeader";
import {changeLocation} from "../api/Utils";

function UserPanel() {

    const [responseStatus, setResponseStatus] = useState(-1)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserDetails()
        console.log(user)
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

    return (<>
            <div className={Styles.main}>
                <TopBar/>
                <GlassBox className={Styles.credentialsBox}>
                    <h2>Twoje Dane</h2>
                    {user != null &&
                        <div className={Styles.userDetails}>
                            <div>
                                <UserDetailsHeader>email: </UserDetailsHeader>{user.email}
                            </div>
                            <div>
                                <UserDetailsHeader>first name: </UserDetailsHeader>{user.firstName}
                            </div>
                            <div>
                                <UserDetailsHeader>last name: </UserDetailsHeader>{user.lastName}
                            </div>
                            <div>
                                <UserDetailsHeader>phone number: </UserDetailsHeader>{user.phoneNumber}
                            </div>
                            <div>
                                <UserDetailsHeader>birth date: </UserDetailsHeader>{user.birthDate}
                            </div>
                        </div>
                    }
                </GlassBox>
                <GlassBox className={Styles.optionsBox}>
                    <div className={Styles.option} id="user/settings/change/email"
                         onClick={event => changeLocation(event.target.id)}>Change Email
                    </div>
                    <Divider className={Styles.divider}/>
                    <div className={Styles.option} id="user/settings/change/password"
                         onClick={event => changeLocation(event.target.id)}>Change Password
                    </div>
                    <Divider className={Styles.divider}/>
                    <div className={Styles.option} id="user/settings/change/first_name"
                         onClick={event => changeLocation(event.target.id)}>Change First Name
                    </div>
                    <Divider className={Styles.divider}/>
                    <div className={Styles.option} id="user/settings/change/last_name"
                         onClick={event => changeLocation(event.target.id)}>Change Last Name
                    </div>
                    <Divider className={Styles.divider}/>
                    <div className={Styles.option} id="user/settings/change/phone_number"
                         onClick={event => changeLocation(event.target.id)}>Change Phone Number
                    </div>
                    <Divider className={Styles.divider}/>
                </GlassBox>
            </div>
        </>
    );

    async function getUserDetails() {

        await fetch(getApiUrl() + "user/userByToken", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            }
        ).then(response => {
            setResponseStatus(response.status)
            response.json().then((message) => {
                setUser(message)
            })
        })
    }
}

export default UserPanel;
