import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Profile from "./Profiles/Profiles";
import Stadistics from './stadistics/stadistics';
import "./main.css"

export const main = () =>{
    return (
        <div id="main">
        <BrowserRouter>
            <Routes>
                <Route path="/" element ={ <Dashboard/>}/>
                <Route path="/profiles" element={ <Profile/> } />
                <Route path="/stadistics" element={ <Stadistics/> } />
            </Routes>
        </BrowserRouter>
        </div>
    )
}
export default main;
