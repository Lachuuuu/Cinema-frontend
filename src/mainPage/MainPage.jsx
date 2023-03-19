import Styles from "./MainPage.module.css"
import "./MainPage.module.css"
import {useEffect, useState} from "react";
import TopBar from "../components/topBar/TopBar";
import getApiUrl from "../api/ApiUrl";
import 'react-awesome-slider/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {changeLocation} from "../api/Api";

const images = [
    {
        source: 'https://picsum.photos/id/1018/1000/600/'
    },
    {
        source: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    },
];

const gallery = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        originalClass: Styles.movies,
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        originalClass: Styles.movies,
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        originalClass: Styles.movies,
    },
];

function MainPage() {

    const [responseStatus, setResponseStatus] = useState(-1)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        downloadMovies();
    }, [])

    return (<>
            <div className={Styles.main}>
                <TopBar/>
                <div className={Styles.gallery}>
                    <ImageGallery items={gallery}
                                  autoPlay={true}
                                  showFullscreenButton={false}
                                  showPlayButton={false}
                                  slideInterval={5000}
                    />
                </div>
                <h1 className={Styles.newMoviesHeader}>Repertuar:</h1>
                <div className={Styles.moviesBox}>
                    {movies.map(it => <img src={it.image} id={it.id} className={Styles.movie}
                                           onClick={event => changeLocation("movie/" + event.target.id)}></img>)}
                </div>
            </div>
        </>
    );

    async function downloadMovies() {
        await fetch(getApiUrl() + "movie/all", {
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
                setMovies(message)
            })
        })
    }
}

export default MainPage;
