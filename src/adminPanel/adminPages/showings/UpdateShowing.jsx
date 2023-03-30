import TopBar from "../../../components/topBar/TopBar";
import {Form, useNavigate} from "react-router-dom";
import Styles from "../AdminPages.module.css"
import GlassBox from "../../../components/GlassBox";
import {Button, CircularProgress, FormControl, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {downloadAllHallsApi, downloadAllMoviesApi, downloadAllShowingsApi, updateShowingApi} from "../../../api/Api";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

function UpdateShowing(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [showings, setShowings] = useState([])
    const [halls, sethalls] = useState([])
    const [movies, setMovies] = useState([])
    const [waiting, setWaiting] = useState(false)
    const [selectedShowing, setSelectedShowing] = useState(null)
    const [selectedShowingObject, setSelectedShowingObject] = useState(null)
    const [error, setError] = useState(null)

    const [selectedShowingName, setSelectedShowingName] = useState(null)
    const [selectedShowingHall, setSelectedShowingHall] = useState(null)
    const [selectedShowingTime, setSelectedShowingTime] = useState(null)
    const [selectedShowingMovie, setSelectedShowingMovie] = useState(null)

    const [newName, setNewName] = useState(null)
    const [newHall, setNewHall] = useState(null)
    const [newMovie, setNewMovie] = useState(null)
    const [newStartTime, setNewStartTime] = useState(null)

    useEffect(() => {
        getAllShowings()
        getAllMovies()
        getAllHalls()
    }, [])

    useEffect(() => {
        setSelectedShowingObject(showings.find(it => it.id === selectedShowing))
    }, [selectedShowing])

    useEffect(() => {
        console.log(selectedShowingObject)
        if (selectedShowingObject != null) {
            setSelectedShowingName(selectedShowingObject.name)
            let hallName = halls.find(it => it.id === selectedShowingObject.hall).name
            if (hallName != null) setSelectedShowingHall(hallName)
            setSelectedShowingMovie(selectedShowingObject.movie)
            setSelectedShowingTime(selectedShowingObject.showingStartTime.join("-"))
        }
    }, [selectedShowingObject])

    return (<div className={Styles.centerBox}>
            <TopBar user={user} setUser={setUser}/>
            <GlassBox className={Styles.centerBox}>
                <Form onSubmit={handleSubmit}>
                    <FormControl>
                        <h3>Select Showing</h3>
                        <TextField className={Styles.select}
                                   select
                                   label="Showing"
                                   onChange={event => setSelectedShowing(event.target.value)}
                                   required={true}
                        >
                            {showings.map(showing =>
                                <MenuItem value={showing.id}>{showing.name}</MenuItem>
                            )}
                        </TextField>
                        {selectedShowing != null &&
                            <div className={Styles.formBox}>
                                <h3>Showing name</h3>
                                <TextField className={Styles.select}
                                           onChange={event => setNewName(event.target.value)}
                                           label={selectedShowingName}
                                ></TextField>
                                <h3>Showing hall</h3>
                                <TextField className={Styles.select}
                                           onChange={event => setNewHall(event.target.value)}
                                           label={selectedShowingHall}
                                           select
                                >
                                    <MenuItem value={null}>default</MenuItem>
                                    {halls.map(hall =>
                                        <MenuItem value={hall.id}>{hall.name}</MenuItem>
                                    )}
                                </TextField>
                                <h3>Showing movie</h3>
                                <TextField className={Styles.select}
                                           onChange={event => setNewMovie(event.target.value)}
                                           label={selectedShowingMovie}
                                           select
                                >
                                    <MenuItem value={null}>default</MenuItem>
                                    {movies.map(movie =>
                                        <MenuItem value={movie.id}>{movie.name}</MenuItem>
                                    )}
                                </TextField>
                                <h3>Showing start time</h3>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        disablePast={true}
                                        ampm={false}
                                        label={selectedShowingTime}
                                        value={newStartTime}
                                        onError={(newError) => setError(newError)}
                                        onChange={setNewStartTime}
                                    />
                                </LocalizationProvider>
                            </div>
                        }
                        {waiting
                            ? <CircularProgress/>
                            : <Button type="submit"
                                      variant="contained"
                            >
                                Update Showing
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

    async function getAllHalls() {
        await downloadAllHallsApi().then(response => {
            if (response.ok) {
                response.json().then(data => sethalls(data))
            }
        })
    }

    async function getAllMovies() {
        await downloadAllMoviesApi().then(response => {
            if (response.ok) {
                response.json().then(data => setMovies(data))
            }
        })
    }

    async function handleSubmit() {
        console.log(selectedShowing)
        console.log(newName)
        console.log(newHall)
        console.log(newMovie)
        console.log(newStartTime)

        if (error == null) {
            setWaiting(true)
            await updateShowingApi(selectedShowing, newName, newHall, newMovie, newStartTime)
            setWaiting(false)
        }
    }
}

export default UpdateShowing