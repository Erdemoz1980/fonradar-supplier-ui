import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Table from '../../../components/Table';
import { convertFloatDotSeperated } from '../../../utils';
import { fetchInvoices, uploadInvoices } from '../../../apiServices/supplierFinanceApi';
import { setInvoices, setInvoiceResId } from '../../../store/reducers/supplierFinanceSlice';
import InvoicesDiscountSummary from './InvoicesDiscountSummary';
import Button from '../../../components/Button';
import urls from '../../../routes/urls';

const SupplierFinancingList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { search } = useLocation();
    const taxNumber = new URLSearchParams(search).get('taxNumber');
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
            const response = await fetchInvoices(taxNumber, isLoggedIn);
            if (response) {
                setLoading(false);
                dispatch(setInvoices(response.invoices));
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
                            item1: 'a0cca5b1-a716-4703-b9ca-450a4d228026',
                            item2: 'string',
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

    return (
        <>
            <Row>
                <Col span={20}>
                    <Table
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        rowKey="id"
                        dataSource={invoices}
                        columns={columns}
                        pagination={false}
                        loading={loading}
                        cursorPointer
                    />
                </Col>
                <Col span={20} className="mt">
                    <InvoicesDiscountSummary
                        invoiceCalculate={{
                            invoiceCount: (selectInvoice && selectInvoice.length) || 0,
                            invoiceTotal: calculation.total,
                            supplierAverageCreditDay: calculation.supplierAverageCreditDay || 0,
                            maxPrice: calculation.maxPrice,
                            minPrice: calculation.minPrice,
                        }}
                    />
                </Col>
                <Col span={20} offset={13} className="mt">
                    <Button
                        style={{ paddingLeft: '27px', paddingRight: '27px' }}
                        key="invoice-discount-button"
                        type="primary"
                        onClick={handleUploadInvoice}
                        loading={false}>
                        Kayıtlı Kurumlara Başvur
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default SupplierFinancingList;
