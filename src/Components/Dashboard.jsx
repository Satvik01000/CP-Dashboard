import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar.jsx";
import {Box, Grid, Paper, Typography, List, ListItem, ListItemText, IconButton, useTheme, useMediaQuery, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import {useNavigate} from "react-router";

const AnimatedListItem = styled(ListItem)(({ theme }) => ({
    transition: 'opacity 0.5s ease, transform 0.3s ease',
    '&.removing': {
        opacity: 0,
        transform: 'translateX(30px)',
    },
    '&.crossed > .MuiListItemText-root > span': {
        textDecoration: 'line-through',
        color: theme.palette.error.main,
        transition: 'all 0.3s ease',
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const FrostedGlass = styled(Paper)(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    background: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.05)',
    borderRadius: '16px',
    boxShadow: theme.shadows[6],
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    transition: 'transform 0.2s ease',
    '&:hover': {
        transform: 'scale(1.01)',
    },
    height: '100%',
}));

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [todayProblems, setTodayProblems] = useState(() => {
        const stored = localStorage.getItem("Today");
        return stored ? JSON.parse(stored) : [];
    });

    const [upsolveProblems, setUpsolveProblems] = useState(() => {
        const stored = localStorage.getItem("Upsolve");
        return stored ? JSON.parse(stored) : [];
    });

    const [inputText, setInputText] = useState("");
    const [removingItems, setRemovingItems] = useState({ Today: [], Upsolve: [] });

    useEffect(() => {
        const leet = localStorage.getItem("Leetcode Handle");
        const cf = localStorage.getItem("Codeforces Handle");
        const user = localStorage.getItem("Username");

        if (!leet || !cf || !user || leet.trim() === "" || cf.trim() === "" || user.trim() === "") {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("Today", JSON.stringify(todayProblems));
    }, [todayProblems]);

    useEffect(() => {
        localStorage.setItem("Upsolve", JSON.stringify(upsolveProblems));
    }, [upsolveProblems]);

    const handleAnalyse = () => {
        const lines = inputText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        if (lines.length === 0) return;

        const todayItems = [];
        const upsolveItems = [];

        lines.forEach(line => {
            const [type, ...rest] = line.split(" ");
            const problem = rest.join(" ").trim();

            if (type.toLowerCase() === "solve") {
                todayItems.push(problem);
            } else if (type.toLowerCase() === "upsolve") {
                upsolveItems.push(problem);
            }
        });

        if (todayItems.length > 0) {
            setTodayProblems(prev => [...prev, ...todayItems]);
        }
        if (upsolveItems.length > 0) {
            setUpsolveProblems(prev => [...prev, ...upsolveItems]);
        }

        setInputText(""); // clear input
    };


    const removeWithAnimation = (type, index) => {
        const key = type === 'today' ? 'Today' : 'Upsolve';
        setRemovingItems(prev => ({
            ...prev,
            [key]: [...prev[key], index]
        }));

        setTimeout(() => {
            if (type === 'today') {
                const newList = [...todayProblems];
                newList.splice(index, 1);
                setTodayProblems(newList);
            } else {
                const newList = [...upsolveProblems];
                newList.splice(index, 1);
                setUpsolveProblems(newList);
            }

            setRemovingItems(prev => ({
                ...prev,
                [key]: prev[key].filter(i => i !== index)
            }));
        }, 500);
    };

    const heading = {
        variant: "h4",
        gutterBottom: true,
        fontWeight: "bold",
        sx: { letterSpacing: 2, color: theme.palette.text.primary },
    };

    return (
        <>
            <Navbar />

            <Box
                sx={{minHeight: "100vh", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", px: 2, pt: 10, pb: 10,}}
            >
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    {/* Problems Today */}
                    <Grid item xs={12} md={5} lg={4}>
                        <FrostedGlass elevation={4}>
                            <Typography {...heading} sx={{ textDecoration: "underline", color:"#cf5555" }}>Problems to Solve Today</Typography>
                            <List sx={{ overflowY: 'auto', flex: 1, cursor: 'pointer' }}>
                                {todayProblems.map((prob, i) => (
                                    <AnimatedListItem
                                        key={i}
                                        className={`${removingItems["Today"].includes(i) ? 'removing crossed' : ''}`}
                                        onClick={() => removeWithAnimation('today', i)}
                                        secondaryAction={
                                            <IconButton edge="end" onClick={(e) => {
                                                e.stopPropagation();
                                                removeWithAnimation('today', i);
                                            }}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText primary={prob} />
                                    </AnimatedListItem>
                                ))}
                            </List>
                        </FrostedGlass>
                    </Grid>

                    {/* Upsolve Problems */}
                    <Grid item xs={12} md={5} lg={4}>
                        <FrostedGlass elevation={4}>
                            <Typography {...heading} sx={{ textDecoration: "underline", color:"#cf5555" }}>Problems to Upsolve</Typography>
                            <List sx={{ overflowY: 'auto', flex: 1, cursor: 'pointer' }}>
                                {upsolveProblems.map((prob, i) => (
                                    <AnimatedListItem
                                        key={i}
                                        className={`${removingItems["Upsolve"].includes(i) ? 'removing crossed' : ''}`}
                                        onClick={() => removeWithAnimation('upsolve', i)}
                                        secondaryAction={
                                            <IconButton edge="end" onClick={(e) => {
                                                e.stopPropagation();
                                                removeWithAnimation('upsolve', i);
                                            }}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText primary={prob} />
                                    </AnimatedListItem>
                                ))}
                            </List>
                        </FrostedGlass>
                    </Grid>
                </Grid>
            </Box>

            {/* Floating input box */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    zIndex: 1300,
                }}
            >
                <Paper
                    component="form"
                    onSubmit={(e) => { e.preventDefault(); handleAnalyse(); }}
                    sx={{
                        p: "2px 8px",
                        display: "flex",
                        alignItems: "center",
                        width: { xs: "90%", sm: "70%", md: "40%" },
                        borderRadius: 10,
                        boxShadow: theme.shadows[4],
                    }}
                >
                    <TextField
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Describe your tasks..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.shiftKey) {
                                // Let newline happen
                            } else if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAnalyse();
                            }
                        }}
                        multiline
                        maxRows={6}
                        variant="standard"
                    />
                    <IconButton type="submit" sx={{ p: "10px" }}>
                        <SendIcon />
                    </IconButton>
                </Paper>
            </Box>
        </>
    );
};

export default Dashboard;
