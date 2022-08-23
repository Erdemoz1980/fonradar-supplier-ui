import React, { useEffect, useState } from 'react';
import { Row, Col, Tag, Table, Card, Button } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../../components/Text';
import { chequeStatusMapByValue } from '../../constants';
import { convertFloatDotSeperated } from '../../utils';
import { setDiscountInvoice } from '../../store/reducers/fundSlice';
import { fetchDiscountInvoiceById, fetchInvoiceOffer, acceptInvoiceOffer } from '../../apiServices/fundApi';

const FundDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [offers, setOffers] = useState();
    const { discountInvoice } = useSelector((state) => state.fund);
    const { user } = useSelector((state) => state.user);

    const status = (discountInvoice?.status && chequeStatusMapByValue[discountInvoice?.status]) || {};
    const statusColor = status?.color || 'smoke';
    const statusDesc = status?.desc || '';

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
            <Card style={{ borderLeftColor: statusColor }}>
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
                </Tag>

                <Row className="mt" gutter={[10, 20]}>
                    <Col xs={24}>
                        <Col xs={24} lg={12} xl={6}>
                            <Text className="status-title" type="h2" bold>
                                Talep Detayı
                            </Text>
                        </Col>
                        <Row className="mt" gutter={[10, 20]}>
                            <Col xs={24} lg={12} xl={6}>
                                <Text className="item-title" color={statusColor}>
                                    Fon Radar Başvuru No:{' '}
                                </Text>
                                <Text className="font-18" bold>
                                    {discountInvoice?.number || '-'}
                                </Text>
                            </Col>

                            <Col xs={24} lg={12} xl={6}>
                                <Text className="item-title" color={statusColor}>
                                    İşlem Tarihi:{' '}
                                </Text>
                                <Text className="font-18" bold>
                                    {moment(discountInvoice?.date).format('DD/MM/YYYY') || '-'}
                                </Text>
                            </Col>

                            <Col xs={24} lg={12} xl={6}>
                                <Text className="item-title" color={statusColor}>
                                    Toplam Fatura Tutarı:{' '}
                                </Text>
                                <Text className="font-18" bold>
                                    {discountInvoice?.invoicesTotal &&
                                        convertFloatDotSeperated(discountInvoice?.invoicesTotal)}{' '}
                                    ₺
                                </Text>
                            </Col>

                            <Col xs={24} lg={12} xl={6}>
                                <Text className="item-title" color={statusColor}>
                                    Toplam Fatura Adedi:{' '}
                                </Text>
                                <Text className="font-18" bold>
                                    {discountInvoice?.invoicesCount || '-'}
                                </Text>
                            </Col>

                            <Col xs={24} lg={12} xl={6}>
                                <Text className="item-title" color={statusColor}>
                                    Ortalama Vade:{' '}
                                </Text>
                                <Text className="font-18" bold>
                                    {discountInvoice?.supplierAverageCreditDay} Gün
                                </Text>
                            </Col>

                            <Col xs={24} lg={12} xl={6}>
                                <Text className="item-title" color={statusColor}>
                                    Alıcı:{' '}
                                </Text>
                                <Text className="font-18" bold>
                                    {discountInvoice?.buyerTitle}
                                </Text>
                            </Col>
                        </Row>
                    </Col>
                    {discountInvoice?.invoices?.length > 0 && (
                        <Col span={24}>
                            <Table
                                pagination={false}
                                rowKey="index"
                                dataSource={discountInvoice?.invoices}
                                columns={tableCols}
                            />
                        </Col>
                    )}
                </Row>
            </Card>
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
