import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Col, Divider, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import { getRemainingPremiumDates, oneColWideLayout } from '../../../utils';
import { fetchCorporatitons } from '../../../store/funds/fundActions';
import InvoicesSummary from '../../SupplierFinancingNew/SupplierFinancingForm/InvoicesSumary';

function PreferredCorporationsForm({ invoices, title, desc, submitText, loading, onBack, onSubmit }) {
    const dispatch = useDispatch();
    const [selectedCorporations, setSelectedCorporations] = useState([]);
    const { corporations, isCorporationsLoading } = useSelector(({ funds }) => funds);
    const { user, isUserLoading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchCorporatitons());
    }, [dispatch]);

    const onChangeSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedCorporations(corporations.map(({ id }) => id));
        } else {
            setSelectedCorporations([]);
        }
    };
    const handleOnSubmit = () => {
        if (onSubmit) {
            onSubmit(selectedCorporations);
        }
    };

    const getPremiumText = () => {
        if (user && user.isPremium) {
            const remainingPremiumDates = getRemainingPremiumDates(user.premiumExpirationDate);
            return `${remainingPremiumDates || 0} gününüz kaldı.`;
        }
        return `Premium süreniz doldu.`;
    };

    return (
        <Row>
            <Col {...oneColWideLayout}>
                <Text type="title">{title}</Text>
                <Text>{desc}</Text>
                <InvoicesSummary invoices={invoices} />
                <div className="my-big">
                    <Text type="subtitle" color="dark" bold>
                        Kayıtlı kurumlardan seç ve fon ara
                    </Text>
                    <div>
                        <Spin spinning={isUserLoading}>
                            <Text>
                                Fon Radar Premium Süreniz:{' '}
                                <Text color="primary" bold>
                                    {getPremiumText()}
                                </Text>
                            </Text>
                        </Spin>
                    </div>
                    <div>
                        <Spin spinning={isUserLoading}>
                            <Text>
                                Fon Radar Krediniz:{' '}
                                <Text color="primary" bold>
                                    {user && user.fundCredit} adet
                                </Text>
                            </Text>
                        </Spin>
                    </div>
                </div>

                <Spin spinning={isCorporationsLoading}>
                    <div>
                        <Checkbox
                            className="pl-big"
                            checked={
                                selectedCorporations.length &&
                                selectedCorporations.length === corporations.length
                            }
                            onChange={onChangeSelectAll}>
                            <Text className="ml">Hepsi</Text>
                        </Checkbox>
                    </div>

                    <Divider className="my" />

                    <Checkbox.Group
                        className="d-block pl-big"
                        value={selectedCorporations}
                        onChange={setSelectedCorporations}>
                        {corporations.map(({ id, name }) => (
                            <div key={`checkbox-corporations-${id}`}>
                                <Checkbox className="mb hover-scale" value={id}>
                                    <Text className="ml">{name}</Text>
                                </Checkbox>
                            </div>
                        ))}
                    </Checkbox.Group>
                </Spin>

                <div className="mt-big">
                    <Button className="mr" size="large" onClick={onBack}>
                        Geri
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleOnSubmit}
                        loading={isCorporationsLoading || loading}
                        disabled={!selectedCorporations.length}>
                        {submitText}
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

PreferredCorporationsForm.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    submitText: PropTypes.string,
    loading: PropTypes.bool,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
PreferredCorporationsForm.defaultProps = {
    title: '',
    desc: '',
    submitText: 'İleri',
    loading: false,
};

export default PreferredCorporationsForm;
