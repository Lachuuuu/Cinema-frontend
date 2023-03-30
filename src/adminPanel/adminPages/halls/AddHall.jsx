import TopBar from "../../../components/topBar/TopBar";
import {Form, useNavigate} from "react-router-dom";
import Styles from "../AdminPages.module.css"
import GlassBox from "../../../components/GlassBox";
import {Button, CircularProgress, FormControl, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import classNames from "classnames";
import {addHallApi} from "../../../api/Api";

function AddHall(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const [waiting, setWaiting] = useState(false)
    const [columns, setColumns] = useState(0)
    const [rows, setRows] = useState(0)
    const [name, setName] = useState("")
    const [seatsMap, setSeatsMap] = useState("")
    let seatId = -1;

    useEffect(() => {
        if (rows > 0 && columns > 0) {
            createSeatsMap()
        }
    }, [rows, columns])

    return (<div className={Styles.centerBox}>
            <TopBar user={user} setUser={setUser}/>
            <GlassBox className={Styles.centerBox}>
                <Form onSubmit={handleSubmit}>
                    <FormControl>
                        <h3>Select name</h3>
                        <TextField className={Styles.Select}
                                   label="name"
                                   onChange={event => setName(event.target.value)}
                                   required={true}
                                   value={name}
                        >
                        </TextField>
                        <h3>Select rows number</h3>
                        <TextField className={Styles.Select}
                                   type="number"
                                   label="rows"
                                   onChange={event => setRows(event.target.value)}
                                   required={true}
                                   value={rows}
                                   inputProps={{min: 0}}
                        >
                        </TextField>
                        <h3>Select columns number</h3>
                        <TextField className={Styles.Select}
                                   type="number"
                                   label="columns"
                                   onChange={event => setColumns(event.target.value)}
                                   required={true}
                                   value={columns}
                                   inputProps={{min: 0}}
                        >
                        </TextField>
                        {(columns > 0 && rows > 0) &&
                            <div>
                                {seatsMap.split('|').map(row =>
                                    <div className={Styles.rowBox}>
                                        {row.split('').map(it => chooseSeat(it))}
                                        <div className={Styles.displayNone}>{seatId++}</div>
                                    </div>
                                )}
                            </div>
                        }

                        {waiting
                            ? <CircularProgress/>
                            : <Button type="submit"
                                      variant="contained"
                            >
                                Add Hall
                            </Button>
                        }
                    </FormControl>
                </Form>
            </GlassBox>
        </div>
    );

    async function handleSubmit() {
        setWaiting(true)
        addHallApi(name, seatsMap)
        setWaiting(false)
    }

    function createSeatsMap() {
        let columnIterator = 1
        let rowIterator = 0
        let newMap = ""
        while (rowIterator < rows) {
            newMap += "0"
            while (columnIterator < columns) {
                newMap += "0"
                columnIterator++
            }
            newMap += "|"
            rowIterator++
            columnIterator = 1
        }
        setSeatsMap(newMap)

    }

    function chooseSeat(it) {
        seatId++
        switch (it) {
            case '0':
                return <div className={classNames(Styles.seatFlor)}
                            onClick={event => changeSquare(event.target.getAttribute("seatid"))}
                            seatid={seatId}></div>
                break;
            case '1':
                return <div className={classNames(Styles.seatFree, Styles.seat)}
                            onClick={event => changeSquare(event.target.getAttribute("seatid"))}
                            seatid={seatId}></div>
                break;
            case '2':
                return <div className={classNames(Styles.seatTaken)}></div>
                break;
            default:
                return <></>
                break;
        }
    }

    function changeSquare(seatIndex) {
        let index = parseInt(seatIndex)
        if (seatsMap.charAt(index) === '0')
            setSeatsMap(setCharAt(seatsMap, index, "1"))
        else if (seatsMap.charAt(index) === '1')
            setSeatsMap(setCharAt(seatsMap, index, "0"))
    }

    function setCharAt(str, index, replacement) {
        let result = str.substring(0, index) + replacement + str.substring(index + replacement.length);
        return result;
    }
}

export default AddHall