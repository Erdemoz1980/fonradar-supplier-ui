import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from 'styled-components';
import {
    faUser,
    faAngleDown,
    faSearch,
    faArrowRight,
    faBars,
    faSync,
    faPlus,
    faInfoCircle,
    faTimesCircle,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faTrashAlt, faBell } from '@fortawesome/free-regular-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import hand from '../../assests/icons/hand.svg';
import search from '../../assests/icons/search.svg';
import fund from '../../assests/icons/fund.svg';
import user from '../../assests/icons/user.svg';
import helpSecondary from '../../assests/icons/help-secondary.svg';
import info from '../../assests/icons/info.svg';
import verified from '../../assests/icons/verified.svg';
import filePdf from '../../assests/icons/file-pdf.svg';
import filePng from '../../assests/icons/file-png.svg';
import fileJpeg from '../../assests/icons/file-jpeg.svg';
import supplierFinancing from '../../assests/icons/supplierFinancing.svg';

library.add(
    faUser,
    faAngleDown,
    faSearch,
    faArrowRight,
    faBars,
    faCheckCircle,
    faSync,
    faPlus,
    faInfoCircle,
    faTimesCircle,
    faChevronLeft,
    faChevronRight,
    faTrashAlt,
    faBell
);
const customIcons = {
    hand,
    search,
    fund,
    user,
    helpSecondary,
    info,
    verified,
    supplierFinancing,
    pdf: filePdf,
    png: filePng,
    jpeg: fileJpeg,
};

function Icon({ color, margin, className, ...props }) {
    const theme = useTheme();
    const themedColor = theme.getThemedColor(color);

    return (
        <FontAwesomeIcon color={themedColor} className={`${className} ${margin ? 'mr' : ''}`} {...props} />
    );
}

export const CustomIcon = ({ icon, height, width, margin, className, large }) => (
    <img
        src={customIcons[icon]}
        height={large ? 40 : height}
        width={large ? 40 : width}
        className={`${className} ${margin ? 'mr' : ''}`}
        alt={`icon-${icon}`}
    />
);

Icon.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    margin: PropTypes.bool,
};
Icon.defaultProps = {
    className: '',
    color: 'primary',
    margin: true,
};

CustomIcon.propTypes = {
    icon: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    margin: PropTypes.bool,
    large: PropTypes.bool,
};
CustomIcon.defaultProps = {
    icon: '',
    className: '',
    height: 24,
    width: 24,
    margin: true,
    large: false,
};

export default Icon;
