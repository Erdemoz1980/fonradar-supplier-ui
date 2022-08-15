import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useHistory } from 'react-router';
import Text from '../../components/Text';
import { chequeStatusMapByValue } from '../../constants';
import { getDiscountBuyerInvoices } from '../../apiServices/fundApi';
import { setDiscountInvoices } from '../../store/reducers/fundSlice';
import { convertFloatDotSeperated } from '../../utils';
import urls from '../../routes/urls';

function FundList() {
    const history = useHistory();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { discountInvoices } = useSelector((state) => state.fund);

    const getDiscountInvoice = async () => {
        try {
            setLoading(true);
            const response = await getDiscountBuyerInvoices(user.id);
            if (response) {
                setLoading(false);
                dispatch(setDiscountInvoices(response.sort((a, b) => b.number - a.number)));
            } else {
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
        }
    };

    useEffect(() => {
        user && user.id && getDiscountInvoice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const onClickFund = (fund) => {
        history.push(urls.getfundDetail(fund.id));
    };

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
            dataIndex: 'buyerTitle',
            key: 'buyerTitle',
        },
        {
            title: 'Durumu',
            dataIndex: 'status',
            render: (value) => (
                <Text color={theme?.getThemedColor(chequeStatusMapByValue[value]?.color)} bold>
                    {chequeStatusMapByValue[value] && chequeStatusMapByValue[value].text}
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
                onRow={(fund) => ({
                    onClick: () => onClickFund(fund),
                })}
                size="small"
            />
        </>
    );
}

export default FundList;
