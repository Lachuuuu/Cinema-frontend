import TopBar from "../components/topBar/TopBar";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {searchApi} from "../api/Api";
import Styles from "./SearchPage.module.css"
import GlassBox from "../components/GlassBox";

function SearchPage(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const {searchQuery} = useParams()
    const [movies, setMovies] = useState([])

    useEffect(() => {
        searchApi(searchQuery).then(response => {
            if (response.ok) response.json().then(movies => setMovies(movies))
        })
    }, [searchQuery])

    return (<>
        <TopBar user={user} setUser={setUser}/>
        <div className={Styles.allMoviesBox}>
            {movies.map(movie =>
                <GlassBox className={Styles.movieBox}>
                    <img src={movie.image} className={Styles.movieImage} id={movie.id}
                         onClick={event => handleMovieClick(event.target.id)}/>
                    <h4>{movie.name}</h4>
                </GlassBox>)}
        </div>
    </>);

    function handleMovieClick(id) {
        navigate("/movie/" + id)
    }
}

export default SearchPage