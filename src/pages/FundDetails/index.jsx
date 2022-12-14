import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button, Divider } from 'antd';
import { ExclamationCircleOutlined, ReloadOutlined, HourglassOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/Icon/index';
import Text from '../../components/Text';
import { chequeStatusMapByValue } from '../../constants';
import { convertFloatDotSeperated } from '../../utils';
import { setDiscountInvoice } from '../../store/reducers/fundSlice';
import { LeftSideBox } from './styles';
import { fetchDiscountInvoiceById, fetchInvoiceOffer, acceptInvoiceOffer } from '../../apiServices/fundApi';
import SuccessMsg from './SuccessMsg';

const FundDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [offers, setOffers] = useState();
    const [successRes, setSuccessRes] = useState(false);
    const [loading, setLoading] = useState(false);
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
            title: 'Bor??lu VKN',
            dataIndex: 'invoiceOwnerTaxNumber',
            key: 'invoiceOwnerTaxNumber',
        },
        {
            title: 'Platform',
            dataIndex: 'invoiceOwnerTitle',
            key: 'invoiceOwnerTitle',
        },
        {
            title: 'Fatura Tutar??',
            dataIndex: 'invoiceTotal',
            key: 'invoiceTotal',
            render: (price) => `${convertFloatDotSeperated(price)} ???`,
        },
    ];

    const acceptOffer = async (ofer) => {
        setLoading(true);
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
            setLoading(false);
            setSuccessRes(true);
            fetchFinancialbyId();
        }
    };


    return (
        <>
            {successRes ? (
                <SuccessMsg invoiceData={discountInvoice} />
            ) : (
                <Row className="mt" gutter={[10, 20]}>
                    <Col span={6}>
                        <LeftSideBox>
                            <Text className="head-title">Ba??vuru Detay??</Text>
                            <Row className="status-box">
                                <div style={{ display: 'flex' }}>
                                        {status.value === 'TEKLIF_BEKLIYOR' && <HourglassOutlined style={{fontSize:'24px', color:statusColor}} />}
                                        {status.value === 'CEVAP_GELDI' && <Icon style={{fontSize:'24px', color:statusColor}} icon={['far', 'envelope']} />}
                                        {status.value === 'SURESI_DOLDU' && <Icon style={{fontSize:'24px', color:statusColor}} icon={['far', 'angry']} />}
                                        {status.value === 'TEKLIFI_ONAYLADIM' && <Icon style={{fontSize:'24px', color:statusColor}} icon={['far', 'thumbs-up']} />}
                                        {status.value === 'ISLEME_ALINDI'&& <ReloadOutlined style={{ fontSize: '24px', color: statusColor }} />}
                                        {status.value === 'TEMLIKNAME_YUKLENDI'&& <Icon style={{ fontSize: '24px', color: statusColor }} icon={['far', 'arrow-alt-circle-Up']} />}
                                        
                                        
                                        
                                    <Text className="status-title" style={{ color: statusColor }}>
                                        {status.text}
                                    </Text>
                                </div>
                                <ExclamationCircleOutlined style={{ fontSize: '20px', color: '#727272' }} />
                            </Row>
                            <Row className="item-box">
                                <Col>
                                    <Row className="item-row">
                                        <Text className="item-title">Fon radar Ba??vuru No</Text>
                                        <Text className="item-value">{discountInvoice?.number || '-'}</Text>
                                    </Row>
                                    <Row className="item-row">
                                        <Text className="item-title">Al??c??</Text>
                                        <Text className="item-value">{discountInvoice?.buyerTitle}</Text>
                                    </Row>
                                    <Row className="item-row">
                                        <Text className="item-title">????lem Tarihi</Text>
                                        <Text className="item-value">
                                            {moment(discountInvoice?.date).format('DD-MM-YYYY') || '-'}
                                        </Text>
                                    </Row>
                                    <Row className="item-row">
                                        <Text className="item-title">Toplam Fatura Tutar??</Text>
                                        <Text className="item-value">
                                            {discountInvoice?.invoicesTotal &&
                                                convertFloatDotSeperated(discountInvoice?.invoicesTotal)}{' '}
                                            ???
                                        </Text>
                                    </Row>
                                    <Row className="item-row">
                                        <Text className="item-title">Ortalama Vade</Text>
                                        <Text className="item-value">
                                            {discountInvoice?.averageMaturity} G??n
                                        </Text>
                                    </Row>
                                    <Row className="item-row">
                                        <Text className="item-title">Fatura Adet</Text>
                                        <Text className="item-value">
                                            {discountInvoice?.invoicesCount || '-'}
                                        </Text>
                                    </Row>
                                    {status &&
                                        (status.value === 'ONAYLADIM' ||
                                            status.value === 'TEKLIFI_ONAYLADIM') && (
                                            <>
                                                <Divider />
                                                <Row className="item-row">
                                                    <Text className="item-title">Finans Kurum</Text>
                                                    <Text className="item-value">
                                                        {discountInvoice?.financialInstitutionName || '-'}
                                                    </Text>
                                                </Row>
                                                <Row className="item-row">
                                                    <Text className="item-title">Teklif Tutar??</Text>
                                                    <Text className="item-value">
                                                        {convertFloatDotSeperated(discountInvoice.offer)} TL
                                                    </Text>
                                                </Row>
                                                <Row className="item-row">
                                                    <Text className="item-title">Ko??ul</Text>
                                                    <Text className="item-value">
                                                        {discountInvoice?.offerCondition || '-'}
                                                    </Text>
                                                </Row>
                                                {status && status.value === 'TEKLIFI_ONAYLADIM' && (
                                                    <Button
                                                        style={{ backgroundColor: '#0d0f7b', marginTop: 20 }}
                                                        type="primary"
                                                        htmlType="submit"
                                                        loading={loading}
                                                        onClick={() => setSuccessRes(true)}
                                                        block>
                                                        Temliknameyi Y??kle
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    {status &&
                                        status.value === 'CEVAP_GELDI' &&
                                        offers &&
                                        offers.map((ofer) => (
                                            <>
                                                <Divider />
                                                <Row className="item-row">
                                                    <Text className="item-title">Finans Kurum</Text>
                                                    <Text className="item-value">
                                                        {ofer?.financialInstitutionName || '-'}
                                                    </Text>
                                                </Row>
                                                <Row className="item-row">
                                                    <Text className="item-title">Teklif Tutar??</Text>
                                                    <Text className="item-value">
                                                        {convertFloatDotSeperated(ofer.offer)} TL
                                                    </Text>
                                                </Row>
                                                <Row className="item-row">
                                                    <Text className="item-title">Ko??ul</Text>
                                                    <Text className="item-value">
                                                        {ofer?.offerCondition || '-'}
                                                    </Text>
                                                </Row>
                                                <Button
                                                    style={{ backgroundColor: '#0d0f7b', marginTop: 20 }}
                                                    type="primary"
                                                    htmlType="submit"
                                                    loading={loading}
                                                    onClick={() => acceptOffer(ofer)}
                                                    block>
                                                    Teklifi Kabul Et
                                                </Button>
                                            </>
                                        ))}
                                </Col>
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
            )}
        </>
    );
};

export default FundDetail;
