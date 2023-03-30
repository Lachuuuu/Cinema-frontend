import TopBar from "../../../components/topBar/TopBar";
import {Form, useNavigate} from "react-router-dom";
import Styles from "../AdminPages.module.css"
import GlassBox from "../../../components/GlassBox";
import {Button, CircularProgress, FormControl, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {downloadAllGenresApi, removeGenreApi} from "../../../api/Api";

function RemoveGenre(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [chosenGenre, setChosenGenre] = useState(null)
    const [waiting, setWaiting] = useState(false)
    const [allGenres, setAllGenres] = useState([])

    useEffect(() => {
        getAllGenries()
    }, [])


    return (<div className={Styles.centerBox}>
            <TopBar user={user} setUser={setUser}/>
            <GlassBox className={Styles.centerBox}>
                <Form onSubmit={handleSubmit}>
                    <FormControl>
                        <h3>Remove Genre</h3>
                        <TextField className={Styles.Select}
                                   label="genre"
                                   select
                                   onChange={event => setChosenGenre(event.target.value)}
                                   required={true}
                        >
                            {
                                allGenres.map(genre => <MenuItem value={genre.id}>
                                    {genre.name}
                                </MenuItem>)
                            }
                        </TextField>
                        {waiting
                            ? <CircularProgress/>
                            : <Button type="submit"
                                      variant="contained"
                            >
                                Remove Genre
                            </Button>
                        }
                    </FormControl>
                </Form>
            </GlassBox>
        </div>
    );

    async function handleSubmit() {
        setWaiting(true)
        removeGenreApi(chosenGenre).then(response => {
            console.log(response)
            if (response.ok) response.json().then(data => console.log(data))
        })
        setWaiting(false)
    }

    async function getAllGenries() {
        downloadAllGenresApi().then(response => {
            if (response.ok) response.json().then(data => setAllGenres(data))
        })
    }
}

export default RemoveGenre