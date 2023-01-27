const mime = require('../libs/mime-types-dictionary')
const META_PATH = 'D:/nest-projects/real-file-system/db/meta-data.txt';
const storage = require('../reps/storage-funcs')
const path = require('path');

exports.saveFile = async (fileName, mimeType, fileSize) => {

    const extension = mime[mimeType];

    const filePath = `D:/nest-projects/real-file-system/upload/${fileName}${extension}`;

    if (storage.ifMetaFileExists(META_PATH)) {
        const data = storage.getData(META_PATH);

        storage.deleteData(META_PATH);

        storage.deleteAlreadyExistingFile(fileName);
        console.log('hewou');
        storage.rewriteMetadata(data, META_PATH, fileName);

    }

    const fileMeta = {
        "name": fileName,
        "mime-type": mimeType,
        "file-size": fileSize
    }

    storage.writeMetData(META_PATH, fileMeta);

}

exports.getFile = async (fileName) => {

    const data = storage.getData(META_PATH);

    const metaArray = await storage.sanitize(data);

    const metaFile = await metaArray.find(element => element.name === fileName);

    const filePath =  storage.getPathName(fileName, metaFile);
    
    return {
        'filePath': filePath,
        'file-size': metaFile['file-size'],
        'mime-type': metaFile['mime-type']
    }

    
    // res.setHeader('Content-Disposition', 'attachment');
    // res.setHeader('Content-length', meta_file['file-size']);
}