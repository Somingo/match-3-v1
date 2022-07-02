import React from 'react';
import './App.scss';
import {Box, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {routes} from './routes';
import {Navbar} from './Navbar/Navbar';

function App() {
    // define theme
    const theme = createTheme({
        palette: {
            primary: {
                light: "#63b8ff",
                main: "#0989e3",
                dark: "#005db0",
                contrastText: "#000",
            },
            secondary: {
                main: "#4db6ac",
                light: "#82e9de",
                dark: "#00867d",
                contrastText: "#000",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box height="100vh" display="flex" flexDirection="column">

            <Router>
                <Navbar/>
                <Routes>

                    {routes.filter(route=> route.enabled).map((route) => (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))}
                </Routes>
            </Router>
            </Box>
        </ThemeProvider>
    );
}

export default App;
