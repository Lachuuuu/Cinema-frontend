import Styles from "./MainPage.module.css"
import {useState} from "react";
import TopBar from "../components/topBar/TopBar";

function MainPage() {

    const [responseStatus, setResponseStatus] = useState(-1)

    return (<>
            <TopBar/>
            <div className={Styles.main}>
            </div>
        </>
    );
}

export default MainPage;
