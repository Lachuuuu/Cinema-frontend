import Styles from "./MoviePage.module.css"
import {useEffect, useState} from "react";
import TopBar from "../components/topBar/TopBar";
import 'react-awesome-slider/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import {useParams} from "react-router-dom";
import GlassBox from "../components/GlassBox";
import MovieDescriptionHeader from "../components/MovieDescriptionHeader";
import {Button} from "@mui/material";
import ShowingDialog from "./ShowingDialog/ShowingDialog";
import {downloadMovieByIdApi} from "../api/Api";

function MoviePage(props) {

    const user = props.user
    const setUser = props.setUser

    const {movieId} = useParams()

    const [responseStatus, setResponseStatus] = useState(-1)
    const [movie, setMovie] = useState(null)
    const [open, setOpen] = useState(false)
    const [showing, setShowing] = useState(null)

    useEffect(() => {
        downloadMovie(movieId);
    }, [])

    return (<>
            <div className={Styles.main}>
                <TopBar user={user} setUser={setUser}/>
                {movie !== null &&
                    <GlassBox className={Styles.movieBox}>
                        <img src={movie.image}></img>
                        <h1 className={Styles.header}>{movie.name}</h1>
                        <div>
                            <MovieDescriptionHeader>tags:</MovieDescriptionHeader> {movie.genres.map(it =>
                            <span>{it.name} </span>)}
                        </div>
                        <div>
                            <MovieDescriptionHeader>Duration:</MovieDescriptionHeader> {movie.durationMin} min
                        </div>
                        <div>
                            <MovieDescriptionHeader>premiere date:</MovieDescriptionHeader> {movie.premiereDate}
                        </div>
                        <div>
                            <MovieDescriptionHeader>Description:</MovieDescriptionHeader> {movie.description}
                        </div>
                        <div>
                            <MovieDescriptionHeader>Age:</MovieDescriptionHeader> {movie.minAge}+
                        </div>
                        <div>
                            {movie.showings.map(it => <Button onClick={event => handleOpenDialog(event.target.value)}
                                                              value={it.id}>{it.showingStartTime}</Button>)}
                        </div>
                    </GlassBox>
                }
            </div>
            <ShowingDialog open={open} setOpen={setOpen} showing={showing} user={user}/>
        </>
    );

    function handleOpenDialog(id) {
        setOpen(true)
        setShowing(movie.showings.find(element => element.id == id))
    }

    async function downloadMovie(movieId) {
        downloadMovieByIdApi(movieId).then(response => {
            setResponseStatus(response.status)
            response.json().then((message) => {
                setMovie(message)
            })
        })
    }
}

export default MoviePage;
