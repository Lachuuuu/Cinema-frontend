import TopBar from "../components/topBar/TopBar";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {searchApi} from "../api/Api";
import Styles from "./AdminPanel.module.css"
import GlassBox from "../components/GlassBox";
import {Divider} from "@mui/material";

function AdminPanel(props) {
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

    return (<div className={Styles.centerBox}>
        <TopBar user={user} setUser={setUser}/>
        <GlassBox className={Styles.optionsBox}>
            <div className={Styles.option} id="/admin/add/showing"
                 onClick={event => navigate(event.target.id)}>Add Showing
            </div>
            <Divider className={Styles.divider}/>
            <div className={Styles.option} id="/admin/remove/showing"
                 onClick={event => navigate(event.target.id)}>Remove Showing
            </div>
            <Divider className={Styles.divider}/>
            <div className={Styles.option} id="/admin/update/showing"
                 onClick={event => navigate(event.target.id)}>Update Showing
            </div>
            <Divider className={Styles.divider}/>
            <div className={Styles.option} id="/admin/add/hall"
                 onClick={event => navigate(event.target.id)}>Add Hall
            </div>
            <Divider className={Styles.divider}/>
            <div className={Styles.option} id="/admin/remove/hall"
                 onClick={event => navigate(event.target.id)}>Delete Hall
            </div>
            <Divider className={Styles.divider}/>
            <div className={Styles.option} id="/admin/add/movie"
                 onClick={event => navigate(event.target.id)}>Add Movie
            </div>
            <Divider className={Styles.divider}/>
            <div className={Styles.option} id="/admin/remove/movie"
                 onClick={event => navigate(event.target.id)}>Delete Movie
            </div>
            <Divider className={Styles.divider}/>
            <div className={Styles.option} id="/admin/add/genre"
                 onClick={event => navigate(event.target.id)}>Add Movie Genre
            </div>
            <Divider className={Styles.divider}/>
            <div className={Styles.option} id="/admin/remove/genre"
                 onClick={event => navigate(event.target.id)}>Remove Movie Genre
            </div>
            <Divider className={Styles.divider}/>
        </GlassBox>

    </div>);
}

export default AdminPanel