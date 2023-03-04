import Styles from "./LoginPage.module.css"
import {Button, FormControl, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import getApiUrl from "../api/ApiUrl";

function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        // window.location.replace(getUrl());
        // dodaj przekierowanie do mainPage jak user zalogowany na podstawie cookie
    })

    return (
        <div className={Styles.main}>
            <div className={Styles.loginBox}>
                <h1> login form</h1>
                <form onSubmit={event => validateForm(event)}>
                    <FormControl className={Styles.form}>
                        <TextField id="email"
                                   label="email"
                                   variant="outlined"
                                   className={Styles.formElement}
                                   onChange={event => setEmail(event.target.value)}/>
                        <TextField type="password"
                                   id="password"
                                   label="password"
                                   variant="outlined"
                                   className={Styles.formElement}
                                   onChange={event => setPassword(event.target.value)}/>
                        <Button type="submit"
                                className={Styles.submitButton}
                                variant="contained">
                            Submit
                        </Button>
                    </FormControl>
                </form>
            </div>
        </div>
    );

    async function validateForm(event) {
        event.preventDefault()
        protectedTest()
        await fetch(getApiUrl() + "auth/authenticate",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    email: {email}.email,
                    password: {password}.password
                })
            }
        ).then(res => console.log(res.status))
        protectedTest()

    }

    function protectedTest() {
        fetch(getApiUrl() + "protected/test",
            {
                method: "GET",
                credentials: "include",
            }
        ).then(res => console.log(res.status))
    }
}

export default LoginPage;
