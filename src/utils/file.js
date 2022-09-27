import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import moment from 'moment';
import { fileTypes } from '../constants';
import Temlikname from '../assests/temlikname.pdf';
import PlatformuKullanım from '../assests/FonRadar_Platformu_Kullanım_Sozlesmesi.pdf';
import { convertFloatDotSeperated } from './index';

export const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

export const getIsFilePdf = (fileName) => fileName && fileName.type && fileName.type.endsWith('pdf');
export const getFileType = (file) => {
    const type = (file && file.type) || '';
    const splitted = type.split('/');
    return splitted[splitted.length - 1];
};
export const getFileTypeByUrl = (fileUrl = '') => {
    const splittedUrl = fileUrl.split('.');
    const type = splittedUrl[splittedUrl.length - 1];

    if (Object.values(fileTypes).includes(type)) {
        return type;
    }
    return '';
};

export const downloadURI = (uri, name) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const toBase64 = (u8) => btoa(u8.reduce((data, byte) => data + String.fromCharCode(byte), ''));

const printCol = (page, font, textSize, text, textx, texty, rectx, recty, textWidth, textHeight) => {
    page.drawText(text, {
        x: textx,
        y: texty,
        size: textSize,
        font,
        // color: rgb(0, 0.53, 0.71),
        color: rgb(0, 0, 0, 1),
    });
    page.drawRectangle({
        x: rectx,
        y: recty,
        width: textWidth,
        height: textHeight,
        borderColor: rgb(0, 0, 0, 1),
        borderWidth: 0.5,
    });
};

const size = 10;
const textY = 206;
const rectY = 201.3;
const colH = 15;
const colW1 = 57.6;
const colW2 = 93.6;
const colW3 = 43.2;
const colW4 = 79.3;

const printRows = (page, font, invoices) => {
    invoices.length > 0 &&
        invoices.map(({ invoiceDate, invoiceTerm, invoiceNumber, invoiceTotal }, index) => {
            const invoDate = moment(invoiceDate).format('DD-MM-YYYY');
            const termDate = moment(invoiceTerm).format('DD-MM-YYYY');
            const total = `${convertFloatDotSeperated(invoiceTotal)}`;
            const txtY = textY - colH * index;
            const rctY = rectY - colH * index;
            printCol(page, font, size, invoDate, 76, txtY, 71, rctY, colW1, colH);
            printCol(page, font, size, invoiceNumber, 134, txtY, 128.6, rctY, colW2, colH);
            printCol(page, font, size, 'TL', 229, txtY, 222.2, rctY, colW3, colH);
            printCol(page, font, size, total, 271, txtY, 265.4, rctY, colW4, colH);
            printCol(page, font, size, total, 351, txtY, 344.6, rctY, colW4, colH);
            printCol(page, font, size, termDate, 430, txtY, 423.85, rctY, colW1, colH);
            return index;
        });
};

const printLastRows = (page, font, invoices, invoTotal) => {
    const txtY = textY - colH * invoices.length;
    const rctY = rectY - colH * invoices.length;
    const total = `${convertFloatDotSeperated(invoTotal)}`;
    printCol(page, font, size, 'TOPLAM', 134, txtY, 128.6, rctY, colW2, colH);
    printCol(page, font, size, 'TL', 229, txtY, 222.2, rctY, colW3, colH);
    printCol(page, font, size, total, 271, txtY, 265.4, rctY, colW4, colH);
    printCol(page, font, size, total, 351, txtY, 344.6, rctY, colW4, colH);
};

export const LoadPdfTemlik = async (invoiceData) => {
    const existingPdfBytes = await fetch(Temlikname)
        .then((res) => res.arrayBuffer())
        .then((arrayBufferData) => arrayBufferData);
    if (existingPdfBytes) {
        const pdfDoc = await PDFDocument.load(existingPdfBytes, {
            updateMetadata: false,
        });

        // Embed the Helvetica font
        const timeRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        // Get the first page of the document
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const invoices = invoiceData?.invoices?.length > 0 && invoiceData?.invoices;
        printRows(firstPage, timeRomanFont, invoices);
        printLastRows(firstPage, timeRomanFont, invoices, invoiceData.invoicesTotal);

        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        downloadURI(pdfDataUri, 'Temlik_Info');

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const updatedPdf = await pdfDoc.save();
        return toBase64(updatedPdf);
    }
};

export const LoadPdfPlatform = async (text) => {
    const existingPdfBytes = await fetch(PlatformuKullanım)
        .then((res) => res.arrayBuffer())
        .then((arrayBufferData) => arrayBufferData);
    if (existingPdfBytes) {
        const pdfDoc = await PDFDocument.load(existingPdfBytes, {
            updateMetadata: false,
        });

        // Embed the Helvetica font
        const timeRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        // Get the first page of the document
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        firstPage.moveTo(135, 670.5);
        firstPage.drawText(text, {
            font: timeRomanFont,
            size: 12,
        });

        firstPage.moveTo(443, 670.5);
        firstPage.drawText(moment().format('DD-MM-YYYY'), {
            size: 12,
            font: timeRomanFont,
        });

        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        downloadURI(pdfDataUri, 'FonRadar_Platformu_Kullanım_Sozlesmesi');

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const updatedPdf = await pdfDoc.save();
        return toBase64(updatedPdf);
    }
};
