import React, { useState, useEffect, useContext } from 'react';
import { SizeContext } from '../pages/_app';
import { Typography } from '../styles/typography';

export const useTypography = () => {
    const sizeContext = useContext(SizeContext);
    const [typography, setTypography] = useState(new Typography());
    useEffect(() => {
        switch (sizeContext) {
            case 'mobile':
            case 'laptop':
                setTypography(
                    new Typography({
                        baseFontSize: 1,
                        baseLineHeight: 2,
                        baseFontScale: 'minorThird'
                    })
                );
                break;
            case 'desktop':
                setTypography(
                    new Typography({
                        baseFontSize: 1,
                        baseLineHeight: 2.5,
                        baseFontScale: 'majorThird'
                    })
                );
            default:
                break;
        }
    }, [sizeContext]);

    return typography;
};
