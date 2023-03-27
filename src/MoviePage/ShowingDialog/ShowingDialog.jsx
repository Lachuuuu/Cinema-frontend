import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import Styles from "./ShowingDialog.module.css";
import classNames from "classnames";
import {useState} from "react";
import {makeReservationApi} from "../../api/Api";

function ShowingDialog(props) {
    const open = props.open
    const setOpen = props.setOpen
    const showing = props.showing
    const user = props.user

    const [normalTicket, setNormalTicket] = useState(0)
    const [discountTicket, setDiscountTicket] = useState(0)
    const [dialogScreenId, setDialogScreenId] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [choosenSeats, setChoosenSeats] = useState(null)
    const seats = [];
    let seatId = -1;

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            {dialogScreenId === 0 && <>
                <DialogTitle className={Styles.dialogHeader}>Wybierz bilety</DialogTitle>
                <DialogContent>
                    <DialogContentText className={Styles.ticketTypesBox}>
                        <span>normal - 15 PLN</span>
                        <span>student/kid - 10 PLN</span>
                    </DialogContentText>
                    <div className={Styles.ticketTypesBox}>
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
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleNextScreen}>Next</Button>
                </DialogActions>
            </>
            }
            {(dialogScreenId === 1 && showing != null) && <>
                <DialogTitle className={Styles.dialogHeader}>Wybierz miejsca</DialogTitle>
                <DialogContent>
                    <DialogContentText className={Styles.typesOfSeats}>
                        <span>zielone - wolne</span>
                        <span>czerwone - zajete</span>
                    </DialogContentText>
                    <div className={Styles.seatsBox}>
                        {showing.seatsMap.split('|').map(row =>
                            <div className={Styles.rowBox}>
                                {row.split('').map(it => chooseSeat(it))}
                                <div className={Styles.displayNone}>{seatId += 1}</div>
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
            {dialogScreenId === 2 &&
                <>
                    <DialogTitle className={Styles.dialogHeader}>Całkowity koszt rezerwacji</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={Styles.typesOfSeats}>
                            {totalPrice} PLN
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={makeReservation}>Kup</Button>
                    </DialogActions>
                </>
            }
        </Dialog>
    )

    function handleCloseDialog() {
        setOpen(false)
        setDialogScreenId(0)
        seatId = -1;
        setNormalTicket(0)
        setDiscountTicket(0)
        setTotalPrice(0)
    }

    function handleNextScreen() {

        if (dialogScreenId != 0 ||
            (dialogScreenId == 0 && (normalTicket > 0 || discountTicket > 0) && showing.seatsMap.match(/1/g).length >= parseInt(normalTicket) + parseInt(discountTicket)))
            if (dialogScreenId === 2) setOpen(false)
            else setDialogScreenId(dialogScreenId + 1)
        if (dialogScreenId == 1) {
            setTotalPrice((normalTicket * 15) + (discountTicket * 10))
            if (Array.isArray(seats)) setChoosenSeats(seats)
            else setChoosenSeats(Array.of(seats))
        }
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
        const indexOfElement = seats.indexOf(parseInt(id))
        if (seats.length < parseInt(normalTicket) + parseInt(discountTicket) || indexOfElement != -1) {
            target.classList.toggle(Styles.seatChoosen)
            if (indexOfElement == -1) seats.push(parseInt(id))
            else seats.splice(parseInt(indexOfElement), 1)

            console.log(seats)
        }
    }

    async function makeReservation() {
        console.log(choosenSeats)
        makeReservationApi(choosenSeats, normalTicket, discountTicket, showing.id)
            .then((message) => {
                message.json().then(it => console.log(it))
            })
    }

    handleNextScreen()
}

export default ShowingDialog;
