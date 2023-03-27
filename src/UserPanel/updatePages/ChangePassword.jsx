import Styles from "./UpdatePages.module.css"
import {useEffect, useState} from "react";
import 'react-awesome-slider/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import {Form, useNavigate} from "react-router-dom";
import {Alert, Button, CircularProgress, Fade, FormControl, TextField} from "@mui/material";
import TopBar from "../../components/topBar/TopBar";
import GlassBox from "../../components/GlassBox";
import getApiUrl from "../../api/ApiUrl";

function ChangePassword(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [responseStatus, setResponseStatus] = useState(-1)
    const [responseMessage, setResponseMessage] = useState("")
    const [error, setError] = useState(false)
    const [responseOk, setResponseOk] = useState(false)
    const [oldValue, setOldValue] = useState("")
    const [newValue, setNewValue] = useState("")
    const [waiting, setWaiting] = useState(false)

    useEffect(() => {
        if (user == null) navigate("/")
    }, [])

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

    return (<>
            <div className={Styles.main}>
                <TopBar user={user} setUser={setUser}/>
                <GlassBox className={Styles.updateBox}>
                    <h1>Change your password</h1>
                    <Form onSubmit={event => submitForm(event)}>
                        <FormControl>
                            <TextField id="old_password"
                                       label="old password"
                                       variant="outlined"
                                       onChange={event => setOldValue(event.target.value)}
                                       required={true}
                                       InputLabelProps={{required: false}}
                                       className={Styles.formElement}
                                       type="password"
                            >
                            </TextField>
                            <TextField id="new_password"
                                       label="new password"
                                       variant="outlined"
                                       onChange={event => setNewValue(event.target.value)}
                                       required={true}
                                       InputLabelProps={{required: false}}
                                       className={Styles.formElement}
                                       type="password"
                            >
                            </TextField>
                            {waiting
                                ? <CircularProgress/>
                                : <Button type="submit"
                                          className={Styles.formElement}
                                          variant="contained">
                                    SUBMIT
                                </Button>
                            }
                        </FormControl>
                    </Form>
                    <Fade in={error} unmountOnExit={true}>
                        <Alert className={Styles.alert} variant="filled"
                               severity="error">{responseMessage}</Alert>
                    </Fade>
                    <Fade in={responseOk} unmountOnExit={true}>
                        <Alert className={Styles.alert} variant="filled"
                               severity="success">{responseMessage}</Alert>
                    </Fade>
                </GlassBox>
            </div>
        </>
    );

    async function submitForm(event) {
        event.preventDefault()
        setWaiting(true)
        await fetch(getApiUrl() + "user/change/password", {
                method: "POST",
                body: JSON.stringify({
                    oldValue: {oldValue}.oldValue,
                    newValue: {newValue}.newValue,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "include"
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

export default ChangePassword;
