const adapter = require('../services/adapter')
const storage = require('../reps/storage-funcs')
const mime = require('../libs/mime-types-dictionary')
const path = require('path');

exports.putRequest = (req,res) => {
    const fileName = req.url.split('/')[2];
    const mime_type = req.headers['content-type'];
    const file_size = req.headers['content-length'];    
    
    const extension = mime[mime_type];

    const filePath = `D:/nest-projects/real-file-system/upload/${fileName}${extension}`;

    adapter.saveFile(fileName, mime_type,file_size);

    const writeStream = storage.writeFile(filePath);
    req.pipe(writeStream);

    writeStream.on('error', (err)=> {
        console.log(err);
    })

    res.end('hewou');
}

exports.getRequest = (req,res) => {
   const fileName = req.url.split('/')[2];
   
   adapter.getFile(fileName, res);
}