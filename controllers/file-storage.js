const adapter = require('../services/adapter')
const storage = require('../reps/storage-funcs')
const mime = require('../libs/mime-types-dictionary')
const path = require('path');

exports.putRequest = (req, res) => {
    const fileName = req.url.split('/')[2];
    const mime_type = req.headers['content-type'];
    const file_size = req.headers['content-length'];

    const extension = mime[mime_type];

    const filePath = `D:/nest-projects/real-file-system/upload/${fileName}${extension}`;

    adapter.saveFile(fileName, mime_type, file_size);

    const writeStream = storage.writeFile(filePath);
    req.pipe(writeStream);

    writeStream.on('error', (err) => {
        console.log(err);
    })

    res.end('hewou');
}

exports.getRequest = async (req, res) => {
    const fileName = await req.url.split('/')[2];

    const filePathAndData = await adapter.getFile(fileName);
        
    await res.setHeader('Content-type', [filePathAndData['mime-type']]);
    await res.setHeader('Content-length', [filePathAndData['file-size']]);

    const readStream = await storage.readFile(filePathAndData['filePath']);

    await readStream.pipe(res);

    readStream.on('end', ()=> {
        res.end();
    })
    
}