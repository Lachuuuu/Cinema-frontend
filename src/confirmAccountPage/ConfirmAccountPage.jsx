import Styles from "./ConfirmAccountPage.module.css"
import {useEffect, useState} from "react";
import TopBar from "../components/topBar/TopBar";
import {useNavigate} from "react-router-dom";
import {tryToActivateAccountApi} from "../api/Api";

function ConfirmAccountPage(props) {

    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [responseStatus, setResponseStatus] = useState(-1)
    const [responseMessage, setResponseMessage] = useState("")

    useEffect(() => {
        const pathParams = new URLSearchParams(window.location.search)
        const token = pathParams.get('token')
        tryToActivateAccount(token)

        async function tryToActivateAccount(token) {
            await tryToActivateAccountApi(token).then(response => {
                setResponseStatus(response.status)
                response.json().then((message) => {
                    setResponseMessage(message)
                })
            })
            setTimeout(goBackToLoginPage, 5000)
        }
    }, [])

    function goBackToLoginPage() {
        navigate("/login")
    }

    return (<>
            <TopBar user={user} setUser={setUser}/>
            <div className={Styles.main}>
                <div className={Styles.messageBox}>
                    <h1>{responseMessage}</h1>
                </div>
            </div>
        </>
    );
}

export default ConfirmAccountPage;
