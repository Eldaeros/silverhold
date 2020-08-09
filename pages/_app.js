import React, { useEffect } from 'react';
import '../styles/globals.css';
import '../styles/normalize.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import styledComponentsRhythm from '@ceteio/styled-components-rhythm';

const rhythm = styledComponentsRhythm({
    baseFontSize: 1, // rem units.
    defaultLineHeight: 1.5, // unitless line-height
    rhythmHeight: 1, // rem units.
    capHeights: {
        // Calculated with https://codepen.io/sebdesign/pen/EKmbGL?editors=0011
        Muli: 0.715,
        'Fira Code': 0.69,
        'Fjalla One': 0.87
    },
    debug: false
});

export const SizeContext = React.createContext('standard');

const GlobalStyle = createGlobalStyle`
  ${rhythm.global};
`;

const App = ({ Component, pageProps }) => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={rhythm.theme}>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default App;
