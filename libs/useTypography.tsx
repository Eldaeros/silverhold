import React, { useState, useEffect, useContext } from 'react';
import { SizeContext } from '../pages/_app';
import { RhythmTypography } from './rhythm';

export const useTypography = () => {
    const mediaSize = useContext(SizeContext);
    const [typography, setTypography] = useState(new RhythmTypography());
    useEffect(() => {
        switch (mediaSize) {
            case 'small':
            case 'standard':
                setTypography(
                    new RhythmTypography({
                        baseFontSize: 1,
                        baseLineHeight: 2,
                        baseFontScale: 'minorThird'
                    })
                );
                break;
            case 'wide':
                setTypography(
                    new RhythmTypography({
                        baseFontSize: 1,
                        baseLineHeight: 2.5,
                        baseFontScale: 'majorThird'
                    })
                );
            default:
                break;
        }
    }, [mediaSize]);

    return typography;
};
