import Styles from "./UserPanel.module.css"
import TopBar from "../components/topBar/TopBar";
import 'react-awesome-slider/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import GlassBox from "../components/GlassBox";
import {Divider} from "@mui/material";
import UserDetailsHeader from "../components/UserDetailsHeader";
import {useNavigate} from "react-router-dom";

function UserPanel(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    return (<>
            <div className={Styles.main}>
                <TopBar user={user} setUser={setUser}/>
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
                    <div className={Styles.option} id="/user/settings/change/email"
                         onClick={event => navigate(event.target.id)}>Change Email
                    </div>
                    <Divider className={Styles.divider}/>
                    <div className={Styles.option} id="/user/settings/change/password"
                         onClick={event => navigate(event.target.id)}>Change Password
                    </div>
                    <Divider className={Styles.divider}/>
                    <div className={Styles.option} id="/user/settings/change/first_name"
                         onClick={event => navigate(event.target.id)}>Change First Name
                    </div>
                    <Divider className={Styles.divider}/>
                    <div className={Styles.option} id="/user/settings/change/last_name"
                         onClick={event => navigate(event.target.id)}>Change Last Name
                    </div>
                    <Divider className={Styles.divider}/>
                    <div className={Styles.option} id="/user/settings/change/phone_number"
                         onClick={event => navigate(event.target.id)}>Change Phone Number
                    </div>
                    <Divider className={Styles.divider}/>
                </GlassBox>
            </div>
        </>
    );
}

export default UserPanel;
