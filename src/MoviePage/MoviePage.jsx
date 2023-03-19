import Styles from "./MoviePage.module.css"
import {useEffect, useState} from "react";
import TopBar from "../components/topBar/TopBar";
import getApiUrl from "../api/ApiUrl";
import 'react-awesome-slider/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import {useParams} from "react-router-dom";
import GlassBox from "../components/GlassBox";
import MovieDescriptionHeader from "../components/MovieDescriptionHeader";

function MoviePage() {

    const [responseStatus, setResponseStatus] = useState(-1)
    const [movie, setMovie] = useState(null)

    const {movieId} = useParams()

    useEffect(() => {
        downloadMovie();
    }, [])

    return (<>
            <div className={Styles.main}>
                <TopBar/>
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

                    </GlassBox>
                }
            </div>
        </>
    );

    async function downloadMovie() {

        await fetch(getApiUrl() + "movie/" + movieId, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            }
        ).then(response => {
            setResponseStatus(response.status)
            response.json().then((message) => {
                setMovie(message)
            })
        })
    }
}

export default MoviePage;
