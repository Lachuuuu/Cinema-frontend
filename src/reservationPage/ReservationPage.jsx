import TopBar from "../components/topBar/TopBar";
import Styles from "./ReservationPage.module.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserReservationsApi} from "../api/Api";
import GlassBox from "../components/GlassBox";
import MovieDescriptionHeader from "../components/MovieDescriptionHeader";

function ReservationPage(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [reservations, setReservations] = useState([])

    useEffect(() => {
        getUserReservationsApi()
            .then(result =>
                result.json()
                    .then(data =>
                        setReservations(data)
                    )
            )
    }, [])

    useEffect(() => {
        console.log(reservations)
    }, [reservations])

    return (<>
        <TopBar user={user} setUser={setUser}/>
        <div className={Styles.center}>
            <div className={Styles.reservationsBox}>
                {reservations.map(reservation =>
                    <GlassBox className={Styles.reservation}>
                        <div className={Styles.line}>
                            <MovieDescriptionHeader>id rezerwacji:</MovieDescriptionHeader> {reservation.id}
                        </div>
                        <div className={Styles.line}>
                            <MovieDescriptionHeader>numery wybranych
                                miejsc:</MovieDescriptionHeader> {reservation.seatIds.join(" ")}
                        </div>
                        <div className={Styles.line}>
                            <MovieDescriptionHeader>Typy biletów:</MovieDescriptionHeader>
                        </div>
                        <div className={Styles.line}>
                            normalne: {reservation.normal}
                        </div>
                        <div className={Styles.line}>
                            ulgowe: {reservation.discount}
                        </div>
                        <div className={Styles.line}>
                            <MovieDescriptionHeader>Do zapłaty:</MovieDescriptionHeader> {reservation.totalValue}
                        </div>
                        <div className={Styles.line}>
                            <MovieDescriptionHeader>Nr sali:</MovieDescriptionHeader> {reservation.hallId}
                        </div>
                        <div className={Styles.line}>
                            <MovieDescriptionHeader>Tytuł:</MovieDescriptionHeader> {reservation.movieTitle}
                        </div>
                        <div className={Styles.line}>
                            <MovieDescriptionHeader>Czas:</MovieDescriptionHeader> {reservation.showingTime.join("-")}
                        </div>
                    </GlassBox>
                )}
            </div>
        </div>
    </>);

}

export default ReservationPage