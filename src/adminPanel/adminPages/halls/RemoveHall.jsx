import TopBar from "../../../components/topBar/TopBar";
import {Form, useNavigate} from "react-router-dom";
import Styles from "../AdminPages.module.css"
import GlassBox from "../../../components/GlassBox";
import {Button, CircularProgress, FormControl, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {downloadAllHallsApi, removeHallApi} from "../../../api/Api";

function RemoveHall(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [halls, setHalls] = useState([])
    const [waiting, setWaiting] = useState(false)
    const [selectedHall, setSelectedHalls] = useState(null)

    useEffect(() => {
        getAllHalls()
    }, [])

    return (<div className={Styles.centerBox}>
            <TopBar user={user} setUser={setUser}/>
            <GlassBox className={Styles.centerBox}>
                <Form onSubmit={handleSubmit}>
                    <FormControl>
                        <h3>Select Hall</h3>
                        <TextField className={Styles.Select}
                                   select
                                   label="Hall"
                                   onChange={event => setSelectedHalls(event.target.value)}
                                   required={true}
                        >
                            {halls.map(hall =>
                                <MenuItem value={hall.id}>{hall.name}</MenuItem>
                            )}
                        </TextField>
                        {waiting
                            ? <CircularProgress/>
                            : <Button type="submit"
                                      variant="contained"
                            >
                                Remove Hall
                            </Button>
                        }
                    </FormControl>
                </Form>
            </GlassBox>
        </div>
    );

    async function getAllHalls() {
        await downloadAllHallsApi().then(response => {
            if (response.ok) {
                response.json().then(data => setHalls(data))
            }
        })
    }

    async function handleSubmit() {
        setWaiting(true)
        removeHallApi(selectedHall).then(response => {
            console.log(response)
            response.json().then(data => console.log(data))
        })
        setWaiting(false)
    }
}

export default RemoveHall