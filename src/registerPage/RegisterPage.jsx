import Styles from "./RegisterPage.module.css"
import {Alert, Button, CircularProgress, Fade, FormControl, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import getApiUrl from "../api/ApiUrl";
import BoldedLink from "../components/BoldedLink";
import {DateField, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Form} from "react-router-dom";
import {formatDate} from "../api/Api";
import TopBar from "../components/topBar/TopBar";

function RegisterPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [bDate, setBDate] = useState()
    const [phoneNumber, setPhoneNumber] = useState("")


    const [responseStatus, setResponseStatus] = useState(-1)
    const [responseMessage, setResponseMessage] = useState("")
    const [error, setError] = useState(false)
    const [responseOk, setResponseOk] = useState(false)
    const [waiting, setWaiting] = useState(false)

    useEffect(() => {
        if (responseStatus === 200) {
            setResponseOk(true)
            setTimeout(() => {
                setResponseOk(false)
            }, 5000)
        } else if ((responseStatus > 299 || responseStatus < 200) && responseStatus !== -1) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
        }
        setResponseStatus(-1)
    }, [error, responseStatus])

    return (
        <>
            <TopBar/>
            <div className={Styles.main}>
                <div className={Styles.registerBox}>
                    <h1>Rejestracja</h1>
                    <Form onSubmit={event => validateForm(event)} className={Styles.form}>
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
                                    error={false}
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
                            {waiting
                                ? <CircularProgress/>
                                : <Button type="submit"
                                          className={Styles.submitButton}
                                          variant="contained">
                                    Zarejestruj
                                </Button>
                            }


                            <Fade in={error} unmountOnExit={true}>
                                <Alert className={Styles.alert} variant="filled"
                                       severity="error">{responseMessage}</Alert>
                            </Fade>
                            <Fade in={responseOk} unmountOnExit={true}>
                                <Alert className={Styles.alert} variant="filled"
                                       severity="success">{responseMessage}</Alert>
                            </Fade>

                        </FormControl>
                    </Form>
                    Masz już konto?
                    <BoldedLink href="/login">
                        Zaloguj się
                    </BoldedLink>
                </div>
            </div>
        </>
    );

    async function validateForm(event) {
        event.preventDefault()
        setWaiting(true)
        await fetch(getApiUrl() + "auth/register", {
                method: "POST",
                body: JSON.stringify({
                    email: {email}.email,
                    password: {password}.password,
                    firstName: {firstName}.firstName,
                    lastName: {lastName}.lastName,
                    bDate: formatDate({bDate}.bDate),
                    phoneNumber: {phoneNumber}.phoneNumber
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            setResponseStatus(response.status)
            response.json().then((message) => {
                if (message.length < 1)
                    setResponseMessage("error")
                else
                    setResponseMessage(message)
            })
        })
        setWaiting(false)
    }
}

export default RegisterPage;