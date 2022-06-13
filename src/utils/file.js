import { fileTypes } from '../constants';

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
