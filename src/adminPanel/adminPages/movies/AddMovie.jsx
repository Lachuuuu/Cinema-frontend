import TopBar from "../../../components/topBar/TopBar";
import {Form, useNavigate} from "react-router-dom";
import Styles from "../AdminPages.module.css"
import GlassBox from "../../../components/GlassBox";
import {Button, CircularProgress, FormControl, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {addMovieApi, downloadAllGenresApi} from "../../../api/Api";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

function AddMovie(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [waiting, setWaiting] = useState(false)
    const [allGenres, setAllGenres] = useState([])
    const [error, setError] = useState(null)

    const [movieName, setMovieName] = useState("")
    const [movieDescription, setMovieDescription] = useState("")
    const [movieDuration, setMovieDuration] = useState(0)
    const [moviePremiereDate, setMoviePremiereDate] = useState(null)
    const [movieGenres, setMovieGenres] = useState([])
    const [movieMinAge, setMovieMinAge] = useState(0)
    const [movieImage, setMovieImage] = useState(null)
    const [movieImagePreview, setMovieImagePreview] = useState(null)


    useEffect(() => {
        getAllGenres()
    }, [])

    return (<div className={Styles.centerBox}>
            <TopBar user={user} setUser={setUser}/>
            <GlassBox className={Styles.centerBox}>
                <Form onSubmit={handleSubmit}>
                    <FormControl>
                        <h3>Movie title</h3>
                        <TextField className={Styles.Select}
                                   label="Title"
                                   required={true}
                                   value={movieName}
                                   onChange={event => setMovieName(event.target.value)}
                        ></TextField>

                        <h3>Movie Description</h3>
                        <TextField className={Styles.Select}
                                   label="Description"
                                   required={true}
                                   value={movieDescription}
                                   onChange={event => setMovieDescription(event.target.value)}
                                   multiline
                                   rows={10}
                        ></TextField>

                        <h3>Movie Duration</h3>
                        <TextField className={Styles.Select}
                                   label="Duration"
                                   required={true}
                                   value={movieDuration}
                                   onChange={event => setMovieDuration(event.target.value)}
                                   type="number"
                                   InputProps={{
                                       inputProps: {min: 0}
                                   }}
                        ></TextField>

                        <h3>Movie Premiere Date</h3>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                required={true}
                                value={moviePremiereDate}
                                onError={(newError) => setError(newError)}
                                onChange={setMoviePremiereDate}
                            />
                        </LocalizationProvider>

                        <h3>Movie Genres</h3>
                        <TextField className={Styles.Select}
                                   select
                                   label="Genres"
                                   required={true}
                                   SelectProps={{
                                       multiple: true,
                                       value: movieGenres
                                   }}
                                   value={movieGenres}
                        >
                            {allGenres.map(genre =>
                                <MenuItem id={genre.id}
                                          onClick={event => addMovieGenre(event)}
                                          value={genre.id}>{genre.name}</MenuItem>
                            )}
                        </TextField>

                        <h3>Movie Minimum Age</h3>
                        <TextField className={Styles.Select}
                                   label="Age"
                                   required={true}
                                   value={movieMinAge}
                                   onChange={event => setMovieMinAge(event.target.value)}
                                   type="number"
                                   InputProps={{
                                       inputProps: {min: 0}
                                   }}
                        ></TextField>

                        <Button type='file' variant="contained" onClick={e => handleFileUpload(e)}>
                            Upload movie image
                        </Button>

                        <input
                            type='file'
                            id="uploadfile"
                            className={Styles.displayNone}
                            onChange={event => handleFile(event)}
                            accept="image/jpeg"
                        />

                        {movieImagePreview != null &&
                            <div>
                                <img src={movieImagePreview} className={Styles.movieImagePreview}/>
                            </div>
                        }

                        {waiting
                            ? <CircularProgress/>
                            : <Button type="submit"
                                      variant="contained"
                            >
                                Add Movie
                            </Button>
                        }
                    </FormControl>
                </Form>
            </GlassBox>
        </div>
    );

    function handleFileUpload(event) {
        event.preventDefault()
        document.getElementById("uploadfile").click()
    }

    function handleFile(event) {
        getBase64(event.target.files[0])
    }

    function getBase64(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            setMovieImage(reader.result.substring(23))
            setMovieImagePreview(reader.result)
        }
    }

    function addMovieGenre(event) {

        let genreId = parseInt(event.target.id)
        let genres = movieGenres
        let find = movieGenres.findIndex(it => it == genreId)
        if (find == -1) {
            genres.push(genreId)
            setMovieGenres(genres)
        } else {
            genres.splice(find, 1)
            setMovieGenres(genres)
        }
    }

    function getAllGenres() {
        downloadAllGenresApi().then(response => {
                response.json().then(data => setAllGenres(data))
            }
        )
    }

    async function handleSubmit() {
        setWaiting(true)
        await addMovieApi(movieName,
            movieDescription,
            movieDuration,
            moviePremiereDate,
            movieGenres,
            movieMinAge,
            movieImage
        ).then(response => {
            console.log(response.status)
        })
        setWaiting(false)
    }
}

export default AddMovie