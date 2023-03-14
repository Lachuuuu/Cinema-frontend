import Styles from "./TopBar.module.css"
import {AppBar, FormControl, IconButton, InputAdornment, TextField, Toolbar} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import {useState} from "react";
import {Form} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AccountLink from "../AccountLink";
import LogoLink from "../LogoLink";

function TopBar() {

    const [searchValue, setSearchValue] = useState("")

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
                    <PersonIcon className={Styles.personIcon}/>
                    <AccountLink href="/login">Logowanie</AccountLink>
                    <AccountLink href="/register">Rejestracja</AccountLink>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
