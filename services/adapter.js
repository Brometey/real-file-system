const mime = require('../libs/mime-types-dictionary')
const META_PATH = 'D:/nest-projects/real-file-system/db/meta-data.txt';
const storage = require('../reps/storage-funcs')
const path = require('path');

exports.saveFile = (fileName, mime_type, file_size) => {

    const extension = mime[mime_type];

    const filePath = `D:/nest-projects/real-file-system/upload/${fileName}${extension}`;

    if (storage.ifMetaFileExists(META_PATH)) {
        const data = storage.getData(META_PATH);

        storage.deleteData(META_PATH);

        storage.deleteAlreadyExistingFile(fileName);
        console.log('hewou');
        storage.rewriteMetadata(data, META_PATH, fileName);

    }

    const file_meta = {
        "name": fileName,
        "mime-type": mime_type,
        "file-size": file_size
    }

    storage.writeMetData(META_PATH, file_meta);

}

exports.getFile = async (fileName) => {

    const data = storage.getData(META_PATH);

    const meta_array = await storage.sanitize(data);

    const meta_file = await meta_array.find(element => element.name === fileName);

    const filePath =  storage.getPathName(fileName, meta_file);
    
    return {
        'filePath': filePath,
        'file-size': meta_file['file-size'],
        'mime-type': meta_file['mime-type']
    }

    
    // res.setHeader('Content-Disposition', 'attachment');
    // res.setHeader('Content-length', meta_file['file-size']);
}