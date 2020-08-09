import React, { useEffect } from 'react';
import '../styles/globals.css';
import '../styles/normalize.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import styledComponentsRhythm from '../libs/styledComponentRhythm';
import { useWindowSize } from '../libs/useWindowResize';
import { media, size } from '../styles/media';

const rhythm = styledComponentsRhythm({
    baseFontSize: 1, // rem units.
    defaultLineHeight: 1.2, // unitless line-height
    rhythmHeight: 1, // rem units.
    capHeights: {
        // Calculated with https://codepen.io/sebdesign/pen/EKmbGL?editors=0011
        Muli: 0.715,
        'Fira Code': 0.69,
        'Fjalla One': 0.87
    },
    debug: false
});
const rhythmWide = styledComponentsRhythm({
    baseFontSize: 1, // rem units.
    defaultLineHeight: 1.1, // unitless line-height
    rhythmHeight: 0.5, // rem units.
    capHeights: {
        // Calculated with https://codepen.io/sebdesign/pen/EKmbGL?editors=0011
        Muli: 0.715,
        'Fira Code': 0.69,
        'Fjalla One': 0.87
    },
    debug: false
});

const GlobalStyle = createGlobalStyle`
  ${rhythm.global};
  ${media.wide} {
    ${rhythmWide.global};
  }
`;

const App = ({ Component, pageProps }) => {
    const windowSize = useWindowSize();
    const theme =
        windowSize.width < size.wide ? rhythm.theme : rhythmWide.theme;

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default App;
