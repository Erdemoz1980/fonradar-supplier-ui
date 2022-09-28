import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AliciTedarikci from '../../../assests/alici_tedarikci.png';
import Table from '../../../components/Table';
import Text from '../../../components/Text';
import { convertFloatDotSeperated } from '../../../utils';
import { fetchInvoices, uploadInvoices } from '../../../apiServices/supplierFinanceApi';
import {
    // setInvoices,
    setInvoiceResId,
} from '../../../store/reducers/supplierFinanceSlice';
import InvoicesDiscountSummary from './InvoicesDiscountSummary';
import urls from '../../../routes/urls';
import { FaturaButton, HelpBox } from './styles';
import Icon from '../../../components/Icon';

const SupplierFinancingList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { search } = useLocation();
    // const taxNumber = new URLSearchParams(search).get('taxNumber');
    const [loading, setLoading] = useState(false);
    const [selectInvoice, setSelectInvoice] = useState({});
    const [selectbuyer, setSelectBuyer] = useState({});
    const [calculation, setCal] = useState({
        total: 0,
        maxPrice: 0,
        minPrice: 0,
        SupplierAverageCreditDay: 0,
    });
    const { invoices } = useSelector((state) => state.supplierFinance);
    const { user, isLoggedIn } = useSelector((state) => state.user);
    const invoiceCal = {
        SpreadFirst: 12,
        SpreadLast: 40,
        Interest: 18,
        CommissionRate: 1,
    };
    const columns = [
        {
            title: 'Fatura No',
            dataIndex: 'invoiceNumber',
            key: 'invoiceNumber',
        },
        {
            title: 'Fatura Tarihi',
            dataIndex: 'invoiceDate',
            key: 'invoiceDate',
            render: (value) => moment(value).format('DD-MM-YYYY'),
        },
        {
            title: 'Borçlu VKN',
            dataIndex: 'buyerTaxNumber',
            key: 'buyerTaxNumber',
        },
        {
            title: 'Borçlu Ünvanı',
            dataIndex: 'buyerTitle',
            key: 'buyerTitle',
        },
        {
            title: 'Fatura Tutarı',
            dataIndex: 'invoiceTotal',
            key: 'invoiceTotal',
            render: convertFloatDotSeperated,
        },
        {
            title: 'Fatura Vadesi',
            dataIndex: 'invoiceTerm',
            key: 'invoiceTerm',
            render: (value) => moment(value).format('DD-MM-YYYY'),
        },
    ];

    const totalDaysCal = (date1, date2) => {
        const difference = date1.getTime() - date2.getTime();
        const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    };

    const getTotal = (data) => {
        let totalAmount = 0;
        data.length && data.map((val) => (totalAmount += val.invoiceTotal));
        return totalAmount;
    };

    const getSupplierAvgDate = (data) => {
        let totalDays = 0;
        data.length &&
            data.map((val) => {
                const totalDaysInvoice = totalDaysCal(new Date(val.invoiceTerm), new Date());
                if (totalDaysInvoice > 0) {
                    totalDays += totalDaysInvoice * val.invoiceTotal;
                }
                return val;
            });
        return totalDays;
    };

    const getTotalCal = (data) => {
        const { SpreadFirst, SpreadLast, Interest, CommissionRate } = invoiceCal;
        data.length &&
            data.map(async (val) => {
                const ChequeAmount = await getTotal(data);
                const SupplierAverageCreditDay = parseInt(getSupplierAvgDate(data) / ChequeAmount);
                const commissionAmount = (ChequeAmount * CommissionRate) / 100;
                const maxInterest =
                    ((SpreadFirst + Interest) * ChequeAmount * SupplierAverageCreditDay) / 36000;
                const minInterest =
                    ((SpreadLast + Interest) * ChequeAmount * SupplierAverageCreditDay) / 36000;
                const maxPrice = ChequeAmount - maxInterest - commissionAmount;
                const minPrice = ChequeAmount - minInterest - commissionAmount;
                setCal({
                    ...calculation,
                    total: ChequeAmount,
                    maxPrice: maxPrice.toFixed(4),
                    minPrice: minPrice.toFixed(4),
                    supplierAverageCreditDay: SupplierAverageCreditDay,
                });
                return val;
            });
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRowKeys.length > 0) {
                const filterRows = selectedRows.reduce((newData, row) => {
                    setSelectBuyer({ buyerTitle: row.buyerTitle, buyerTaxNumber: row.buyerTaxNumber });
                    newData.push({
                        id: row.id,
                        invoiceDate: row.invoiceDate,
                        fileName: row.fileName,
                        invoiceNumber: row.invoiceNumber,
                        invoiceTotal: row.invoiceTotal,
                        currency: row.currency,
                        invoiceTerm: row.invoiceTerm,
                        isApproved: row.isApproved,
                        createdDate: row.createdDate,
                    });
                    return newData;
                }, []);
                setSelectInvoice(filterRows);
                getTotalCal(selectedRows);
            } else {
                setSelectInvoice({});
                setCal({
                    total: 0,
                    max: 0,
                    min: 0,
                });
            }
        },
        getCheckboxProps: (record) => ({
            index: record.index,
        }),
    };

    const getInvoice = async () => {
        try {
            setLoading(true);
            const response = await fetchInvoices(user.taxNumber, isLoggedIn);
            if (response) {
                setLoading(false);
                // dispatch(setInvoices(response.invoiceDtos));
            } else {
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
        }
    };

    const handleUploadInvoice = async () => {
        try {
            setLoading(true);
            const response = await uploadInvoices(
                {
                    buyerTitle: selectbuyer.buyerTitle,
                    buyerTaxNumber: selectbuyer.buyerTaxNumber,
                    supplierId: user.id,
                    invoices: selectInvoice,
                    averageMaturity: calculation.supplierAverageCreditDay || 0,
                    financialInstitutions: [
                        {
                            id: 'a0cca5b1-a716-4703-b9ca-450a4d228026',
                            name: 'DenizBank',
                        },
                    ],
                },
                isLoggedIn
            );
            if (response) {
                setLoading(false);
                dispatch(setInvoiceResId(response.discountApplicaationNumber));
                history.push(urls.getCreatedInvoiceResultPath(user.id));
            } else {
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.taxNumber) {
            getInvoice();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const showTotal = (total) => (
        <Row>
            <Col lg={12} style={{ width: '600px', color: '#727272', fontSize: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Yüklenen Faturalarım</Text>
            </Col>
            <Col lg={12} style={{ textAlign: 'right', color: '#727272', fontSize: 15 }}>
                Toplam {total}
            </Col>
        </Row>
    );

    return (
        <>
            {!loading && invoices && invoices.length === 0 ? (
                <Row>
                    <Row style={{ width: '68%', margin: '40px auto 0px' }}>
                        <Col style={{ margin: '0px auto', textAlign: 'center', display: 'grid' }}>
                            <Text style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>
                                Yüklenen faturalarınız bulunmamaktadır.
                            </Text>
                            <Text>
                                Bu fatura türünü görmeniz için alıcının fatura yüklemesi gerekmektedir.
                            </Text>
                            <Text>
                                Alıcı bu faturaları yükledikten sonra sistemimizde yüklenen faturalarınızı
                                görebilirsiniz.
                            </Text>
                            <FaturaButton type="primary" loading={false}>
                                <Icon icon="bell" size="lg" />
                                Fatura Yüklenince Haber Ver
                            </FaturaButton>
                        </Col>
                    </Row>
                    <HelpBox>
                        <Col className="info_box">
                            <img src={AliciTedarikci} alt="alici_tedarikci" />
                            <Text>
                                Alıcı, Tedarikçi faturalarını sisteme yüklediğinde, Tedarikçi'ye otomatik
                                bildirim iletilir.
                            </Text>
                        </Col>
                        <Col className="info_box">
                            <img src={AliciTedarikci} alt="alici_tedarikci" />
                            <Text>
                                Alıcı, Tedarikçi faturalarını sisteme yüklediğinde, Tedarikçi'ye otomatik
                                bildirim iletilir.
                            </Text>
                        </Col>
                        <Col className="info_box">
                            <img src={AliciTedarikci} alt="alici_tedarikci" />
                            <Text>
                                Alıcı, Tedarikçi faturalarını sisteme yüklediğinde, Tedarikçi'ye otomatik
                                bildirim iletilir.
                            </Text>
                        </Col>
                        <Col className="info_box">
                            <img src={AliciTedarikci} alt="alici_tedarikci" />
                            <Text>
                                Alıcı, Tedarikçi faturalarını sisteme yüklediğinde, Tedarikçi'ye otomatik
                                bildirim iletilir.
                            </Text>
                        </Col>
                        <Col className="info_box">
                            <img src={AliciTedarikci} alt="alici_tedarikci" />
                            <Text>
                                Alıcı, Tedarikçi faturalarını sisteme yüklediğinde, Tedarikçi'ye otomatik
                                bildirim iletilir.
                            </Text>
                        </Col>
                    </HelpBox>
                </Row>
            ) : (
                <>
                    <Row>
                        <Col span={20} style={{ margin: '0px auto' }}>
                            <Table
                                className="invoiceTable"
                                pagination={{
                                    position: ['topleft', 'none'],
                                    showLessItems: true,
                                    showTotal,
                                    showSizeChanger: true,
                                }}
                                rowSelection={{
                                    type: 'checkbox',
                                    ...rowSelection,
                                }}
                                rowKey="id"
                                dataSource={invoices}
                                columns={columns}
                                loading={loading}
                                cursorPointer
                            />
                        </Col>
                    </Row>
                    <InvoicesDiscountSummary
                        onSubmit={handleUploadInvoice}
                        invoiceCalculate={{
                            invoiceCount: (selectInvoice && selectInvoice.length) || 0,
                            invoiceTotal: calculation.total,
                            supplierAverageCreditDay: calculation.supplierAverageCreditDay || 0,
                            maxPrice: calculation.maxPrice,
                            minPrice: calculation.minPrice,
                        }}
                    />
                </>
            )}
        </>
    );
};

export default SupplierFinancingList;
