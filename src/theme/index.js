// some options may be initialized in the "croco.config.js"
// these options are marked with comments -> "//craco.config"
// please make same changes on craco.config.js

const red = '#f5222d';
const volcano = '#fa541c';
const orange = '#ff8300';
const gold = '#faad14';
const yellow = '#fadb14';
const lime = '#a0d911';
const green = '#5ad363';
const cyan = '#13c2c2';
const blue = '#00a6fb';
const geekblue = '#1a73e8';
const purple = '#9400ff';
const magenta = '#eb2f96';
const light = '#fff';
const dark = '#000';

const primaryColor = '#0d0f7b'; // craco.config
const primaryLight = '#eeeeff';
const primaryDark = '#032b5e'; // craco.config
const primaryFaded = '#F5F8FE';

const secondaryColor = '#5ad363';
const secondaryLight = '#c8ffdb';
const secondaryDark = '#0b732f';

const spaceColor = '#fff';
const darkSpaceColor = '#212934';

const createAnimation = (duration = 0.3) => `${duration}s cubic-bezier(.25,.8,.25,1)`;
export const getThemedColor = (color, themeObj) => {
    switch (color) {
        case 'primary':
            return themeObj.main.primaryColor;
        case 'secondary':
            return themeObj.main.secondaryColor;
        default:
            return themeObj.main[color] || color;
    }
};

// ** INDEX **
// MAIN
// COMPONENTS
// PAGES
// FUNCTIONS

// Use mobile values for < 576px

const theme = {
    // MAIN
    main: {
        primaryColor,
        primaryDark,
        primaryLight,
        primaryFaded,
        secondaryColor,
        secondaryLight,
        secondaryDark,
        red,
        blue,
        geekblue,
        volcano,
        orange,
        gold,
        yellow,
        lime,
        green,
        cyan,
        purple,
        magenta,
        light,
        dark,
        smokeBackgroundColor: '#FCFBFC',
        spaceBackgroundColor: spaceColor,

        xsMaxSize: '576px',
        smMinSize: '576px',
        mdMinSize: '768px',
        lgMinSize: '992px',
        xlMinSize: '1200px',
        xxlMinSize: '1600px',
        limitedWidth: '1400px',

        // craco.config
        borderRadius: '6px',

        /*eslint-disable */
        shadowHover: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05);',
        shadow: '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)',
        /* eslint-enable */

        defaultAnimation: createAnimation(),

        margin: '10px',
        marginMobile: '7px',
        marginBig: '40px',
        marginBigMobile: '15px',
        padding: '10px',
        paddingMobile: '7px',
        paddingMedium: '20px',
        paddingBig: '40px',
        paddingBigMobile: '15px',

        textFontWeight: '500',
        textFontSize: '16px', // craco.config
        h1FontSize: '24px',
        h2FontSize: '20px',

        lightTextColor: '#c0c0c0',
        smoke: '#727272',
    },

    // COMPONENTS
    header: {
        backgroundColor: spaceColor,
        height: '96px',
        horizontalPadding: '40px',
    },
    content: {
        paddingHorizontal: '6vw',
    },
    footer: {
        backgroundColor: darkSpaceColor,
    },
    card: {
        background: spaceColor,
        margin: '10px',
        padding: '10px',
        borderRadius: '5px',
    },

    // PAGES

    // FUNCTIONS
    getThemedColor(color) {
        return getThemedColor(color, theme);
    },
    createAnimation,
};

/* eslint-disable no-bitwise */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-operators */
export const lightenColor = (color, strength = 0.4) => {
    // strength 0 - 1
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * strength * 100);
    const R = (num >> 16) + amt;
    const B = ((num >> 8) & 0x00ff) + amt;
    const G = (num & 0x0000ff) + amt;
    return `#${(
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
        .toString(16)
        .slice(1)}`;
};

export default theme;
