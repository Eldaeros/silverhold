import styled, { css } from 'styled-components';
import Shevy from 'shevyjs';
import { Variant } from '@material-ui/core/styles/createTypography';

export const shevy = new Shevy({
    baseFontSize: '1rem',
    baseLineHeight: 1.5,
    baseFontScale: 'minorThird',
    addMarginBottom: false
});
export const { h1, h2, h3, h4, h5, h6, content } = shevy; // Destructures the styles for h1 and content-based tags
export const { baseSpacing, lineHeightSpacing } = shevy;

export const PageTitle = styled.div`
    ${h1};
    color: ${({ theme }) => theme.colors.primary};
`;

export const SubTitle = styled.div`
    ${h2}
`;

export const Content = styled.div`
    ${content}
`;

const variantToSemantic = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h3',
    subtitle2: 'h4',
    body1: 'content',
    body2: 'content'
};

interface TypopgraphyProps {
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    children?: React.ReactNode;
    color?: string;
    display?: 'initial' | 'block' | 'inline';
    variant: Variant;
    component?: string | (() => JSX.Element);
}

export const Typography = (props: TypopgraphyProps) => {
    const variantStyle = shevy[variantToSemantic[props.variant]];
    const componentStyle = css`
        text-align: ${!!props.align ? props.align : 'inherit'};
        ${!!props.color ? `color: ${props.color}` : ''};
        ${variantStyle}
    `;

    const semanticElement =
        props.component !== undefined
            ? props.component
            : variantToSemantic[props.variant];

    const Component =
        props.component !== undefined
            ? styled[semanticElement]`
                  ${componentStyle}
              `
            : styled.div`
                  ${componentStyle}
              `;

    return <Component>{props.children}</Component>;
};
