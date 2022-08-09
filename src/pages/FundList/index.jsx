import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import Text from '../../components/Text';
import { chequeStatusMapByValue } from '../../constants';
import { fetchDiscountInvoices } from '../../apiServices/fundApi';
import { setDiscountInvoices } from '../../store/reducers/fundSlice';
import { convertFloatDotSeperated } from '../../utils';

function FundList() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.user);
    const { discountInvoices } = useSelector((state) => state.fund);

    const getDiscountInvoice = async () => {
        try {
            setLoading(true);
            const response = await fetchDiscountInvoices(isLoggedIn);
            if (response) {
                setLoading(false);
                dispatch(setDiscountInvoices(response));
            } else {
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDiscountInvoice();
    }, [isLoggedIn]);

    const theme = useTheme();
    const tableCols = [
        {
            title: 'Başvuru No',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Başvuru Tarihi',
            dataIndex: 'date',
            render: (date) => moment(date).format('DD-MM-YYYY'),
            key: 'date',
        },
        {
            title: 'Fatura Toplamı',
            dataIndex: 'invoicesTotal',
            key: 'invoicesTotal',
            render: convertFloatDotSeperated,
        },
        {
            title: 'Fatura Adedi',
            dataIndex: 'invoicesCount',
            key: 'invoicesCount',
        },
        {
            title: 'Alıcı',
            dataIndex: 'debtTaxId',
            key: 'debtTaxId',
        },
        {
            title: 'Durumu',
            dataIndex: 'status',
            render: (value) => (
                <Text color={theme?.getThemedColor(chequeStatusMapByValue[value]?.color)} bold>
                    {chequeStatusMapByValue[value].text}
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
                loading={loading}
                dataSource={discountInvoices}
                columns={tableCols}
                pagination={false}
                size="small"
            />
        </>
    );
}

export default FundList;
