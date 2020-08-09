import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import '../styles/fonts.css';
import '../styles/normalize.css';
import { size } from '../styles/media';
import { useWindowSize } from '../libs/useWindowResize';

export const SizeContext = React.createContext('standard');

const App = ({ Component, pageProps }) => {
    const windowSize = useWindowSize();
    const [mediaSize, setMediaSize] = useState('standard');

    useEffect(() => {
        if (windowSize.width < size.standard) {
            setMediaSize('small');
        } else if (windowSize.width < size.wide) {
            setMediaSize('standard');
        } else {
            setMediaSize('wide');
        }
    }, [windowSize]);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <SizeContext.Provider value={mediaSize}>
            <Component {...pageProps} />
        </SizeContext.Provider>
    );
};

export default App;
