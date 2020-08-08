import React, { useState, useEffect, useRef } from 'react';
import { lineHeightSpacing, baseSpacing } from './Typography';
import styled, { css } from 'styled-components';
import { useWindowSize } from '../libs/useWindowResize';
import { getBaseFontSize } from '../libs/rhythm';

interface ImageProps extends React.ImgHTMLAttributes<any> {}
const RhythmImage = (props: ImageProps) => {
    const rhythmnHeight = parseFloat(lineHeightSpacing(1));
    const size = useWindowSize();
    const [imageHeight, setimageHeight] = useState<number | undefined>();

    const imgRef = useRef();
    useEffect(() => {
        if (imgRef.current) {
            const imageHeight = (imgRef.current as any).getBoundingClientRect()
                .height;
            const baseFontSize = getBaseFontSize();
            const imageRhythmnHeight =
                imageHeight / (rhythmnHeight * baseFontSize);
            const calculatedHeight =
                Math.floor(imageRhythmnHeight) * rhythmnHeight * baseFontSize;

            setimageHeight(calculatedHeight);
        }
    }, [size]);

    return (
        <ImageContainer height={imageHeight}>
            <img ref={imgRef} {...props} />
        </ImageContainer>
    );
};

interface ImageContainerProps {
    height?: number;
}
const ImageContainer = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: ${baseSpacing(1)};
    ${(props: ImageContainerProps) =>
        props.height ? `height: ${props.height}px;` : ``}
`;

export default RhythmImage;
