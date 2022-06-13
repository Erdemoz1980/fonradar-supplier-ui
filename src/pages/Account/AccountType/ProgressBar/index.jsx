import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Row } from 'antd';
import { ProgressBarContainer, Gradient, Tick, TickContainer } from './styles';
import Text from '../../../../components/Text';
import { getRemainingPremiumDates } from '../../../../utils';

function ProgressBar({ expirationDate }) {
    const [todayTickPercentage, setTodayTickPercentage] = useState();

    useEffect(() => {
        if (expirationDate) {
            const remainingDays = getRemainingPremiumDates(expirationDate);
            const fullPremiumDay = 30;
            const remainingPercentage = (remainingDays * 100) / fullPremiumDay;

            setTodayTickPercentage(100 - remainingPercentage);
        }
    }, [expirationDate]);

    return (
        <ProgressBarContainer>
            <Row justify="end">
                <div>
                    <Text className="d-block" color="smoke">
                        Son Kullanım Tarihi
                    </Text>
                    <Text className="d-block" align="end" bold>
                        {moment(expirationDate).format('DD-MM-YYYY')}
                    </Text>
                </div>
            </Row>
            <Gradient />
            <TickContainer percentage={todayTickPercentage}>
                <Tick />
                <Text className="d-block" type="small" color="smoke">
                    Bugün
                </Text>
                <Text type="small" bold>
                    {moment().format('DD-MM-YYYY')}
                </Text>
            </TickContainer>
        </ProgressBarContainer>
    );
}

ProgressBar.propTypes = {
    expirationDate: PropTypes.string,
};
ProgressBar.defaultProps = {
    expirationDate: '',
};

export default ProgressBar;
