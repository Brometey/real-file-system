const fs = require('fs');
const utils = require('../utils')
const path = require('path');
const mime = require('../libs/mime-types-dictionary')

exports.ifMetaFileExists = async (path) => fs.existsSync(path);

exports.deleteData = async (path) => {
    fs.unlinkSync(path)
};

exports.getData = (path) => fs.readFileSync(path, {
    encoding: 'utf8',
    flag: 'r'
});

exports.deleteAlreadyExistingFile = async (fileName) => {
    const files = utils.globSync('D:/nest-projects/real-file-system/upload', new RegExp(`${fileName}.` + '.*'));

    files.forEach(file => {
        this.deleteData(file);
    })

}

exports.rewriteMetadata = async (data, metaPath, fileName) => {
    const sanitized = '[' + data.replace(/}{/g, '},{') + ']';
    let metaData = await JSON.parse(sanitized);
    let indexToDelete;

    if (metaData.find(element => element.name === fileName)) {
        await metaData.map((element, index) => {
            if (element.name === fileName)
                indexToDelete = index;
        })
        await metaData.splice(indexToDelete, 1);
    }

    if (metaData.length !== 0) {
        await metaData.map(element => {
            let stringElement = JSON.stringify(element);
            fs.appendFileSync(metaPath, stringElement);
        })
    }

}

exports.writeMetData = async (metaPath, fileMeta) => {
    const fileMetaString = JSON.stringify(fileMeta);

    fs.appendFileSync(metaPath, fileMetaString);
}

exports.writeFile = (path) => fs.createWriteStream(path);

exports.sanitize = async (data) => {
    const sanitized = '[' + data.replace(/}{/g, '},{') + ']';
    const metaArray = await JSON.parse(sanitized);

    return await metaArray;
}

exports.getPathName = async (fileName, file) => {
    const fileType = file['mime-type'];
    const extension = mime[fileType];

    const filePath = `./upload/${fileName}${extension}`
    return filePath;
}

exports.readFile = async (path) => {
    return fs.createReadStream(path);
}