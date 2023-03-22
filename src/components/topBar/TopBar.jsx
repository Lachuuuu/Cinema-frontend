import * as React from 'react';
import {useEffect, useState} from 'react';
import Styles from "./TopBar.module.css"
import {
    AppBar,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    TextField,
    Toolbar
} from "@mui/material";
import {Form} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import LogoLink from "../LogoLink";
import {changeLocation, getCookie} from "../../api/Utils";
import getApiUrl from "../../api/ApiUrl";
import PersonIcon from "@mui/icons-material/Person";
import AccountLink from "../AccountLink";

function TopBar() {


    const [menuOpen, setMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [searchValue, setSearchValue] = useState(null)
    const [userName, setUserName] = useState("")

    useEffect(() => {
        let cookie = getCookie("firstName")
        if (cookie === null) setUserName(null)
        else setUserName(cookie.valueOf())
    }, [])

    return (
        <AppBar position="sticky">
            <Toolbar className={Styles.appBar}>
                <div className={Styles.logoBox}>
                    <LogoLink href="/"><h1>CINEMA</h1></LogoLink>
                </div>
                <div className={Styles.searchBox}>
                    <Form>
                        <FormControl className={Styles.searchForm}>
                            <TextField id="firstName"
                                       variant="outlined"
                                       onChange={event => setSearchValue(event.target.value)}
                                       className={Styles.searchField}
                                       InputProps={{
                                           className: Styles.searchFieldInput,
                                           endAdornment: (
                                               <InputAdornment disablePointerEvents={true}>
                                                   <IconButton>
                                                       <SearchIcon/>
                                                   </IconButton>
                                               </InputAdornment>
                                           )
                                       }}
                                       autoComplete='off'
                            />
                        </FormControl>
                    </Form>
                </div>

                <div className={Styles.accountBox}>
                    <PersonIcon onClick={event => openMenu(event)} className={Styles.personIcon}/>
                    {userName !== null && <div>
                        <div onClick={event => openMenu(event)}>{userName}</div>
                        <Menu
                            anchorEl={anchorEl}
                            id="accountMenu"
                            open={menuOpen}
                            onClick={closeMenu}
                            onClose={closeMenu}
                            disableScrollLock={true}
                        >
                            <MenuItem>
                                <div>Moje Rezerwacje</div>
                            </MenuItem>
                            <MenuItem>
                                <div id="user/settings"
                                     onClick={event => changeLocation(event.target.id)}>Ustawienia
                                </div>
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <Button variant="outlined">Wyloguj</Button>
                            </MenuItem>
                        </Menu>
                    </div>
                    }
                    {userName === null &&
                        <AccountLink href="/login">Logowanie</AccountLink>
                    }
                    {userName === null &&
                        <AccountLink href="/register">Rejestracja</AccountLink>
                    }
                </div>
            </Toolbar>
        </AppBar>
    );

    async function logout() {
        await fetch(getApiUrl() + "auth/logout", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            }
        )
        changeLocation("")
    }

    function openMenu(event) {
        if (userName !== "" || userName != null) setMenuOpen(true)
        setAnchorEl(event.currentTarget)
    }

    function closeMenu() {
        setMenuOpen(false)
    }
}

export default TopBar;
