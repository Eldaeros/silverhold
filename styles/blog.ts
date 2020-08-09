import { css } from 'styled-components';
import { msFunction } from '../libs/modularScale';

export const scale = {
    minorThird: (idx) =>
        msFunction(idx, {
            base: 1,
            ratio: 1.2
        }),
    majorThird: (idx) =>
        msFunction(idx, {
            base: 1,
            ratio: 1.25
        })
};

const getScale = (ms, minor: number, major: number) => {
    return ms === 'minorThird' ? minor : major;
};

export const content = (ms: string) => css`
    margin: 0;
    ${(props) =>
        props.theme.setFontWithRhythm(
            'Muli',
            scale[ms](2),
            getScale(ms, 1, 1.5)
        )};
    padding-bottom: ${(props) =>
        props.theme.rhythmSizing(getScale(ms, 2, 5))}rem;
`;

const styles = (ms: string) => css`
    * {
        margin-top: 0;
        color: rgba(57, 57, 57, 0.99);
    }
    h1 {
        ${(props) => props.theme.setFontWithRhythm('Muli', scale[ms](7))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }

    h2 {
        ${(props) => props.theme.setFontWithRhythm('Muli', scale[ms](6))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }
    h3 {
        ${(props) => props.theme.setFontWithRhythm('Muli', scale[ms](5))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }
    h4 {
        ${(props) => props.theme.setFontWithRhythm('Muli', scale[ms](4))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }
    h5 {
        ${(props) => props.theme.setFontWithRhythm('Muli', scale[ms](3))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }
    h6 {
        ${(props) => props.theme.setFontWithRhythm('Muli', scale[ms](2))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }

    p {
        ${content(ms)}

        code {
            ${(props) =>
                props.theme.setFontWithRhythm('Fira Code', scale[ms](1))};
            padding: 0;
            display: inline-block;
        }
    }

    pre {
        line-height: calc(1.85 * ${(props) => props.theme.rhythmSizing(0)}rem);
        min-height: ${(props) => props.theme.rhythmSizing(2)}rem;
        background-color: lightgray;
        overflow: hidden;
        margin: ${(props) => props.theme.rhythmSizing(2)}rem 0;
        box-sizing: content-box;
        code {
            ${(props) =>
                props.theme.setFontWithRhythm('Fira Code', scale[ms](1))};
            margin-left: ${(props) => props.theme.rhythmSizing(2)}rem;
            padding: ${(props) => props.theme.rhythmSizing(2)}rem 0;
            display: inline-block;
            position: absolute;
        }
    }

    a {
        ${content(ms)}
    }

    ul,
    ol {
        ${content(ms)}

        li {
            margin: 0;
        }
    }

    blockquote {
        ${content(ms)}
        padding: 0;
        margin: 0;

        p {
            padding-bottom: 0;
        }

        & > * {
            margin-left: ${(props) =>
                props.theme.rhythmSizing(getScale(ms, 2, 5))}rem;
        }
    }

    image {
        width: 100%;
    }
`;

export default styles;
