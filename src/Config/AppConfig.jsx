import UserEntry from "../Components/UserEntry.jsx";
import { Route, Routes } from "react-router";
const AppConfig = ()=>{
    return (
        <Routes>
            <Route path="/" element={<UserEntry />} />
        </Routes>
    );
};
export default AppConfig;