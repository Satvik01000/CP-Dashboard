import * as React from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, useTheme} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RankRiserLogo from '../Util/Rank-Riser.png';
import { useThemeContext } from '../Context/ThemeContext.jsx';
import { useNavigate } from "react-router";

const pages = ['Upcoming Contests', 'Past Contests', 'Rating Trends'];
const settings = ['Logout'];

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useThemeContext();
    const navigate = useNavigate();
    const theme = useTheme();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = (button) => {
        if(button === "Upcoming Contests")
            navigate("/upcoming-contests");
    }

    const handleCloseUserMenu = () => {
        localStorage.removeItem("Codeforces Handle");
        localStorage.removeItem("Leetcode Handle");
        localStorage.removeItem("Username");
        navigate("/dashboard");
        window.location.reload(); // Refresh the page after logout
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "#272727",
                color: theme.palette.text.primary,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    {/* Logo + Brand */}
                    <Box sx={{ cursor: "pointer", display: 'flex', alignItems: 'center' }} onClick={() => navigate("/dashboard")}>
                        <img
                            src={RankRiserLogo}
                            alt="Rank Riser"
                            style={{
                                height: 'clamp(32px, 7vw, 48px)',
                                marginRight: theme.spacing(1.5),
                            }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                fontSize: { xs: '1rem', md: '1.3rem' },
                                letterSpacing: '.08rem',
                                textDecoration: 'none',
                                color: "white"
                            }}
                        >
                            Rank Riser
                        </Typography>
                    </Box>

                    {/* Mobile Menu */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="open menu"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>

                    {/* Desktop Nav Links */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => {
                                    handleCloseNavMenu(page)
                                }}
                                sx={{
                                    color: 'white',
                                    borderRadius: 4,
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '1rem',
                                    transition: 'transform 0.2s ease, background 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Right-side controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            onClick={toggleDarkMode}
                            variant="contained"
                            sx={{
                                borderRadius: "10px !important",
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
                                textTransform: 'none',
                            }}
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </Button>

                        {/* User Avatar */}
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    alt="User"
                                    src="/static/images/avatar/2.jpg"
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                            sx={{ mt: '45px' }}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;