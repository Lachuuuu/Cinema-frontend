import TopBar from "../../../components/topBar/TopBar";
import {Form, useNavigate} from "react-router-dom";
import Styles from "../AdminPages.module.css"
import GlassBox from "../../../components/GlassBox";
import {Button, CircularProgress, FormControl, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {downloadAllMoviesApi, removeMovieApi} from "../../../api/Api";

function RemoveMovie(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [waiting, setWaiting] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)

    useEffect(() => {
        getAllMovies()
    }, [])

    return (<div className={Styles.centerBox}>
            <TopBar user={user} setUser={setUser}/>
            <GlassBox className={Styles.centerBox}>
                <Form onSubmit={handleSubmit}>
                    <FormControl>
                        <h3>Select Movie</h3>
                        <TextField className={Styles.Select}
                                   select
                                   label="Movie"
                                   onChange={event => setSelectedMovie(event.target.value)}
                                   required={true}
                        >
                            {movies.map(movie =>
                                <MenuItem value={movie.id}>{movie.name}</MenuItem>
                            )}
                        </TextField>
                        {waiting
                            ? <CircularProgress/>
                            : <Button type="submit"
                                      variant="contained"
                            >
                                Remove Movie
                            </Button>
                        }
                    </FormControl>
                </Form>
            </GlassBox>
        </div>
    );

    async function getAllMovies() {
        await downloadAllMoviesApi().then(response => {
            if (response.ok) {
                response.json().then(data => setMovies(data))
            }
        })
    }

    async function handleSubmit() {
        setWaiting(true)
        await removeMovieApi(selectedMovie).then(response => {
                console.log(response.status)
                response.json().then(data => console.log(data))
            }
        )
        setWaiting(false)
    }
}

export default RemoveMovie