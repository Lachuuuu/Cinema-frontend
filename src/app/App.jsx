import Router from "../router/Router";
import {useState} from "react";

function App() {
    const [user, setUser] = useState("");
    return (
        <Router user={user} setUser={setUser}/>
    );
}

export default App;
