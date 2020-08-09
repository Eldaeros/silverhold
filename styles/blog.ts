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

export const content = (modularScale: string) => css`
    margin: 0;
    ${(props) =>
        props.theme.setFontWithRhythm(
            'Muli',
            scale[modularScale](2),
            modularScale === 'majorThird' ? 1.5 : undefined
        )};
    padding-bottom: ${(props) => props.theme.rhythmSizing(2)}rem;
`;

const styles = (modularScale: string) => css`
    * {
        margin-top: 0;
    }
    h1 {
        ${(props) =>
            props.theme.setFontWithRhythm('Muli', scale[modularScale](8))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }

    h2 {
        ${(props) =>
            props.theme.setFontWithRhythm('Muli', scale[modularScale](7))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }
    h3 {
        ${(props) =>
            props.theme.setFontWithRhythm('Muli', scale[modularScale](6))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }
    h4 {
        ${(props) =>
            props.theme.setFontWithRhythm('Muli', scale[modularScale](5))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }
    h5 {
        ${(props) =>
            props.theme.setFontWithRhythm('Muli', scale[modularScale](4))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }
    h6 {
        ${(props) =>
            props.theme.setFontWithRhythm('Muli', scale[modularScale](3))}
        padding-bottom: ${(props) => props.theme.rhythmSizing(1)}rem;
    }

    p {
        ${content(modularScale)}

        code {
            ${(props) =>
                props.theme.setFontWithRhythm(
                    'Fira Code',
                    scale[modularScale](1)
                )};
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
                props.theme.setFontWithRhythm(
                    'Fira Code',
                    scale[modularScale](1)
                )};
            margin-left: ${(props) => props.theme.rhythmSizing(2)}rem;
            padding: ${(props) => props.theme.rhythmSizing(2)}rem 0;
            display: inline-block;
            position: absolute;
        }
    }

    a {
        ${content(modularScale)}
    }

    ul,
    ol {
        ${content(modularScale)}

        li {
            margin: 0;
        }
    }

    blockquote {
        ${content(modularScale)}
        padding: 0;
        margin: 0;

        & > * {
            margin-left: ${(props) => props.theme.rhythmSizing(2)}rem;;
        }
    }

    image {
        width: 100%;
    }
`;

export default styles;
