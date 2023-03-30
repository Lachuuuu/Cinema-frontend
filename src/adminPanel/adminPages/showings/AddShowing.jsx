import TopBar from "../../../components/topBar/TopBar";
import {Form, useNavigate} from "react-router-dom";
import Styles from "../AdminPages.module.css"
import GlassBox from "../../../components/GlassBox";
import {Button, CircularProgress, FormControl, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {addShowingApi, downloadAllHallsApi, downloadAllMoviesApi} from "../../../api/Api";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

function AddShowing(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [halls, sethalls] = useState([])
    const [movies, setMovies] = useState([])
    const [selectedHall, setSelectedHall] = useState(null)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [showingName, setShowingName] = useState(null)
    const [waiting, setWaiting] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        getAllMovies()
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
                                   onChange={event => setSelectedHall(event.target.value)}
                                   required={true}
                        >
                            {halls.map(hall =>
                                <MenuItem value={hall.id}>{hall.name}</MenuItem>
                            )}
                        </TextField>
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
                        <h3>Showing name</h3>
                        <TextField className={Styles.Select}
                                   label="name"
                                   onChange={event => setShowingName(event.target.value)}
                                   required={true}
                        ></TextField>
                        <h3>Select Show Start Time</h3>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                disablePast={true}
                                ampm={false}
                                required={true}
                                value={selectedDate}
                                onError={(newError) => setError(newError)}
                                onChange={setSelectedDate}
                            />
                        </LocalizationProvider>
                        {waiting
                            ? <CircularProgress/>
                            : <Button type="submit"
                                      variant="contained"
                            >
                                Add Showing
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

    async function getAllHalls() {
        await downloadAllHallsApi().then(response => {
            if (response.ok) {
                response.json().then(data => sethalls(data))
            }
        })
    }

    async function handleSubmit() {
        console.log(showingName)
        if (selectedDate != null && error == null) {
            setWaiting(true)
            await addShowingApi(selectedDate.toISOString(), selectedHall, selectedMovie, showingName)
            setWaiting(false)
        }
    }
}

export default AddShowing