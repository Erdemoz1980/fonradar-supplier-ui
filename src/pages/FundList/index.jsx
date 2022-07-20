import React from 'react';
import moment from 'moment';
import { Table } from 'antd';
import { useTheme } from 'styled-components';
import Text from '../../components/Text';
import { chequeStatusMapById } from '../../constants';

function FundList({ invoices }) {
    const theme = useTheme();
    const tableCols = [
        {
            title: 'Başvuru No',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Başvuru Tarihi',
            dataIndex: 'invoiceDate',
            render: (date) => moment(date).format('DD-MM-YYYY'),
            key: 'invoiceDate',
        },
        {
            title: 'Fatura Toplamı',
            dataIndex: 'invoiceNo',
            key: 'invoiceNo',
        },
        {
            title: 'Fatura Adedi',
            dataIndex: 'invoiceNo',
            key: 'invoiceNo',
        },
        {
            title: 'Alıcı',
            dataIndex: 'debtTaxId',
            key: 'debtTaxId',
        },
        {
            title: 'Durumu',
            dataIndex: 'status',
            render: ({ id }) => (
                <Text color={theme?.getThemedColor(chequeStatusMapById[id]?.color)} bold>
                    {chequeStatusMapById[id]?.text}
                </Text>
            ),
            key: 'status',
        },
    ];

    return (
        <>
            <Table
                className="limited-width"
                rowKey="invoiceNo"
                dataSource={invoices}
                columns={tableCols}
                pagination={false}
                size="small"
            />
        </>
    );
}

export default FundList;
