import React, { useEffect } from 'react';
import '../styles/globals.css';
import '../styles/normalize.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import styledComponentsRhythm from '../libs/styledComponentRhythm';
import { useWindowSize } from '../libs/useWindowResize';
import { media, size } from '../styles/media';
import { createMuiTheme } from '@material-ui/core/styles';

const material = createMuiTheme({
    breakpoints: {
        values: {
            tablet: size.small,
            laptop: size.standard,
            desktop: size.wide
        }
    }
});

const capHeights = {
    // Calculated with https://codepen.io/sebdesign/pen/EKmbGL?editors=0011
    Muli: 0.715,
    'Fira Code': 0.69,
    'Fjalla One': 0.87
};

const rhythmThemes = {
    small: styledComponentsRhythm({
        baseFontSize: 1.2, // rem units.
        defaultLineHeight: 1, // unitless line-height
        rhythmHeight: 1.2, // rem units.
        capHeights: capHeights,
        debug: false
    }),
    standard: styledComponentsRhythm({
        baseFontSize: 1, // rem units.
        defaultLineHeight: 1, // unitless line-height
        rhythmHeight: 1, // rem units.
        capHeights: capHeights,
        debug: false
    }),
    wide: styledComponentsRhythm({
        baseFontSize: 1, // rem units.
        defaultLineHeight: 1.25, // unitless line-height
        rhythmHeight: 1.25, // rem units.
        capHeights: capHeights,
        debug: false
    })
};

const GlobalStyle = createGlobalStyle`
  ${rhythmThemes.small.global};
  ${media.standard} {
    ${rhythmThemes.standard.global};
  }
  ${media.wide} {
    ${rhythmThemes.wide.global};
  }
`;

const App = ({ Component, pageProps }) => {
    const windowSize = useWindowSize();
    let rhythm = rhythmThemes.small; // default
    if (windowSize.width >= size.wide) {
        rhythm = rhythmThemes.wide;
    } else if (windowSize.width >= size.standard) {
        rhythm = rhythmThemes.standard;
    }

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={material}>
            <ThemeProvider theme={rhythm.theme}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ThemeProvider>
        </ThemeProvider>
    );
};

export default App;
