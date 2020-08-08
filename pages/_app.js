import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import '../styles/fonts.css';
import { size as media } from '../styles/media';
import { useWindowSize } from '../libs/useWindowResize';

export const SizeContext = React.createContext('laptop');

const MyApp = ({ Component, pageProps }) => {
    const size = useWindowSize();
    const [mediaSize, setMediaSize] = useState('laptop');

    useEffect(() => {
        if (size.width < media.mobile) {
            setMediaSize('mobile');
        } else if (size.width < media.laptop) {
            setMediaSize('laptop');
        } else {
            setMediaSize('desktop');
        }
    }, [size]);

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

export default MyApp;
