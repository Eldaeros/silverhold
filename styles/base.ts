import { css } from 'styled-components';
import { RhythmTypography } from '../libs/rhythm';

export const content = (typography: RhythmTypography) => css`
    ${typography.verticalRhythm({ fontScale: 2 })}
`;
export const paragraph = (typography: RhythmTypography) => css`
    ${content(typography)}
    code {
        ${typography.verticalRhythm({ fontScale: 1 })}
        display: inline-block;
        margin-bottom: 0px;
    }
`;
export const preformatted = (typography: RhythmTypography) => css`
    line-height: calc(1.85 * ${typography.rhythm.getBaseFontSize()}em);
    margin: 0px;
    min-height: ${typography.rhythm.getStyleRhythmHeight(2)};
    background-color: lightgray;
    overflow: hidden;
    margin: ${typography.rhythm.getStyleRhythmHeight(0.5)} 0;
    box-sizing: content-box;
    code {
        ${typography.verticalRhythm({
            fontScale: 1
        })}
        margin: 0;
        margin-left: ${typography.rhythm.getStyleRhythmHeight(1)};
        padding: ${typography.rhythm.getStyleRhythmHeight(0.5)} 0;
        display: inline-block;
        position: absolute;
    }
`;
export const anchor = (typography: RhythmTypography) =>
    css`
        ${content(typography)}
    `;
export const list = (typography: RhythmTypography) => css`
    ${content(typography)}
    margin-top: 0;
    margin-bottom: ${typography.rhythm.getStyleRhythmHeight(1)};

    li {
        margin: 0;
    }
`;
export const blockquote = (typography: RhythmTypography) => css`
    ${content(typography)}
    & > * {
        margin-left: ${typography.rhythm.getStyleRhythmHeight(1)};
    }
`;
export const image = (typography: RhythmTypography) =>
    css`
        width: 100%;
    `;
export const H1 = (typography: RhythmTypography) =>
    css`
        ${typography.verticalRhythm({ fontScale: 6 })}
    `;
export const H2 = (typography: RhythmTypography) =>
    css`
        ${typography.verticalRhythm({ fontScale: 5 })}
    `;
export const H3 = (typography: RhythmTypography) =>
    css`
        ${typography.verticalRhythm({ fontScale: 4 })}
    `;
export const H4 = (typography: RhythmTypography) =>
    css`
        ${typography.verticalRhythm({ fontScale: 3 })}
    `;
export const H5 = (typography: RhythmTypography) =>
    css`
        ${typography.verticalRhythm({ fontScale: 2 })}
    `;
export const H6 = (typography: RhythmTypography) =>
    css`
        ${typography.verticalRhythm({ fontScale: 1 })}
    `;

const styles = {
    content,
    paragraph,
    preformatted,
    anchor,
    list,
    blockquote,
    image,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6
};
export default styles;
