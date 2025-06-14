import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Box, Typography, Container } from "@mui/material";
import Navbar from "./Navbar.jsx";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const RatingTrends = () => {
    const [codeforcesRating, setCodeforcesRating] = useState([]);
    const [leetcodeRating, setLeetcodeRating] = useState([]);

    useEffect(() => {
        const fetchCodeforcesRatingData = async () => {
            try {
                const handle = localStorage.getItem("Codeforces Handle");
                if (!handle) return;
                const response = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
                const ratingValues = response.data.result.map((r) => r.newRating);
                setCodeforcesRating(ratingValues);
            } catch (error) {
                console.error("Failed to fetch Codeforces ratings:", error);
            }
        };

        const fetchLeetcodeRatingData = async () => {
            try {
                const handle = localStorage.getItem("Leetcode Handle");
                if (!handle) return;
                const response = await axios.get(`https://leetcode-proxy-fif3p9087-satvik01000s-projects.vercel.app/leetcode-contests/${handle}`);
                const ratingValues = response.data.map(r => r.rating);
                setLeetcodeRating(ratingValues);
            } catch (error) {
                console.error("Failed to fetch LeetCode ratings:", error);
            }
        };

        fetchCodeforcesRatingData();
        fetchLeetcodeRatingData();
    }, []);

    const getChartData = (ratings, label, color) => ({
        labels: ratings.map((_, index) => `#${index + 1}`),
        datasets: [
            {
                label,
                data: ratings,
                fill: false,
                borderColor: color,
                backgroundColor: color,
                tension: 0.3,
            },
        ],
    });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    return (
        <>
            <Navbar />
            <Container sx={{ pt: 10, pb: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Codeforces Rating Trend
                </Typography>
                <Line data={getChartData(codeforcesRating, "Codeforces Rating", "#FF6384")} options={options} />

                <Typography variant="h5" gutterBottom sx={{ mt: 5 }}>
                    LeetCode Rating Trend
                </Typography>
                <Line data={getChartData(leetcodeRating, "LeetCode Rating", "#36A2EB")} options={options} />
            </Container>
        </>
    );
};

export default RatingTrends;
