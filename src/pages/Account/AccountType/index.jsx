import React, { useEffect, useState } from 'react';
import { Col, Divider, Row, Spin } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Text from '../../../components/Text';
import { oneColWideLayout } from '../../../utils';
// import { fetchUser } from '../../../store/user/userActions';
import ProgressBar from './ProgressBar';

function AccountType() {
    // const dispatch = useDispatch();
    const [isPremiumExpired, setIsPremiumExpired] = useState(false);
    const { user, isUserLoading } = useSelector((state) => state.user);

    // useEffect(() => {
    //     dispatch(fetchUser());
    // }, [dispatch]);

    useEffect(() => {
        if (user) {
            const { premiumExpirationDate } = user;

            if (moment() > moment(premiumExpirationDate)) {
                setIsPremiumExpired(true);
            }
        }
    }, [user]);

    return (
        <Row>
            <Col {...oneColWideLayout}>
                <div className="mb">
                    <Text type="title" bold>
                        Hesap Tipi
                    </Text>
                    <Text className="d-block">Kalan premium üyelik süreni ya da kredi adedini öğren.</Text>

                    <Divider />

                    <Text>
                        Fon Radar Krediniz:{' '}
                        <Text color="primary" bold>
                            {user && user.fundCredit} adet
                        </Text>
                    </Text>

                    <Divider />

                    {!isPremiumExpired && (
                        <div className="my-big">
                            <Text className="mt" type="small" bold>
                                Premium 30 gün boyunca ücretsiz.
                            </Text>
                        </div>
                    )}
                </div>

                <Spin spinning={isUserLoading}>
                    {isPremiumExpired ? (
                        <Text bold>Maalesef Premium süreniz doldu.</Text>
                    ) : (
                        <ProgressBar expirationDate={user && user.premiumExpirationDate} />
                    )}
                </Spin>
            </Col>
        </Row>
    );
}
export default AccountType;
