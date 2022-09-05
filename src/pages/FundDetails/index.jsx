import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../../components/Text';
import { chequeStatusMapByValue } from '../../constants';
import { convertFloatDotSeperated } from '../../utils';
import { setDiscountInvoice } from '../../store/reducers/fundSlice';
import { LeftSideBox } from './styles';
import { fetchDiscountInvoiceById, fetchInvoiceOffer, acceptInvoiceOffer } from '../../apiServices/fundApi';

const FundDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [offers, setOffers] = useState();
    const { discountInvoice } = useSelector((state) => state.fund);
    const { user } = useSelector((state) => state.user);

    const status = (discountInvoice?.status && chequeStatusMapByValue[discountInvoice?.status]) || {};
    const statusColor = status?.color || 'smoke';
    // const statusDesc = status?.desc || '';

    const fetchFinancialbyId = async () => {
        if (id) {
            const response = await fetchDiscountInvoiceById(id);
            dispatch(setDiscountInvoice(response));
        }
    };

    const getInvoiceOffer = async () => {
        if (id) {
            const response = await fetchInvoiceOffer(id);
            setOffers(response.offers);
        }
    };

    useEffect(() => {
        if (status.value === 'CEVAP_GELDI') {
            getInvoiceOffer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    useEffect(() => {
        fetchFinancialbyId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const tableCols = [
        {
            title: 'Fatura No',
            dataIndex: 'invoiceNumber',
            key: 'invoiceNumber',
        },
        {
            title: 'Fatura Tarihi',
            dataIndex: 'invoiceDate',
            key: 'invoiceDate',
            render: (date) => moment(date).format('DD-MM-YYYY'),
        },
        {
            title: 'Borçlu VKN',
            dataIndex: 'invoiceOwnerTaxNumber',
            key: 'invoiceOwnerTaxNumber',
        },
        {
            title: 'Platform',
            dataIndex: 'invoiceOwnerTitle',
            key: 'invoiceOwnerTitle',
        },
        {
            title: 'Fatura Tutarı',
            dataIndex: 'invoiceTotal',
            key: 'invoiceTotal',
            render: (price) => `${convertFloatDotSeperated(price)} ₺`,
        },
    ];

    const acceptOffer = async (ofer) => {
        const response = await acceptInvoiceOffer(
            user.id,
            ofer.discountApplicationId,
            ofer.financialInstitutionId,
            {
                supplierId: user.id,
                discountApplicationId: ofer.discountApplicationId,
                financialInstitutionId: ofer.financialInstitutionId,
                discountApplicationStatus: discountInvoice?.status,
                offer: ofer.offer,
                offerCondition: ofer.offerCondition,
            }
        );
        if (response) {
            fetchFinancialbyId();
        }
    };

    return (
        <>
            {/* <Card style={{ borderLeftColor: statusColor }}>
                <Tag
                    style={{ display: 'block', whiteSpace: 'normal' }}
                    className="p px-big"
                    color={statusColor}>
                    <Text className="m-0" color="inherit" bold>
                        {status.text}
                        {statusDesc ? ' - ' : ''}
                        <Text style={{ display: 'inline-block' }} className="m-0" type="h4" color="inherit">
                            {statusDesc}
                        </Text>
                    </Text>
                </Tag> */}

            <Row className="mt" gutter={[10, 20]}>
                <Col span={6}>
                    <LeftSideBox>
                        <Text className="head-title">Başvuru Detayı</Text>
                        <Row className="status-box">
                            <div style={{ display: 'flex' }}>
                                <CheckCircleOutlined style={{ fontSize: '24px', color: statusColor }} />
                                <Text className="status-title" style={{ color: statusColor }}>
                                    {status.text}
                                </Text>
                            </div>
                            <ExclamationCircleOutlined style={{ fontSize: '20px', color: '#727272' }} />
                        </Row>
                        <Row className="item-box">
                            <div>
                                <Row className="item-row">
                                    <Text className="item-title">Fon radar Başvuru No</Text>
                                    <Text className="item-value">{discountInvoice?.number || '-'}</Text>
                                </Row>
                                <Row className="item-row">
                                    <Text className="item-title">Alıcı</Text>
                                    <Text className="item-value">{discountInvoice?.buyerTitle}</Text>
                                </Row>
                                <Row className="item-row">
                                    <Text className="item-title">İşlem Tarihi</Text>
                                    <Text className="item-value">
                                        {moment(discountInvoice?.date).format('DD-MM-YYYY') || '-'}
                                    </Text>
                                </Row>
                                <Row className="item-row">
                                    <Text className="item-title">Toplam Fatura Tutarı</Text>
                                    <Text className="item-value">
                                        {discountInvoice?.invoicesTotal &&
                                            convertFloatDotSeperated(discountInvoice?.invoicesTotal)}{' '}
                                        ₺
                                    </Text>
                                </Row>
                                <Row className="item-row">
                                    <Text className="item-title">Ortalama Vade</Text>
                                    <Text className="item-value">
                                        {discountInvoice?.supplierAverageCreditDay} Gün
                                    </Text>
                                </Row>
                                <Row className="item-row">
                                    <Text className="item-title">Fatura Adet</Text>
                                    <Text className="item-value">
                                        {' '}
                                        {discountInvoice?.invoicesCount || '-'}
                                    </Text>
                                </Row>
                            </div>
                        </Row>
                    </LeftSideBox>
                </Col>
                {discountInvoice?.invoices?.length > 0 && (
                    <Col span={16} offset={1}>
                        <Table
                            pagination={false}
                            rowKey="index"
                            dataSource={discountInvoice?.invoices}
                            columns={tableCols}
                        />
                    </Col>
                )}
            </Row>
            {/* </Card> */}
            {status && status.value === 'ONAYLADIM' && (
                <div className="mt">
                    <Text>Teklif(ler)</Text>
                    <Row className="mt">
                        <Col xs={24} lg={12} xl={6}>
                            <Text style={{ display: 'block' }}>Finansal Kurum:</Text>
                            <Text>{discountInvoice.financialInstitutionName || '-'}</Text>
                        </Col>
                        <Col xs={24} lg={12} xl={6}>
                            <Text style={{ display: 'block' }}>Teklif Tutarı:</Text>
                            <Text>{convertFloatDotSeperated(discountInvoice.offer)} TL</Text>
                        </Col>
                        <Col xs={24} lg={12} xl={6}>
                            <Text style={{ display: 'block' }}>Koşul:</Text>
                            <Text>
                                {discountInvoice.offerCondition ? discountInvoice.offerCondition : '-'}
                            </Text>
                        </Col>
                    </Row>
                </div>
            )}
            {status && status.value === 'CEVAP_GELDI' && (
                <div className="mt">
                    <Text>Teklif(ler)</Text>
                    {offers &&
                        offers.map((ofer) => (
                            <>
                                <Row className="mt">
                                    <Col xs={24} lg={12} xl={6}>
                                        <Text style={{ display: 'block' }}>Finansal Kurum:</Text>
                                        <Text>{ofer.financialInstitutionName || '-'}</Text>
                                    </Col>
                                    <Col xs={24} lg={12} xl={6}>
                                        <Text style={{ display: 'block' }}>Teklif Tutarı:</Text>
                                        <Text>{convertFloatDotSeperated(ofer.offer)} TL</Text>
                                    </Col>
                                    <Col xs={24} lg={12} xl={6}>
                                        <Text style={{ display: 'block' }}>Koşul:</Text>
                                        <Text>{ofer.offerCondition ? ofer.offerCondition : '-'}</Text>
                                    </Col>
                                </Row>
                                <Button
                                    style={{ width: 190, marginTop: 20 }}
                                    type="primary"
                                    htmlType="submit"
                                    onClick={() => acceptOffer(ofer)}
                                    block>
                                    Teklifi Kabul Et
                                </Button>
                            </>
                        ))}
                </div>
            )}
        </>
    );
};

export default FundDetail;
