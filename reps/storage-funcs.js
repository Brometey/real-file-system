const fs = require('fs');
const utils = require('../utils')
const path = require('path');
const mime = require('../libs/mime-types-dictionary')

exports.ifMetaFileExists = (path) => fs.existsSync(path);

exports.deleteData = (path) => {fs.unlinkSync(path)};

exports.getData = (path) => fs.readFileSync(path, {encoding:'utf8', flag: 'r'});

exports.deleteAlreadyExistingFile = (fileName) => {
    const files = utils.globSync('D:/nest-projects/real-file-system/upload', new RegExp(`${fileName}.`+'.*'));

    files.forEach(file => {
        this.deleteData(file);
    })
    
}

exports.rewriteMetadata = (data, metaPath,fileName) => {
    const sanitized = '[' + data.replace(/}{/g, '},{') + ']';
    let meta_data = JSON.parse(sanitized);
    let index_delete;

    if (meta_data.find(element => element.name === fileName))
        {
            meta_data.map((element,index)=> {
                if (element.name === fileName)
                index_delete = index;
            })
            meta_data.splice(index_delete,1);
        }

        if (meta_data.length !== 0)
        {
        meta_data.map(element => {
            let string_element = JSON.stringify(element);
            fs.appendFileSync(metaPath,string_element);
        })
    }

}

exports.writeMetData = (metaPath, file_meta) => {
    const file_meta_string = JSON.stringify(file_meta);

    fs.appendFileSync(metaPath, file_meta_string);
}

exports.writeFile = (path) => fs.createWriteStream(path);

exports.sanitize = (data)=> {
    const sanitized = '[' + data.replace(/}{/g, '},{') + ']';
    const meta_array = JSON.parse(sanitized);

    return meta_array;
}

exports.getPathName = (fileName, file) => {
    const file_type = file['mime-type'];
    const extension = mime[file_type];

    const filePath = `./upload/${fileName}${extension}`
    return filePath;
}

exports.readFile = (path)=> {
    return fs.createReadStream(path);
}