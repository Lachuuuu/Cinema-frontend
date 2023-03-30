import TopBar from "../../../components/topBar/TopBar";
import {Form, useNavigate} from "react-router-dom";
import Styles from "../AdminPages.module.css"
import GlassBox from "../../../components/GlassBox";
import {Button, CircularProgress, FormControl, TextField} from "@mui/material";
import {useState} from "react";
import {addGenreApi} from "../../../api/Api";

function AddGenre(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [newGenre, setNewGenre] = useState([])
    const [waiting, setWaiting] = useState(false)


    return (<div className={Styles.centerBox}>
            <TopBar user={user} setUser={setUser}/>
            <GlassBox className={Styles.centerBox}>
                <Form onSubmit={handleSubmit}>
                    <FormControl>
                        <h3>New Genre</h3>
                        <TextField className={Styles.Select}
                                   label="genre"
                                   onChange={event => setNewGenre(event.target.value)}
                                   required={true}
                        ></TextField>
                        {waiting
                            ? <CircularProgress/>
                            : <Button type="submit"
                                      variant="contained"
                            >
                                Add Genre
                            </Button>
                        }
                    </FormControl>
                </Form>
            </GlassBox>
        </div>
    );

    async function handleSubmit() {
        setWaiting(true)
        addGenreApi(newGenre)
            .then(response => {
                console.log(response)
                response.json().then(data => console.log(data))
            })
        setWaiting(false)
    }
}

export default AddGenre