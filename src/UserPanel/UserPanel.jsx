import Styles from "./UserPanel.module.css"
import {useEffect, useState} from "react";
import TopBar from "../components/topBar/TopBar";
import getApiUrl from "../api/ApiUrl";
import 'react-awesome-slider/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import {useParams} from "react-router-dom";
import GlassBox from "../components/GlassBox";

function UserPanel() {

    const [responseStatus, setResponseStatus] = useState(-1)
    const [movie, setMovie] = useState(null)

    const {movieId} = useParams()

    useEffect(() => {

    }, [])

    return (<>
            <div className={Styles.main}>
                <TopBar/>
                <GlassBox>
                </GlassBox>
            </div>
        </>
    );

    async function downloadMovie() {

        await fetch(getApiUrl() + "movie/" + movieId, {
                method: "POST",
                body: JSON.stringify({
                    //email: {email}.email,
                    //password: {password}.password
                }),
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

export default UserPanel;
