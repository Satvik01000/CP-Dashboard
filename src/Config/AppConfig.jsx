import UserEntry from "../Components/UserEntry.jsx";
import Dashboard from "../Components/Dashboard.jsx";
import { Route, Routes } from "react-router";
const AppConfig = ()=>{
    return (
        <Routes>
            <Route path="/" element={<UserEntry />} />
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    );
};
export default AppConfig;