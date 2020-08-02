import React, { useEffect } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';

const theme = {
    colors: {
        primary: '#0070f3'
    }
};

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
