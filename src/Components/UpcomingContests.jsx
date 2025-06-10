import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Modal, Typography, Button } from "@mui/material";
import Navbar from "../Components/Navbar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const UpcomingContests = () => {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        const handleCodeforceEvents = async () => {
            try {
                const response = await axios.get("https://codeforces.com/api/contest.list");
                const upcomingContests = response.data.result.filter(
                    (contest) => contest.phase === "BEFORE"
                );

                const calendarEvents = upcomingContests.map((contest) => ({
                    id: `codeforces-${contest.id}`,
                    title: contest.name,
                    start: new Date(contest.startTimeSeconds * 1000),
                    extendedProps: {
                        durationSeconds: contest.durationSeconds,
                        type: contest.type,
                        frozen: contest.frozen,
                        platform: "Codeforces"
                    }
                }));

                setEvents(prev => [...prev, ...calendarEvents]);
            } catch (error) {
                console.error("Failed to fetch Codeforces contests:", error.message);
            }
        };

        const handleLeetcodeEvents = () => {
            const leetcodeEvents = [];
            const now = new Date();
            let weeklyCount = 454;
            let biweeklyCount = 140;

            // Weekly contests: Sunday 8:00 AM IST
            let date = new Date(now);
            date.setHours(8, 0, 0, 0);
            while (date.getDay() !== 0) date.setDate(date.getDate() + 1); // find next Sunday

            for (let i = 0; i < 10; i++) {
                leetcodeEvents.push({
                    id: `leetcode-weekly-${i}`,
                    title: `LeetCode Weekly Contest ${weeklyCount++}`,
                    start: new Date(date),
                    extendedProps: {
                        durationSeconds: 5400,
                        platform: "LeetCode"
                    }
                });
                date.setDate(date.getDate() + 7);
            }

            // Biweekly contests: Every 2nd Saturday 8:00 PM IST
            date = new Date(now);
            date.setHours(20, 0, 0, 0);
            while (date.getDay() !== 6) date.setDate(date.getDate() + 1); // next Saturday

            for (let i = 0; i < 5; i++) {
                leetcodeEvents.push({
                    id: `leetcode-biweekly-${i}`,
                    title: `LeetCode Biweekly Contest ${biweeklyCount++}`,
                    start: new Date(date),
                    extendedProps: {
                        durationSeconds: 5400,
                        platform: "LeetCode"
                    }
                });
                date.setDate(date.getDate() + 14);
            }

            setEvents(prev => [...prev, ...leetcodeEvents]);
        };

        handleCodeforceEvents();
        handleLeetcodeEvents();
    }, []);

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setOpen(true);
    };

    return (
        <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Navbar />
            <Box sx={{ pt: '64px', px: 2, height: 'calc(100vh - 64px)' }}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height="100%"
                    events={events}
                    eventClick={handleEventClick}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                />
            </Box>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 400 },
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {selectedEvent && (
                        <>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {selectedEvent.title}
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>🕒 Start:</strong> {new Date(selectedEvent.start).toLocaleString('en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour12: false
                                })}
                                </Typography>

                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>⏱ Duration:</strong> {Math.floor(selectedEvent.extendedProps.durationSeconds / 3600)}h {Math.floor((selectedEvent.extendedProps.durationSeconds % 3600) / 60)}m
                                </Typography>

                                {selectedEvent.extendedProps.type && (
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>📦 Type:</strong> {selectedEvent.extendedProps.type}
                                    </Typography>
                                )}

                                {'frozen' in selectedEvent.extendedProps && (
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>❄️ Frozen:</strong> {selectedEvent.extendedProps.frozen ? 'Yes' : 'No'}
                                    </Typography>
                                )}

                                {selectedEvent.extendedProps.platform && (
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>🌐 Platform:</strong> {selectedEvent.extendedProps.platform}
                                    </Typography>
                                )}
                            </Box>

                            <Box mt={3} textAlign="right">
                                <Button variant="contained" color="primary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>

        </Box>
    );
};

export default UpcomingContests;