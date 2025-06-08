import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import { ThemeProviderWrapper } from "./Context/ThemeContext.jsx";
import AppConfig from "./Config/AppConfig.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProviderWrapper>
                <AppConfig />
            </ThemeProviderWrapper>
        </BrowserRouter>
    </StrictMode>,
);
