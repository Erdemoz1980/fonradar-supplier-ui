import React, { useEffect } from 'react';
import { Row, Col, Tag, Table, Card } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../../components/Text';
import { chequeStatusMapByValue } from '../../constants';
import { convertFloatDotSeperated } from '../../utils';
import { setDiscountInvoice } from '../../store/reducers/fundSlice';
import { fetchDiscountInvoiceById } from '../../apiServices/fundApi';

const FundDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { discountInvoice } = useSelector((state) => state.fund);

    const status = (discountInvoice?.status && chequeStatusMapByValue[discountInvoice?.status]) || {};
    const statusColor = status?.color || 'smoke';
    const statusDesc = status?.desc || '';

    const fetchFinancialbyId = async () => {
        if (id) {
            const response = await fetchDiscountInvoiceById('a0cca5b1-a716-4703-b9ca-450a4d228026', id);
            dispatch(setDiscountInvoice(response));
        }
    };

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

    return (
        <Card style={{ borderLeftColor: statusColor }}>
            <Tag style={{ display: 'block', whiteSpace: 'normal' }} className="p px-big" color={statusColor}>
                <Text className="m-0" color="inherit" bold>
                    {status.text}
                    {' - '}
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
    );
};

export default FundDetail;
