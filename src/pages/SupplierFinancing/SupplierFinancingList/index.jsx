import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../components/Table';
import { convertFloatDotSeperated } from '../../../utils';
import { fetchInvoices } from '../../../apiServices/supplierFinanceApi';
import { setInvoices } from '../../../store/reducers/supplierFinanceSlice';

const SupplierFinancingList = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { invoices } = useSelector((state) => state.supplierFinance);
    const { user, isLoggedIn } = useSelector((state) => state.user);

    const columns = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
        },
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

    const rowSelection = {
        onChange: (selectedRowKeys) => {
            if (selectedRowKeys.length > 0) {
                dispatch(setInvoices(selectedRowKeys));
                // dispatch(fetchInvoiceCalculate(selectedRowKeys));
            } else {
                // dispatch(fetchInvoiceCalculateSuccess({}));
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

    useEffect(() => {
        if (user && user.taxNumber) {
            getInvoice();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <>
            <Row>
                <Col>
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
            </Row>
        </>
    );
};

export default SupplierFinancingList;
