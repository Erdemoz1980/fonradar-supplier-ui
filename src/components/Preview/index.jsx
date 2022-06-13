import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import PreviewContainer, { DeleteIcon, Image, PdfContainer } from './styles';
import { CustomIcon } from '../Icon';
import { fileTypes } from '../../constants';
import { getFileTypeByUrl } from '../../utils/file';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function Preview({ src, height, width, onDelete, type, displayImage }) {
    const [fileType, setFileType] = useState(type);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pdfPageCount, setPdfPageCount] = useState(0);
    // const [selectedPdfPage, setSelectedPdfPage] = useState(0);
    const shouldDisplayImg = fileType !== fileTypes.pdf && displayImage;

    useEffect(() => {
        console.log(type);
        if (!type) {
            setFileType(getFileTypeByUrl(src) || fileTypes.jpeg);
        }
    }, [src, type]);

    const handleLoadPdf = ({ numPages }) => {
        setPdfPageCount(numPages);
    };

    return (
        <>
            <PreviewContainer>
                {!!onDelete && (
                    <DeleteIcon
                        className="delete-icon"
                        icon="times-circle"
                        size="lg"
                        onClick={onDelete}
                        margin={false}
                    />
                )}
                {shouldDisplayImg ? (
                    <Image
                        src={src}
                        height={height}
                        width={width}
                        onClick={() => setIsModalVisible(true)}
                        preview={false}
                    />
                ) : (
                    <PdfContainer onClick={() => setIsModalVisible(true)}>
                        <CustomIcon
                            icon={fileType}
                            margin={false}
                            height={50}
                            width={50}
                            onClick={onDelete}
                        />
                    </PdfContainer>
                )}
            </PreviewContainer>

            <Modal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={false}
                closeIcon={() => null}
                bodyStyle={{ padding: 0, borderRadius: 10 }}>
                {fileType !== fileTypes.pdf ? (
                    <Image src={src} width="100%" preview={false} />
                ) : (
                    <Document file={{ url: src }} onLoadSuccess={handleLoadPdf}>
                        {[...new Array(pdfPageCount)].map((_, idx) => (
                            <Page key={`page-number-${idx + 1}`} pageNumber={idx + 1} />
                        ))}
                        {/* <PdfNavigation>
                            <Button
                                disabled={pdfPageCount >= selectedPdfPage}
                                onClick={() => setSelectedPdfPage((prev) => prev - 1)}
                                className="mr"
                                type="primary"
                                shape="circle"
                                icon={<Icon icon="chevron-left" color="light" margin={false} />}
                            />
                            <Text className="mr" align="center">
                                {selectedPdfPage}. Sayfa
                            </Text>
                            <Button
                                disabled={pdfPageCount <= selectedPdfPage}
                                onClick={() => setSelectedPdfPage((prev) => prev + 1)}
                                type="primary"
                                shape="circle"
                                icon={<Icon icon="chevron-right" color="light" margin={false} />}
                            />
                        </PdfNavigation> */}
                    </Document>
                )}
            </Modal>
        </>
    );
}

Preview.propTypes = {
    src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    displayImage: PropTypes.bool,
    onDelete: PropTypes.func,
};
Preview.defaultProps = {
    src: '',
    width: '50px',
    height: '50px',
    displayImage: true,
    onDelete: undefined,
};

export default Preview;
