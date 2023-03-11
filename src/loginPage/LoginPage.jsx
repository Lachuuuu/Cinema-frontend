import Styles from "./LoginPage.module.css"
import {Alert, Button, Fade, FormControl, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import getApiUrl from "../api/ApiUrl";
import BoldedLink from "../components/BoldedLink";
import getUrl from "../api/GetUrl";
import {Form} from "react-router-dom";
import {getCookie} from "../api/Api";

function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [responseStatus, setResponseStatus] = useState(-1)
    const [error, setError] = useState(false)
    const errorMessage = "coś poszło nie tak! :C"

    useEffect(() => {
        let cookie = getCookie("email")

        if (cookie != null) window.location.replace(getUrl())
    })

    useEffect(() => {
        if ((responseStatus > 299 || responseStatus < 200) && responseStatus !== -1) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
            setResponseStatus(-1)

        }
    }, [error, responseStatus])

    return (
        <div className={Styles.main}>
            <div className={Styles.loginBox}>
                <h1>Logowanie</h1>
                <Form onSubmit={event => validateForm(event)}>
                    <FormControl className={Styles.form}>
                        <TextField id="email"
                                   label="email"
                                   variant="outlined"
                                   className={Styles.formElement}
                                   onChange={event => setEmail(event.target.value)}
                        />
                        <TextField type="password"
                                   id="password"
                                   label="hasło"
                                   variant="outlined"
                                   className={Styles.formElement}
                                   onChange={event => setPassword(event.target.value)}
                        />
                        <Button type="submit"
                                className={Styles.submitButton}
                                variant="contained">
                            Zaloguj
                        </Button>
                        <Fade in={error} unmountOnExit={true}>
                            <Alert className={Styles.alert} variant="filled" severity="error">{errorMessage}</Alert>
                        </Fade>
                    </FormControl>
                </Form>
                Nie masz konta?
                <BoldedLink href="/register">
                    Zarejestruj się
                </BoldedLink>
            </div>
        </div>
    );

    async function validateForm(event) {
        event.preventDefault()

        await fetch(getApiUrl() + "auth/authenticate", {
                method: "POST",
                body: JSON.stringify({
                    email: {email}.email,
                    password: {password}.password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }
        ).then(response => {
            setResponseStatus(response.status)
        })
    }
}

export default LoginPage;
