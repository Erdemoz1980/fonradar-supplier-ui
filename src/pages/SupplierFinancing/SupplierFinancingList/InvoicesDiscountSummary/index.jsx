import React from 'react';
import Text from '../../../../components/Text';
import InvoicesSummaryContainer, { InvoiceText, InvoiceRow, InvoiceCol } from '../styles';
import { convertFloatDotSeperated } from '../../../../utils';

const InvoicesDiscountSummary = ({ invoiceCalculate }) => (
    <InvoicesSummaryContainer background="primaryFaded" margin={false}>
        <Text type="label" color="primary" bold>
            Genel Toplam
        </Text>
        <InvoiceRow>
            <InvoiceCol>
                <InvoiceText type="mini-title">
                    <b>Fatura Adedi:</b> {invoiceCalculate?.invoiceCount}
                </InvoiceText>
                <InvoiceText type="mini-title">
                    <b>Toplam Tutar:</b> {convertFloatDotSeperated(invoiceCalculate?.invoiceTotal)} TL
                </InvoiceText>
            </InvoiceCol>
            <InvoiceCol>
                <InvoiceText type="mini-title">
                    <b>Ortalama Vade:</b> {invoiceCalculate?.supplierAverageCreditDay}
                </InvoiceText>
                <InvoiceText type="mini-title">
                    <b>Elinize geçek tutar aralığı : </b>
                    {convertFloatDotSeperated(invoiceCalculate?.minPrice)} TL
                    {' - '}
                    {convertFloatDotSeperated(invoiceCalculate?.maxPrice)} TL
                </InvoiceText>
            </InvoiceCol>
        </InvoiceRow>
    </InvoicesSummaryContainer>
);

export default InvoicesDiscountSummary;
