import styled from 'styled-components';
import Shevy from 'shevyjs';

export const shevy = new Shevy({
    baseFontSize: '16px',
    baseLineHeight: 1,
    baseFontScale: 'majorThird',
    addMarginBottom: true
});
const { h1, h2, content } = shevy; // Destructures the styles for h1 and content-based tags
export const { baseSpacing } = shevy;

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
