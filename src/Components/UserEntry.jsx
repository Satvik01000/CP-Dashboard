import {Box, Button, Container, TextField, Typography,} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useThemeContext } from "../Context/ThemeContext.jsx";
import CodeforcesLogo from "../Util/img.png";
import LeetCodeLogo from "../Util/img_1.png";
import "@fontsource/anton";

const UserEntry = () => {
    const { darkMode, toggleDarkMode } = useThemeContext();

    const pageCenter = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const textInput = {
        variant: "outlined",
        margin: "normal",
        sx: {
            backgroundColor: darkMode ? "#424242" : "#fff",
            width: 460,
            borderRadius: 2,
        },
        slotProps: {
            input: {
                sx: {
                    borderRadius: 2,
                },
            },
        },
    };

    return (
        <Container
            sx={{
                ...pageCenter,
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <Button
                onClick={toggleDarkMode}
                variant="contained"
                sx={{
                    position: "fixed",
                    borderRadius: "10px !important",
                    top: 20,
                    right: 20,
                    fontWeight: "bold",
                    px: 3,
                    py: 1,
                    background: darkMode
                        ? "linear-gradient(135deg, #f2d383, #f8b500)"
                        : "linear-gradient(135deg, #1e3c72, #2a5298)",
                    color: !darkMode ? "white" : "black",
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
                sx={{
                    fontSize: "2.0rem",
                    fontFamily: "anton",
                    letterSpacing: 1,
                    mb: 3,
                }}
            >
                Enter your Handles
            </Typography>

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
                }}
            >
                <Box sx={{ ...pageCenter, gap: 2 }}>
                    <img
                        src={CodeforcesLogo}
                        alt="Codeforces"
                        style={{ width: "30px", height: "30px" }}
                    />
                    <TextField {...textInput} label="Codeforces Handle" />
                </Box>

                <Box sx={{ ...pageCenter, gap: 1.7 }}>
                    <img
                        src={LeetCodeLogo}
                        alt={"LeetCode"}
                        style={{ width: "35px", height: "35px" }}
                    />
                    <TextField {...textInput} label="LeetCode Handle" />
                </Box>

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
                        backgroundColor: darkMode ? "#4caf50" : "#2e7d32",
                        "&:hover": {
                            backgroundColor: darkMode ? "#66bb6a" : "#1b5e20",
                        },
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default UserEntry;