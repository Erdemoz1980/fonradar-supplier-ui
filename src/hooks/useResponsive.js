import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'styled-components';
// xs - sm - md - lg
// --isMobile-- <= md

function useResponsive() {
    const theme = useTheme();
    const { xsMaxSize, smMinSize, mdMinSize, lgMinSize, xlMinSize, xxlMinSize } = theme.main;

    const xs = useMediaQuery({ query: `(max-width: ${xsMaxSize})` });
    const sm = useMediaQuery({ query: `(min-width: ${smMinSize})` });
    const md = useMediaQuery({ query: `(min-width: ${mdMinSize})` });
    const lg = useMediaQuery({ query: `(min-width: ${lgMinSize})` });
    const xl = useMediaQuery({ query: `(min-width: ${xlMinSize})` });
    const xxl = useMediaQuery({ query: `(min-width: ${xxlMinSize})` });

    return {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
        isMobile: xs,
    };
}

export default useResponsive;
