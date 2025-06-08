import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
    const storedMode = localStorage.getItem("darkMode")==="true";
    const [darkMode, setDarkMode] = useState(storedMode);

    const toggleDarkMode = () =>{
        setDarkMode((prevMode)=>{
            localStorage.setItem("darkMode", !prevMode);
            return !prevMode;
        })
    };
    const theme = useMemo(() =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                },
            }),
        [darkMode]
    );
    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
export const useThemeContext = () => useContext(ThemeContext);
