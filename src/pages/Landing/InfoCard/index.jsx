import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { CustomIcon } from '../../../components/Icon';
import Text from '../../../components/Text';
import Card from '../../../components/Card';

function InfoCard({ icon, title, desc }) {
    return (
        <Card className="h-100" background="primaryFaded" hover margin={false}>
            <Row className="p" align="middle">
                <Col>
                    <CustomIcon icon={icon} large />
                </Col>
                <Col flex="1">
                    <Text className="m-0" type="subtitle" color="primary" bold>
                        {title}
                    </Text>
                    <Text color="primary">{desc}</Text>
                </Col>
            </Row>
        </Card>
    );
}

InfoCard.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
};
InfoCard.defaultProps = {
    icon: '',
    title: '',
    desc: '',
};

export default InfoCard;
