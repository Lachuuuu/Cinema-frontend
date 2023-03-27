import Styles from "./UpdatePages.module.css"
import {useEffect, useState} from "react";
import 'react-awesome-slider/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import {Form, useNavigate} from "react-router-dom";
import {Alert, Button, CircularProgress, Fade, FormControl, TextField} from "@mui/material";
import TopBar from "../../components/topBar/TopBar";
import GlassBox from "../../components/GlassBox";
import {updateFirstNameApi} from "../../api/Api";

function ChangeFirstName(props) {

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
            setResponseMessage("First name changed successfully")
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
                    <h1>Change your first name</h1>
                    <Form onSubmit={event => submitForm(event)}>
                        <FormControl>
                            <TextField id="new_first_name"
                                       label="old first name"
                                       variant="outlined"
                                       onChange={event => setOldValue(event.target.value)}
                                       required={true}
                                       InputLabelProps={{required: false}}
                                       className={Styles.formElement}
                            >
                            </TextField>
                            <TextField id="old_first_name"
                                       label="new first name"
                                       variant="outlined"
                                       onChange={event => setNewValue(event.target.value)}
                                       required={true}
                                       InputLabelProps={{required: false}}
                                       className={Styles.formElement}
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
        updateFirstNameApi(oldValue, newValue).then(response => {
            setResponseStatus(response.status)
            response.json().then((result) => {
                if (response.ok) {
                    setUser(result);
                } else {
                    if (result.length < 1)
                        setResponseMessage("error")
                    else
                        setResponseMessage(result)
                }
            })
        })
        setWaiting(false)
    }
}

export default ChangeFirstName;
