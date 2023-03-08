import Styles from "./RegisterPage.module.css"
import {Alert, Button, Fade, FormControl, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import getApiUrl from "../api/ApiUrl";
import getUrl from "../api/GetUrl";
import BoldedLink from "../components/BoldedLink";
import {DateField, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Form} from "react-router-dom";

function RegisterPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [bDate, setBDate] = useState()
    const [phoneNumber, setPhoneNumber] = useState("")


    const [responseStatus, setResponseStatus] = useState(-1)
    const [error, setError] = useState(false)
    const errorMessage = "coś poszło nie tak! :C"

    useEffect(() => {
        let cookie = getCookie("logedIn")

        if (cookie != null) window.location.replace(getUrl())

        function getCookie(cookie_name) {
            const value = "; " + document.cookie
            const parts = value.split("; " + cookie_name + "=")
            if (parts.length === 2) return parts.pop().split(";").shift()
            else return null
        }
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
            <div className={Styles.registerBox}>
                <h1>Rejestracja</h1>
                <Form onSubmit={event => validateForm(event)}>
                    <FormControl className={Styles.form}>
                        <TextField id="email"
                                   label="email"
                                   variant="outlined"
                                   className={Styles.formElement}
                                   onChange={event => setEmail(event.target.value)}
                                   required={true}
                                   InputLabelProps={{required: false}}
                        />
                        <TextField type="password"
                                   id="password"
                                   label="hasło"
                                   variant="outlined"
                                   className={Styles.formElement}
                                   onChange={event => setPassword(event.target.value)}
                                   required={true}
                                   InputLabelProps={{required: false}}
                        />
                        <TextField id="firstName"
                                   label="imię"
                                   variant="outlined"
                                   className={Styles.formElement}
                                   onChange={event => setFirstName(event.target.value)}
                                   required={true}
                                   InputLabelProps={{required: false}}
                        />
                        <TextField id="lastName"
                                   label="nazwisko"
                                   variant="outlined"
                                   className={Styles.formElement}
                                   onChange={event => setLastName(event.target.value)}
                                   required={true}
                                   InputLabelProps={{required: false}}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateField
                                className={Styles.formElement}
                                onChange={newValue => setBDate(newValue)}
                                required={true}
                            />
                        </LocalizationProvider>
                        <TextField type="phone"
                                   id="phoneNumber"
                                   label="numer telefonu"
                                   variant="outlined"
                                   className={Styles.formElement}
                                   onChange={event => setPhoneNumber(event.target.value)}
                                   required={true}
                                   InputLabelProps={{required: false}}
                                   inputProps={{maxLength: 9}}
                        />

                        <Button type="submit"
                                className={Styles.submitButton}
                                variant="contained">
                            Zarejestruj
                        </Button>
                        <Fade in={error} unmountOnExit={true}>
                            <Alert className={Styles.alert} variant="filled" severity="error">{errorMessage}</Alert>
                        </Fade>
                    </FormControl>
                </Form>
                Masz już konto?
                <BoldedLink href="/login">
                    Zaloguj się
                </BoldedLink>
            </div>
        </div>
    );

    async function validateForm(event) {
        event.preventDefault()

        if (bDate < new Date())
            await fetch(getApiUrl() + "auth/register", {
                    method: "POST",
                    body: JSON.stringify({
                        email: {email}.email,
                        password: {password}.password,
                        firstName: {firstName}.firstName,
                        lastName: {lastName}.lastName,
                        bDate: {bDate}.bDate,
                        phoneNumber: {phoneNumber}.phoneNumber
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

export default RegisterPage;