/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

const getFontWeight = (isBold, weight, defaultWeight) => {
    if (isBold) return 600;
    return weight || defaultWeight;
};

export const Span = styled.span`
    font-size: ${({ theme }) => theme.main.textFontSize};

    &.small {
        font-size: 13px;
    }

    font-weight: ${({ theme, bold, weight }) => getFontWeight(bold, weight, theme.main.textFontWeight)};
    text-align: ${({ align }) => align};
    text-decoration: ${({ underlined }) => (underlined ? 'underline' : '')};
    font-style: ${({ italic }) => (italic ? 'italic' : 'initial')};

    color: ${({ theme, color }) => theme.getThemedColor(color)};
`;

export const P = styled.p`
    font-size: ${({ theme }) => theme.main.textFontSize};

    &.small {
        font-size: 13px;
    }

    font-weight: ${({ theme, bold, weight }) => getFontWeight(bold, weight, theme.main.textFontWeight)};
    text-align: ${({ align }) => align};
    text-decoration: ${({ underlined }) => (underlined ? 'underline' : '')};
    font-style: ${({ italic }) => (italic ? 'italic' : 'initial')};

    color: ${({ theme, color }) => theme.getThemedColor(color)};
`;

export const H1 = styled.h1`
    font-size: ${({ theme }) => theme.main.h1FontSize};

    font-weight: ${({ theme, bold, weight }) => getFontWeight(bold, weight, theme.main.textFontWeight)};
    text-align: ${({ align }) => align};
    text-decoration: ${({ underlined }) => (underlined ? 'underline' : '')};
    font-style: ${({ italic }) => (italic ? 'italic' : 'initial')};

    color: ${({ theme, color }) => theme.getThemedColor(color)};
`;

export const H2 = styled.h2`
    font-size: ${({ theme }) => theme.main.h2FontSize};

    font-weight: ${({ theme, bold, weight }) => getFontWeight(bold, weight, theme.main.textFontWeight)};
    text-align: ${({ align }) => align};
    text-decoration: ${({ underlined }) => (underlined ? 'underline' : '')};
    font-style: ${({ italic }) => (italic ? 'italic' : 'initial')};

    color: ${({ theme, color }) => theme.getThemedColor(color)};
`;

export const H3 = styled.h3`
    font-weight: ${({ theme, bold, weight }) => getFontWeight(bold, weight, theme.main.textFontWeight)};
    text-align: ${({ align }) => align};
    text-decoration: ${({ underlined }) => (underlined ? 'underline' : '')};
    font-style: ${({ italic }) => (italic ? 'italic' : 'initial')};

    color: ${({ theme, color }) => theme.getThemedColor(color)};
`;

export const H4 = styled.h4`
    font-weight: ${({ theme, bold, weight }) => getFontWeight(bold, weight, theme.main.textFontWeight)};
    text-align: ${({ align }) => align};
    text-decoration: ${({ underlined }) => (underlined ? 'underline' : '')};

    color: ${({ theme, color }) => theme.getThemedColor(color)};
`;

export const H5 = styled.h5`
    font-weight: ${({ theme, bold, weight }) => getFontWeight(bold, weight, theme.main.textFontWeight)};
    text-align: ${({ align }) => align};
    text-decoration: ${({ underlined }) => (underlined ? 'underline' : '')};
    font-style: ${({ italic }) => (italic ? 'italic' : 'initial')};

    color: ${({ theme, color }) => theme.getThemedColor(color)};
`;
