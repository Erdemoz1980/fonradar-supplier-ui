import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import StyledContent, { HelpLink } from './styles';
import Button from '../../Button';
import Text from '../../Text';
import { CustomIcon } from '../../Icon';
import urls, { breadcrumbs } from '../../../routes/urls';

function Content({ children, ...props }) {
    const location = useLocation();
    const { pathname } = location;

    return (
        <StyledContent {...props}>
            {breadcrumbs[pathname] && breadcrumbs[pathname].length > 0 && (
                <>
                    <Breadcrumb className="mb-big" separator=">">
                        {breadcrumbs[pathname].map(({ name, url }) => (
                            <Breadcrumb.Item key={`breadcrumb-${name}`}>
                                <Link to={url}>{name}</Link>
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </>
            )}

            {children}

            <HelpLink to={urls.help}>
                <Button type="default-secondary" size="large">
                    <CustomIcon icon="helpSecondary" />
                    <Text bold>Yardım</Text>
                </Button>
            </HelpLink>
        </StyledContent>
    );
}

Content.propTypes = {
    children: PropTypes.node,
};
Content.defaultProps = {
    children: () => null,
};

export default Content;
