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
import {Form, useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import LogoLink from "../LogoLink";
import {checkIfAdmin, getCookie, getUrl} from "../../api/Utils";
import PersonIcon from "@mui/icons-material/Person";
import AccountLink from "../AccountLink";
import {getUserByTokenApi, logoutApi} from "../../api/Api";

function TopBar(props) {
    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()
    const isAdmin = checkIfAdmin(user)

    const [menuOpen, setMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [searchValue, setSearchValue] = useState(null)

    useEffect(() => {
        let cookie = getCookie("userId")
        if (user == null && cookie != null) getUserByTokenApi()
            .then(
                response => response.json()
                    .then(user => {
                        setUser(user)
                    })
            )
        if (cookie == null && user != null) {
            setUser(null)
        }
    }, [])


    return (
        <AppBar position="sticky">
            <Toolbar className={Styles.appBar}>
                <div className={Styles.logoBox}>
                    <LogoLink to={{
                        pathname: "/"
                    }}><h1>CINEMA</h1></LogoLink>
                </div>
                <div className={Styles.searchBox}>
                    <Form onSubmit={event => handleSearch(event)}>
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
                    {user != null && <div>
                        <div onClick={event => openMenu(event)}>{user.firstName}</div>
                        <Menu
                            anchorEl={anchorEl}
                            id="accountMenu"
                            open={menuOpen}
                            onClick={closeMenu}
                            onClose={closeMenu}
                            disableScrollLock={true}
                        >
                            <MenuItem>
                                <div id="/user/reservations"
                                     onClick={event => navigate(event.target.id)}>
                                    Moje Rezerwacje
                                </div>
                            </MenuItem>
                            <MenuItem>
                                <div id="/user/settings"
                                     onClick={event => navigate(event.target.id)}>
                                    Ustawienia
                                </div>
                            </MenuItem>
                            {isAdmin &&
                                <MenuItem>
                                    <div id="/admin/panel"
                                         onClick={event => navigate(event.target.id)}>
                                        Admin Panel
                                    </div>
                                </MenuItem>
                            }
                            <MenuItem onClick={logout}>
                                <Button variant="outlined">Wyloguj</Button>
                            </MenuItem>
                        </Menu>
                    </div>
                    }
                    {user == null &&
                        <AccountLink to={{
                            pathname: "/login"
                        }}>Logowanie</AccountLink>
                    }
                    {user == null &&
                        <AccountLink to={{
                            pathname: "/register"
                        }}>Rejestracja</AccountLink>
                    }
                </div>
            </Toolbar>
        </AppBar>
    );

    async function logout() {
        await logoutApi()
        window.location.replace(getUrl())

    }

    function openMenu(event) {
        if (user != null) setMenuOpen(true)
        setAnchorEl(event.currentTarget)
    }

    function closeMenu() {
        setMenuOpen(false)
    }

    function handleSearch(event) {
        event.preventDefault()
        navigate("/search/" + searchValue)
    }
}

export default TopBar;
