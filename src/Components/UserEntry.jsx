import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useThemeContext } from "../Context/ThemeContext.jsx";
import CodeforcesLogo from "../Util/img.png";
import LeetCodeLogo from "../Util/img_1.png";
import "@fontsource/anton";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import RankRiserLogo from "../Util/Rank-Riser.png"
import RankRiserLogoLight from "../Util/Rank-Riser-Light.png"
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router";

const UserEntry = () => {
    const { darkMode, toggleDarkMode } = useThemeContext();
    const [cfHandle, setCfHandle] = useState("");
    const [lcHandle, setLcHandle] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const pageCenter = {display: "flex", alignItems: "center", justifyContent: "center",};

    const textInput = {
        variant: "outlined",
        margin: "normal",
        fullWidth: true,
        sx: {backgroundColor: darkMode ? "#424242" : "#fff", borderRadius: 4, flexGrow: 1,},
        slotProps: {input: {sx: {borderRadius: 4,},},},};

    const handleSubmit = () => {
        if(cfHandle === "" && lcHandle === "" && username === "") {
            toast.error("Please enter the Handles!");
            return;
        }else if(username === ""){
            toast.error("Please enter the Username Handle!");
            return;
        }else if(cfHandle === "" ) {
            toast.error("Please enter the Codeforces Handle!");
            return;
        }else if(lcHandle === ""){
            toast.error("Please enter the Leetcode Handle!");
            return;
        }
        localStorage.setItem("Username", username);
        localStorage.setItem("Codeforces Handle", cfHandle.trim());
        localStorage.setItem("Leetcode Handle", lcHandle.trim());
        navigate("/dashboard");
    };

    return (
        <Container
            className="animated-background"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            sx={{
                ...pageCenter,
                flexDirection: "column",
                height: "100vh",
                width: "100vw",
                transition: "background 1s ease",
            }}
        >
                <img src={darkMode ? RankRiserLogo : RankRiserLogoLight} alt="Rank Riser" style={{position:"fixed", top:0, left:0, width:"10%", height:"15%"}} alt="Rank Riser" />
            <Button
                onClick={toggleDarkMode}
                variant="contained"
                sx={{
                    position: "fixed",
                    borderRadius: "10px !important",
                    top: 45,
                    right: 20,
                    fontWeight: "bold",
                    px: 3,
                    py: 1,
                    background: darkMode
                        ? "linear-gradient(135deg, #f2d383, #f8b500)"
                        : "linear-gradient(135deg, #1e3c72, #2a5298)",
                    color: darkMode ? "black" : "white",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                    "&:hover": {
                        transform: "scale(1.05)",
                    },
                    transition: "all 0.3s ease",
                    zIndex: 999,
                }}
            >
                {darkMode ? <LightMode sx={{ mr: 1 }} /> : <DarkMode sx={{ mr: 1 }} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>

            <Typography
                variant="h5"
                component={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                sx={{
                    fontSize: "2.0rem",
                    fontWeight: "bold",
                    letterSpacing: 1,
                    mb: 3,
                }}
            >
                Enter your Handles
            </Typography>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
                <Box
                    sx={{
                        ...pageCenter,
                        flexDirection: "column",
                        width: "50%",
                        backgroundColor: darkMode ? "#303030" : "#fafafa",
                        borderRadius: 4,
                        boxShadow: darkMode
                            ? "0px 4px 6px rgba(255, 255, 255, 0.10)"
                            : 3,
                        padding: 4,
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2.8, width: "100%" }}>
                        <PersonIcon sx={{ mt:0.8}}/>
                        <TextField
                            {...textInput}
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                        <img
                            src={CodeforcesLogo}
                            alt="Codeforces"
                            style={{ width: "30px", height: "30px", marginTop: 8 }}
                        />
                        <TextField
                            {...textInput}
                            label="Codeforces Handle"
                            value={cfHandle}
                            onChange={(e) => setCfHandle(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                        <img
                            src={LeetCodeLogo}
                            alt="LeetCode"
                            style={{ width: "35px", height: "35px", marginTop: 8}}
                        />
                        <TextField
                            {...textInput}
                            label="LeetCode Handle"
                            value={lcHandle}
                            onChange={(e) => setLcHandle(e.target.value)}
                        />
                    </Box>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3,
                                borderRadius: 2,
                                paddingX: 4,
                                paddingY: 1.2,
                                fontWeight: "bold",
                                fontSize: "1rem",
                                textTransform: "none",
                                backgroundColor: darkMode ? "#4168ed" : "#2e7d32",
                                "&:hover": {
                                    backgroundColor: darkMode ? "#204add" : "#1b5e20",
                                },
                            }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </motion.div>
                </Box>
            </motion.div>
        </Container>
    );
};

export default UserEntry;
