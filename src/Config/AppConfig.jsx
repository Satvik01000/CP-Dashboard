import UserEntry from "../Components/UserEntry.jsx";
import Dashboard from "../Components/Dashboard.jsx";
import { Route, Routes } from "react-router";
import UpcomingContests from "../Components/UpcomingContests.jsx";
import RatingTrends from "../Components/RatingTrends.jsx";
const AppConfig = ()=>{
    return (
        <Routes>
            <Route path="/" element={<UserEntry />} />
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/upcoming-contests" element={<UpcomingContests />}/>
            <Route path="/rating-trends" element={<RatingTrends />}/>
        </Routes>
    );
};
export default AppConfig;