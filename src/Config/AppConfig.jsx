import UserEntry from "../Components/UserEntry.jsx";
import Dashboard from "../Components/Dashboard.jsx";
import { Route, Routes } from "react-router";
import UpcomingContests from "../Components/UpcomingContests.jsx";
const AppConfig = ()=>{
    return (
        <Routes>
            <Route path="/" element={<UserEntry />} />
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/upcoming-contests" element={<UpcomingContests />}/>
        </Routes>
    );
};
export default AppConfig;