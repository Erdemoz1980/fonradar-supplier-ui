import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Col, Row, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import Text from '../../components/Text';
import { getInvoicesAssigned } from '../../apiServices/fundApi';
import { setDiscountInvoices } from '../../store/reducers/fundSlice';
import { convertFloatDotSeperated } from '../../utils';
// import urls from '../../routes/urls';

function InvoiceAssigned() {
    // const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { discountInvoices } = useSelector((state) => state.fund);

    const getInvoiceAssigned = async () => {
        try {
            setLoading(true);
            const response = await getInvoicesAssigned(user.id);
            if (response) {
                setLoading(false);
                dispatch(setDiscountInvoices(response.invoices));
            } else {
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
        }
    };

    useEffect(() => {
        user && user.id && getInvoiceAssigned();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // const onClickFund = (fund) => {
    //     history.push(urls.getfundDetail(fund.id));
    // };

    const tableCols = [
        {
            title: 'Borçlu Ünvanı',
            dataIndex: 'buyerTitle',
            key: 'buyerTitle',
            width: 180,
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
            render: (date) => moment(date).format('DD-MM-YYYY'),
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
            render: (date) => moment(date).format('DD-MM-YYYY'),
        },
        {
            title: 'Borçlu VKN',
            dataIndex: 'invoiceOwnerTaxNumber',
            key: 'invoiceOwnerTaxNumber',
        },
        {
            title: 'Temlik Ettiğim Kurum',
            dataIndex: 'financialInstitutionName',
            key: 'financialInstitutionName',
        },
    ];

    const showTotal = (total) => (
        <Row>
            <Col lg={12} style={{ width: '755px', color: '#727272', fontSize: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Temlik Ettiğim Faturalar</Text>
            </Col>
            <Col lg={12} style={{ textAlign: 'right', color: '#727272', fontSize: 15 }}>
                Toplam {total}
            </Col>
        </Row>
    );

    return (
        <>
            <Row>
                <Col span={20} style={{ margin: '0px auto' }}>
                    <Table
                        className="invoiceTable"
                        rowKey="invoiceNumber"
                        loading={loading}
                        dataSource={discountInvoices}
                        columns={tableCols}
                        cursorPointer
                        pagination={{
                            position: ['topRight', 'none'],
                            showLessItems: true,
                            showTotal,
                            showSizeChanger: true,
                        }}
                        // onRow={(fund) => ({
                        //     onClick: () => onClickFund(fund),
                        // })}
                    />
                </Col>
            </Row>
        </>
    );
}

export default InvoiceAssigned;
