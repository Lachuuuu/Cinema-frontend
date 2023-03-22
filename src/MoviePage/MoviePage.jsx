import Styles from "./MoviePage.module.css"
import {useEffect, useState} from "react";
import TopBar from "../components/topBar/TopBar";
import getApiUrl from "../api/ApiUrl";
import 'react-awesome-slider/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import {useParams} from "react-router-dom";
import GlassBox from "../components/GlassBox";
import MovieDescriptionHeader from "../components/MovieDescriptionHeader";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import classNames from "classnames";

function MoviePage() {

    const [responseStatus, setResponseStatus] = useState(-1)
    const [movie, setMovie] = useState(null)
    const [open, setOpen] = useState(false)
    const [normalTicket, setNormalTicket] = useState(0)
    const [discountTicket, setDiscountTicket] = useState(0)
    const [dialogScreenId, setDialogScreenId] = useState(0)
    const [showing, setShowing] = useState(null)
    const choosenSeats = []
    let seatId = -1;

    const {movieId} = useParams()

    useEffect(() => {
        downloadMovie();
    }, [])

    useEffect(() => {
        console.log(movie)
    }, [movie])

    useEffect(() => {
        console.log(showing)
    }, [showing])

    useEffect(() => {
        console.log(choosenSeats)
    }, [choosenSeats])


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
                        <div>
                            {movie.showings.map(it => <Button onClick={event => handleOpenDialog(event.target.value)}
                                                              value={it.id}>{it.showingStartTime}</Button>)}
                        </div>
                    </GlassBox>
                }
            </div>

            <Dialog open={open} onClose={handleCloseDialog}>
                {dialogScreenId === 0 && <>
                    <DialogTitle>Wybierz bilety</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            normal - 15 PLN
                            student/kid - 10 PLN
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="normal"
                            label="normal ticket"
                            type="number"
                            variant="standard"
                            InputProps={{inputProps: {min: 0}}}
                            onChange={event => setNormalTicket(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="discount"
                            label="student/kid"
                            type="number"
                            variant="standard"
                            InputProps={{inputProps: {min: 0}}}
                            onChange={event => setDiscountTicket(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleNextScreen}>Next</Button>
                    </DialogActions>
                </>
                }
                {dialogScreenId === 1 && <>
                    <DialogTitle>Wybierz miejsca</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            zielone - wolne
                            czerwone - zajete
                        </DialogContentText>
                        <div className={Styles.seatsBox}>
                            {showing.hall.seatsMap.split('|').map(row =>
                                <div className={Styles.rowBox}>
                                    {row.split('').map(it => chooseSeat(it))}
                                </div>
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleNextScreen}>Next</Button>
                    </DialogActions>
                </>
                }
            </Dialog>
        </>
    );

    function handleCloseDialog() {
        setOpen(false)
        setDialogScreenId(0)
        seatId = -1;
    }

    function handleOpenDialog(id) {
        setOpen(true)
        setShowing(movie.showings.find(element => element.id == id))
    }

    function handleNextScreen() {
        if (dialogScreenId != 0 || (dialogScreenId == 0 && (normalTicket > 0 || discountTicket > 0)))
            if (dialogScreenId === 1) setDialogScreenId(0)
            else setDialogScreenId(dialogScreenId + 1)
    }

    function chooseSeat(it) {
        seatId++
        switch (it) {
            case '0':
                return <div className={classNames(Styles.seatFlor)}></div>
                break;
            case '1':
                return <div className={classNames(Styles.seatFree, Styles.seat)}
                            onClick={event => takeSeat(event.target.getAttribute("seatid"), event.target)}
                            seatid={seatId}></div>
                break;
            case '2':
                return <div className={classNames(Styles.seatTaken)}></div>
                break;
            default:
                return <br/>
                break;
        }
    }

    function takeSeat(id, target) {
        const indexOfElement = choosenSeats.indexOf(id)
        if (choosenSeats.length < parseInt(normalTicket) + parseInt(discountTicket) || indexOfElement != -1) {
            target.classList.toggle(Styles.seatChoosen)
            if (indexOfElement == -1) choosenSeats.push(id)
            else choosenSeats.splice(indexOfElement, 1)
        }
    }

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
