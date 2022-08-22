import React from 'react';
import { Col } from 'antd';
import { InvoiceText, InvoiceRow, InvoiceCol, FooterBox, InvoiceValue, InvoiceButton } from './styles';
import { convertFloatDotSeperated } from '../../../../utils';

const InvoicesDiscountSummary = ({ invoiceCalculate, onSubmit }) => (
    <FooterBox>
        <Col offset={3} background="primaryFaded" margin={false}>
            <InvoiceRow>
                <InvoiceCol>
                    <InvoiceText type="mini-title">
                        <b>Fatura Adedi:</b>
                    </InvoiceText>
                    <InvoiceValue style={{ textAlign: 'right' }} type="mini-title">
                        {invoiceCalculate?.invoiceCount}
                    </InvoiceValue>
                </InvoiceCol>
                <InvoiceCol>
                    <InvoiceText type="mini-title">
                        <b>Toplam Tutar:</b>
                    </InvoiceText>
                    <InvoiceValue style={{ textAlign: 'right' }} type="mini-title">
                        {convertFloatDotSeperated(invoiceCalculate?.invoiceTotal)} TL
                    </InvoiceValue>
                </InvoiceCol>
                <InvoiceCol>
                    <InvoiceText type="mini-title">
                        <b>Ortalama Vade:</b>
                    </InvoiceText>
                    <InvoiceValue style={{ textAlign: 'right' }} type="mini-title">
                        {invoiceCalculate?.supplierAverageCreditDay}
                    </InvoiceValue>
                </InvoiceCol>
                <InvoiceCol>
                    <InvoiceText type="mini-title">
                        <b>Elinize Geçecek Tutar Aralığı: </b>
                    </InvoiceText>
                    <InvoiceValue style={{ textAlign: 'right' }} type="mini-title">
                        {convertFloatDotSeperated(invoiceCalculate?.minPrice)} TL
                        {' - '}
                        {convertFloatDotSeperated(invoiceCalculate?.maxPrice)} TL
                    </InvoiceValue>
                </InvoiceCol>
                <InvoiceCol>
                    <InvoiceButton
                        key="invoice-discount-button"
                        type="primary"
                        onClick={onSubmit}
                        loading={false}>
                        Kayıtlı Kurumlara Başvur
                    </InvoiceButton>
                </InvoiceCol>
            </InvoiceRow>
        </Col>
    </FooterBox>
);

export default InvoicesDiscountSummary;
