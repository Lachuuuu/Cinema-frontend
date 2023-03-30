import TopBar from "../../../components/topBar/TopBar";
import {Form, useNavigate} from "react-router-dom";
import Styles from "../AdminPages.module.css"
import GlassBox from "../../../components/GlassBox";
import {Button, CircularProgress, FormControl, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {downloadAllShowingsApi, removeShowingApi} from "../../../api/Api";

function RemoveShowing(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [showings, setShowings] = useState([])
    const [waiting, setWaiting] = useState(false)
    const [selectedShowing, setSelectedShowing] = useState(null)

    useEffect(() => {
        getAllShowings()
    }, [])

    return (<div className={Styles.centerBox}>
            <TopBar user={user} setUser={setUser}/>
            <GlassBox className={Styles.centerBox}>
                <Form onSubmit={handleSubmit}>
                    <FormControl>
                        <h3>Select Showing</h3>
                        <TextField className={Styles.Select}
                                   select
                                   label="Showing"
                                   onChange={event => setSelectedShowing(event.target.value)}
                                   required={true}
                        >
                            {showings.map(showing =>
                                <MenuItem value={showing.id}>{showing.name}</MenuItem>
                            )}
                        </TextField>
                        {waiting
                            ? <CircularProgress/>
                            : <Button type="submit"
                                      variant="contained"
                            >
                                Remove Showing
                            </Button>
                        }
                    </FormControl>
                </Form>
            </GlassBox>
        </div>
    );

    async function getAllShowings() {
        await downloadAllShowingsApi().then(response => {
            if (response.ok) {
                response.json().then(data => setShowings(data))
            }
        })
    }

    async function handleSubmit() {
        setWaiting(true)
        await removeShowingApi(selectedShowing).then(response => {
            console.log(response.status)
            response.json().then(it => {
                console.log(it)
            })
        })
        setWaiting(false)
    }
}

export default RemoveShowing