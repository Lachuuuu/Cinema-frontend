import Styles from "./MainPage.module.css"
import "./MainPage.module.css"
import {useEffect, useState} from "react";
import TopBar from "../components/topBar/TopBar";
import 'react-awesome-slider/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {downloadAllMoviesApi} from "../api/Api";
import {useNavigate} from "react-router-dom";

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

function MainPage(props) {

    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [responseStatus, setResponseStatus] = useState(-1)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        downloadMovies();
    }, [])

    return (<>
            <div className={Styles.main}>
                <TopBar user={user} setUser={setUser}/>
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
                                           onClick={event => navigate("/movie/" + event.target.id)}
                                           alt={"movieImage"}></img>)}
                    {responseStatus !== 200 && <div>we couldn't download movies</div>}
                </div>
            </div>
        </>
    );

    async function downloadMovies() {
        downloadAllMoviesApi().then(response => {
            setResponseStatus(response.status)
            response.json().then((message) => {
                setMovies(message)
            })
        })
    }
}

export default MainPage;
