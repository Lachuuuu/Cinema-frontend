import Styles from "./ConfirmAccountPage.module.css"
import {useEffect, useState} from "react";
import getApiUrl from "../api/ApiUrl";
import {getUrl} from "../api/Utils";

function ConfirmAccountPage() {

    const [responseStatus, setResponseStatus] = useState(-1)
    const [responseMessage, setResponseMessage] = useState("")

    useEffect(() => {
        const pathParams = new URLSearchParams(window.location.search)
        const token = pathParams.get('token')
        tryToActivateAccount()

        async function tryToActivateAccount() {
            await fetch(getApiUrl() + "auth/confirm-account?token=" + token, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(response => {
                setResponseStatus(response.status)
                response.json().then((message) => {
                    setResponseMessage(message)
                })
            })

            setTimeout(goBackToLoginPage, 5000)

        }
    }, [])

    function goBackToLoginPage() {
        window.location.replace(getUrl() + "login")
    }

    return (
        <div className={Styles.main}>
            <div className={Styles.messageBox}>
                <h1>{responseMessage}</h1>
            </div>
        </div>
    );
}

export default ConfirmAccountPage;
