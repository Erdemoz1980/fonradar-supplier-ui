import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../components/Table';
import { convertFloatDotSeperated } from '../../../utils';
import { fetchInvoices } from '../../../apiServices/supplierFinanceApi';
import { setInvoices } from '../../../store/reducers/supplierFinanceSlice';
import InvoicesDiscountSummary from './InvoicesDiscountSummary';
import Button from '../../../components/Button';

const SupplierFinancingList = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [selectInvoice, setSelectInvoice] = useState({});
    const [calculation, setCal] = useState({
        total: 0,
        maxPrice: 0,
        minPrice: 0,
    });
    const { invoices } = useSelector((state) => state.supplierFinance);
    const { user, isLoggedIn } = useSelector((state) => state.user);
    const invoiceCal = {
        SpreadFirst: 12,
        SpreadLast: 40,
        Interest: 18,
        CommissionRate: 1,
        SupplierAverageCreditDay: 10,
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
            dataIndex: 'invoiceOwnerTaxNumber',
            key: 'invoiceOwnerTaxNumber',
        },
        {
            title: 'Fatura Tutarı',
            dataIndex: 'invoiceTotal',
            key: 'invoiceTotal',
            render: convertFloatDotSeperated,
        },
        {
            title: 'Fatura Vadesi',
            dataIndex: 'invoiceDueDate',
            key: 'invoiceDueDate',
            render: (value) => moment(value).format('DD-MM-YYYY'),
        },
    ];

    const getTotal = (data) => {
        let totalAmount = 0;
        data.length && data.map((val) => (totalAmount += val.invoiceTotal));
        return totalAmount;
    };

    const getTotalCal = (data) => {
        const { SpreadFirst, SpreadLast, Interest, CommissionRate, SupplierAverageCreditDay } = invoiceCal;
        data.length &&
            data.map((val) => {
                const ChequeAmount = getTotal(data);
                const remainingDate =
                    SupplierAverageCreditDay ?? new Date(val.invoiceTerm - new Date()).getTime();
                const commissionAmount = (ChequeAmount * CommissionRate) / 100;
                const maxInterest = SpreadFirst + Interest;
                const minInterest = SpreadLast + Interest;
                const maxPrice =
                    ChequeAmount - ((ChequeAmount * maxInterest * remainingDate) / 3600 + commissionAmount);
                const minPrice =
                    ChequeAmount - ((ChequeAmount * minInterest * remainingDate) / 3600 + commissionAmount);
                setCal({
                    ...calculation,
                    total: ChequeAmount,
                    maxPrice: maxPrice.toFixed(4),
                    minPrice: minPrice.toFixed(4),
                });
                return val;
            });
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRowKeys.length > 0) {
                setSelectInvoice(selectedRows);
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
                dispatch(setInvoices(response.invoiceDtos));
            } else {
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
        }
    };

    const handleUploadInvoice = () => {
        // setCorporationShow(true);
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
                            supplierAverageCreditDay: invoiceCal.SupplierAverageCreditDay,
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
