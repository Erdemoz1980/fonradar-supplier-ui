import React, { useState } from 'react';
import moment from 'moment';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import Table from '../../../components/Table';
import { convertFloatDotSeperated } from '../../../utils';

const SupplierFinancingList = () => {
    const [selectedInvoices, setSelectedInvoices] = useState();

    const { invoiceDiscounts, isinvoiceDiscountsLoading, invoiceCalculate, invoiceDiscountsUpload } =
        useSelector((state) => state.user);

    console.log(invoiceCalculate, invoiceDiscountsUpload, selectedInvoices);

    const columns = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Fatura No',
            dataIndex: 'invoiceNo',
            key: 'invoiceNo',
        },
        {
            title: 'Fatura Tarihi',
            dataIndex: 'invoiceDate',
            key: 'invoiceDate',
            render: (value) => moment(value).format('DD-MM-YYYY'),
        },
        {
            title: 'Borçlu VKN',
            dataIndex: 'buyerTaxId',
            key: 'buyerTaxId',
        },
        {
            title: 'Fatura Tutarı',
            dataIndex: 'invoiceAmount',
            key: 'invoiceAmount',
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
            setSelectedInvoices(selectedRowKeys);
            if (selectedRowKeys.length > 0) {
                // dispatch(fetchInvoiceCalculate(selectedRowKeys));
            } else {
                // dispatch(fetchInvoiceCalculateSuccess({}));
            }
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            index: record.index,
        }),
    };

    return (
        <>
            <Row>
                <Col span={18}>
                    <Table
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        rowKey="id"
                        dataSource={invoiceDiscounts}
                        columns={columns}
                        pagination={false}
                        loading={isinvoiceDiscountsLoading}
                        cursorPointer
                    />
                </Col>
            </Row>
        </>
    );
};

export default SupplierFinancingList;
